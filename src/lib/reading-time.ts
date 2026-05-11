const WORDS_PER_MINUTE_ES = 200;

export function calcReadingTime(content: string): {
  minutes: number;
  words: number;
} {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_~\-\[\]\(\)!]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE_ES));
  return { minutes, words };
}
