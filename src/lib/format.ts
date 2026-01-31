export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const today = now.toDateString() === d.toDateString();
    if (today) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === d.toDateString()) return "YESTERDAY";
    return d.toLocaleDateString([], { month: "short", day: "numeric" }).toUpperCase();
  } catch {
    return iso;
  }
}

export function formatSize(bytes?: number): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
