export type DocBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "subtitle"; text: string }
  | { type: "p"; html: string }
  | { type: "dialogue"; speaker: string; text: string }
  | { type: "image"; src: string };

export interface ParsedPage {
  blocks: DocBlock[];
}

/* ─────────────────────────────────────────────────────────
   Fetch and parse the Google Doc published HTML
────────────────────────────────────────────────────────── */
export async function fetchAndParseStoryDoc(): Promise<ParsedPage[]> {
  try {
    const res = await fetch("/api/story-doc");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // The published Google Doc content lives inside #contents > div.doc-content
    const contents =
      doc.querySelector("#contents .doc-content") ??
      doc.getElementById("contents") ??
      doc.body;

    const blocks = extractBlocks(contents);
    return paginateBlocks(blocks);
  } catch (err) {
    console.error("[StoryDoc] Failed to fetch or parse:", err);
    return [];
  }
}

/* ─────────────────────────────────────────────────────────
   Walk the DOM and extract semantic blocks
────────────────────────────────────────────────────────── */
function extractBlocks(root: Element): DocBlock[] {
  const blocks: DocBlock[] = [];

  // Each top-level child of doc-content
  for (const child of Array.from(root.children)) {
    const tag = child.tagName.toLowerCase();

    // ── Explicit page break (Google Docs: <hr style="page-break-before:always">)
    if (tag === "hr") {
      blocks.push({ type: "h1", text: "---PAGE_BREAK---" });
      continue;
    }

    // ── Images: Google Docs wraps <img> inside <p><span><img></span></p>
    const img = child.querySelector("img");
    if (img && img.src) {
      const src = img.src.replace(/=w\d+/, "=w800"); // Request a larger size
      blocks.push({ type: "image", src });
      continue;
    }

    const text = child.textContent?.trim() ?? "";
    if (!text) continue; // Skip empty paragraphs

    // ── Chapter headings: <h1>
    if (tag === "h1") {
      blocks.push({ type: "h1", text });
      continue;
    }

    // ── Section headings: <h2>, <h3>
    if (tag === "h2" || tag === "h3") {
      blocks.push({ type: "h2", text });
      continue;
    }

    // ── Subtitle paragraphs (Google Docs uses class "subtitle")
    if (child.classList.contains("subtitle")) {
      blocks.push({ type: "subtitle", text });
      continue;
    }

    // ── Dialogue detection: short lines that look like chat messages
    // Google Docs format: bold "Name" followed by text on aligned paragraphs
    const bold = child.querySelector("span.c19, b, strong");
    if (bold) {
      const speaker = bold.textContent?.trim() ?? "";
      // Remove the speaker name from the paragraph text
      const dialogueText = text.replace(speaker, "").trim();
      if (speaker && dialogueText && speaker.length < 30) {
        blocks.push({ type: "dialogue", speaker, text: dialogueText });
        continue;
      }
    }

    // ── Regular paragraph
    // Clean up excessive inline styles from Google Docs
    const cleaned = cleanHtml(child.innerHTML);
    if (cleaned.trim()) {
      blocks.push({ type: "p", html: cleaned });
    }
  }

  return blocks;
}

/* ─────────────────────────────────────────────────────────
   Strip Google Docs inline styles, keep semantic markup
────────────────────────────────────────────────────────── */
function cleanHtml(html: string): string {
  return html
    .replace(/<span[^>]*class="[^"]*"[^>]*>/gi, "<span>") // strip class attrs
    .replace(/style="[^"]*"/gi, "") // strip inline styles
    .replace(/<span>\s*<\/span>/gi, "") // remove empty spans
    .replace(/<span>(<\/span>)+/gi, "") // remove nested empty spans
    .replace(/<br\s*\/?>/gi, " ") // normalize line breaks inside paragraphs
    .replace(/\s{2,}/g, " ") // collapse whitespace
    .trim();
}

/* ─────────────────────────────────────────────────────────
   Paginate blocks into physical book pages
────────────────────────────────────────────────────────── */
const MAX_WEIGHT_PER_PAGE = 800; // approximate "characters" per page

function blockWeight(block: DocBlock): number {
  switch (block.type) {
    case "h1":       return 120;
    case "h2":       return 80;
    case "subtitle": return 60;
    case "image":    return 400;
    case "dialogue": return block.speaker.length + block.text.length + 40;
    case "p":        return block.html.replace(/<[^>]*>/g, "").length;
    default:         return 50;
  }
}

function paginateBlocks(blocks: DocBlock[]): ParsedPage[] {
  const pages: ParsedPage[] = [];
  let current: DocBlock[] = [];
  let weight = 0;

  const flush = () => {
    if (current.length > 0) {
      pages.push({ blocks: current });
      current = [];
      weight = 0;
    }
  };

  for (const block of blocks) {
    // Explicit page break
    if (block.type === "h1" && block.text === "---PAGE_BREAK---") {
      flush();
      continue;
    }

    // Chapter headings always start a fresh page
    if (block.type === "h1" && current.length > 0) {
      flush();
    }

    const w = blockWeight(block);

    // Would overflow page? Start a new one
    if (weight + w > MAX_WEIGHT_PER_PAGE && current.length > 0) {
      flush();
    }

    current.push(block);
    weight += w;
  }

  flush();

  // Even page count (book leaves have front + back)
  if (pages.length % 2 !== 0) {
    pages.push({ blocks: [] });
  }

  return pages;
}
