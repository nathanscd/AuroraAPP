import { RELATIONSHIP_START_DATE } from "@/constants";

export function calculateDaysTogether(startDate: Date): number {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const diffTime = now.getTime() - start.getTime();

  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDaysToReadable(totalDays: number): string {
  const start = new Date(RELATIONSHIP_START_DATE);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;

    const daysInPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();

    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  }

  if (days > 0 || parts.length === 0) {
    parts.push(`${days} ${days === 1 ? "dia" : "dias"}`);
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return `${parts[0]} e ${parts[1]}`;
  }

  return `${parts[0]}, ${parts[1]} e ${parts[2]}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;

  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10).toString();

  const monthNamesStr = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const monthName = monthNamesStr[monthIdx] || "";

  return `${day} de ${monthName} de ${year}`;
}