import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageLeaf } from "./PageLeaf";
import { ParsedPage, DocBlock } from "@/utils/googleDocsParser";

interface Book3DProps {
  pages: ParsedPage[];
}

export function Book3D({ pages }: Book3DProps) {
  // "currentLeaf" is how many leaves have been flipped to the left.
  // 0 = book closed (showing only the cover)
  // leavesCount = book fully open on last page / back cover
  const [currentLeaf, setCurrentLeaf] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  // Leaf 0 = Front Cover
  // Leaves 1..N = Content pages (each leaf has front + back page)
  // Leaf N+1 = Back Cover
  const contentLeavesCount = Math.ceil(pages.length / 2);
  const leavesCount = contentLeavesCount + 2; // +2 covers

  const handleNext = useCallback(() => {
    if (currentLeaf < leavesCount - 1) {
      setFlipDirection("next");
      setCurrentLeaf((prev) => prev + 1);
    }
  }, [currentLeaf, leavesCount]);

  const handlePrev = useCallback(() => {
    if (currentLeaf > 0) {
      setFlipDirection("prev");
      setCurrentLeaf((prev) => prev - 1);
    }
  }, [currentLeaf]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const renderContentBlock = (block: DocBlock, idx: number) => {
    switch (block.type) {
      case "image":
        return (
          <div key={idx} className="my-4 rounded-lg overflow-hidden shadow-sm border border-amber-100">
            <img src={block.src} alt="" className="w-full object-cover max-h-52" loading="lazy" />
          </div>
        );
      case "h1":
        return (
          <h1 key={idx} className="font-serif text-3xl font-bold text-amber-900 mt-6 mb-4 leading-tight">
            {block.text}
          </h1>
        );
      case "h2":
        return (
          <h2 key={idx} className="font-serif text-2xl font-bold text-slate-700 mt-4 mb-3 leading-snug">
            {block.text}
          </h2>
        );
      case "subtitle":
        return (
          <p key={idx} className="font-serif text-amber-800/60 italic text-base mb-4">
            {block.text}
          </p>
        );
      case "dialogue":
        return (
          <div key={idx} className="pl-4 border-l-2 border-pink-200 py-1 my-2 bg-pink-50/20 rounded-r-md">
            <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-pink-600 block mb-0.5">
              {block.speaker}
            </span>
            <p className="font-serif text-slate-600 text-[14px] leading-relaxed">
              {block.text}
            </p>
          </div>
        );
      case "p":
      default:
        return (
          <p
            key={idx}
            className="font-serif text-slate-600 leading-[1.85] mb-3 text-[14.5px] tracking-wide"
            dangerouslySetInnerHTML={{ __html: "html" in block ? block.html : "" }}
          />
        );
    }
  };

  const renderPageContent = (page?: ParsedPage, pageNumber?: number) => {
    if (!page || page.blocks.length === 0) {
      return (
        <div className="p-10 h-full flex items-center justify-center">
          <div className="text-center opacity-20">
            <div className="w-12 h-16 border-2 border-amber-300 rounded mx-auto mb-3 opacity-50" />
            <p className="font-serif italic text-amber-700 text-sm">em branco</p>
          </div>
        </div>
      );
    }
    return (
      <div className="p-7 md:p-10 h-full flex flex-col overflow-hidden">
        <div className="flex-grow overflow-hidden">
          {page.blocks.map((block, i) => renderContentBlock(block, i))}
        </div>
        {pageNumber !== undefined && (
          <div className="text-center text-amber-400 font-serif text-xs mt-2 pb-1 tracking-widest">
            — {pageNumber} —
          </div>
        )}
      </div>
    );
  };

  // The front cover right page content
  const coverFront = (
    <div className="flex flex-col items-center justify-center h-full text-center p-8"
      style={{ background: "linear-gradient(135deg, #3b1d5e 0%, #1e0a3c 60%, #2d1454 100%)" }}
    >
      {/* Decorative border */}
      <div className="absolute inset-4 border border-purple-400/20 rounded-lg pointer-events-none" />
      <div className="absolute inset-6 border border-purple-400/10 rounded-md pointer-events-none" />
      
      <div className="relative z-10">
        {/* Ornamental top */}
        <div className="flex items-center justify-center gap-2 mb-6 text-purple-300/50 text-xl">
          ✦ ✦ ✦
        </div>
        
        <h1 className="font-serif text-5xl md:text-6xl text-purple-100 mb-3 leading-tight drop-shadow-lg tracking-wide">
          Nossa<br/>
          <span className="text-purple-300 italic">História</span>
        </h1>
        
        <div className="w-20 h-px bg-purple-400/30 mx-auto my-5" />
        
        <p className="text-purple-300/70 font-serif italic text-sm tracking-widest">
          as memórias que nos fazem<br/>quem somos
        </p>
        
        {/* Ornamental bottom */}
        <div className="flex items-center justify-center gap-2 mt-8 text-purple-300/30 text-xl">
          ✦ ✦ ✦
        </div>
      </div>
    </div>
  );

  // Inside front cover (left page after opening)
  const insideFrontCover = (
    <div className="w-full h-full bg-[#EAE4D3] flex items-end justify-center pb-8">
      <p className="font-serif italic text-amber-700/30 text-xs tracking-wider">com amor, para sempre</p>
    </div>
  );

  // Inside back cover
  const insideBackCover = (
    <div className="w-full h-full bg-[#EAE4D3] flex items-center justify-center">
      <div className="text-center opacity-20">
        <div className="font-serif italic text-amber-700 text-2xl">Fim.</div>
      </div>
    </div>
  );

  // The back cover
  const backCover = (
    <div className="flex flex-col items-center justify-center h-full text-center p-8"
      style={{ background: "linear-gradient(135deg, #2d1454 0%, #1e0a3c 60%, #3b1d5e 100%)" }}
    >
      <div className="absolute inset-4 border border-purple-400/20 rounded-lg pointer-events-none" />
      <p className="font-serif italic text-purple-300/50 text-sm tracking-widest relative z-10">
        "I just want to be your best friend"
        <br />
        <span className="text-purple-300/30 text-xs mt-2 block">— Rex Orange County</span>
      </p>
    </div>
  );

  const pageIndicator = () => {
    if (currentLeaf === 0) return "Capa";
    if (currentLeaf >= leavesCount - 1) return "Fim";
    const spread = (currentLeaf - 1) * 2;
    return `Páginas ${spread + 1} – ${spread + 2}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      {/* 3D Book Wrapper */}
      <div
        className="relative w-full max-w-3xl"
        style={{ perspective: "2500px" }}
      >
        {/* Ambient glow behind book */}
        <div className="absolute inset-0 -bottom-6 bg-purple-200/30 blur-3xl rounded-full scale-75 pointer-events-none" />
        {/* Shadow underneath */}
        <div className="absolute inset-x-8 bottom-[-28px] h-8 bg-black/20 blur-2xl rounded-full pointer-events-none" />

        {/* THE BOOK */}
        <div
          className="relative w-full flex"
          style={{ height: "520px", transformStyle: "preserve-3d" }}
        >
          {/* ──── LEFT SPREAD (already-turned pages or closed state) ──── */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full rounded-l-xl overflow-hidden shadow-xl"
            style={{ background: "#FAF8F3", borderRight: "1px solid #e5e0d6" }}
          >
            {/* Depth / Page stack visible on left edge */}
            {Array.from({ length: Math.min(currentLeaf, 8) }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 rounded-l-xl"
                style={{
                  left: `${i * 0.5}px`,
                  right: 0,
                  background: i % 2 === 0 ? "#FAF8F3" : "#F5F0E8",
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.04)",
                  zIndex: -i,
                }}
              />
            ))}

            {/* Left page content */}
            <div className="relative h-full z-10">
              {currentLeaf === 0
                ? // Closed — show spine/cover left side 
                  <div className="h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(to right, #3b1d5e, #2d1454)" }}
                  >
                    <div className="text-purple-300/20 font-serif text-xs writing-vertical tracking-widest">
                      Nossa História
                    </div>
                  </div>
                : currentLeaf === 1
                  ? renderPageContent(undefined, undefined) // Inside front cover = blank
                  : (() => {
                    const contentLeafIdx = currentLeaf - 2;
                    const backPageIdx = contentLeafIdx * 2 + 1;
                    return renderPageContent(pages[backPageIdx], backPageIdx + 1);
                  })()
              }
            </div>

            {/* Spine shadow on right edge of left page */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/10 pointer-events-none" />
          </div>

          {/* ──── SPINE ──── */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-10"
            style={{ width: "12px", background: "linear-gradient(to right, #c8b89a, #e8dfc8, #c8b89a)", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
          />

          {/* ──── RIGHT SPREAD (static; current right page) ──── */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full rounded-r-xl overflow-hidden shadow-xl"
            style={{ background: "#FAF8F3", borderLeft: "1px solid #e5e0d6" }}
          >
            {/* Depth / remaining page stack on right edge */}
            {Array.from({ length: Math.min(leavesCount - currentLeaf - 1, 8) }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 rounded-r-xl"
                style={{
                  right: `${i * 0.5}px`,
                  left: 0,
                  background: i % 2 === 0 ? "#FAF8F3" : "#F5F0E8",
                  boxShadow: "inset 2px 0 4px rgba(0,0,0,0.04)",
                  zIndex: -i,
                }}
              />
            ))}

            {/* Right page content */}
            <div className="relative h-full z-10">
              {currentLeaf === 0
                ? coverFront
                : currentLeaf >= leavesCount - 1
                  ? backCover
                  : (() => {
                    const contentLeafIdx = currentLeaf - 1;
                    const frontPageIdx = contentLeafIdx * 2;
                    return renderPageContent(pages[frontPageIdx], frontPageIdx + 1);
                  })()
              }
            </div>

            {/* Spine shadow on left edge of right page */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-black/10 pointer-events-none" />
          </div>

          {/* ──── FLIPPING LEAVES ──── */}
          {Array.from({ length: leavesCount }).map((_, i) => {
            const isFlipped = i < currentLeaf;
            const zIndex = isFlipped ? i + 10 : leavesCount - i + 10;
            const isFrontCover = i === 0;
            const isBackCover = i === leavesCount - 1;

            // Only show leaves that are actively mid-flip or are the top of the stack
            // (for performance, we render all but only animate the top ones)
            const isActiveLeaf = i === currentLeaf - 1 || i === currentLeaf;
            if (!isActiveLeaf && Math.abs(i - currentLeaf) > 2) return null;

            let frontContent, backContent;

            if (isFrontCover) {
              frontContent = coverFront;
              backContent = insideFrontCover;
            } else if (isBackCover) {
              frontContent = insideBackCover;
              backContent = backCover;
            } else {
              const contentLeafIdx = i - 1;
              const frontPageIdx = contentLeafIdx * 2;
              const backPageIdx = contentLeafIdx * 2 + 1;
              frontContent = renderPageContent(pages[frontPageIdx], frontPageIdx + 1);
              backContent = renderPageContent(pages[backPageIdx], backPageIdx + 1);
            }

            return (
              <PageLeaf
                key={i}
                zIndex={zIndex}
                isFlipped={isFlipped}
                isCover={isFrontCover || isBackCover}
                front={frontContent}
                back={backContent}
              />
            );
          })}
        </div>
      </div>

      {/* ──── Navigation ──── */}
      <div className="flex items-center gap-8 mt-16 z-10 relative">
        <motion.button
          onClick={handlePrev}
          disabled={currentLeaf === 0}
          whileTap={{ scale: 0.93 }}
          className="p-3.5 rounded-full bg-white border border-purple-100 shadow-md text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 hover:border-purple-200 hover:shadow-purple-100 hover:shadow-lg transition-all"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.span
            key={currentLeaf}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="font-serif text-slate-400 text-sm min-w-[120px] text-center tracking-wide"
          >
            {pageIndicator()}
          </motion.span>
        </AnimatePresence>

        <motion.button
          onClick={handleNext}
          disabled={currentLeaf >= leavesCount - 1}
          whileTap={{ scale: 0.93 }}
          className="p-3.5 rounded-full bg-white border border-purple-100 shadow-md text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 hover:border-purple-200 hover:shadow-purple-100 hover:shadow-lg transition-all"
          aria-label="Próxima página"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <p className="mt-4 text-stone-400 text-xs font-sans tracking-wider">
        Use ← → para navegar entre as páginas
      </p>
    </div>
  );
}
