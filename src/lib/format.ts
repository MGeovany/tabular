export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const datePart = d.toLocaleDateString([], { month: "short", day: "numeric" });
    return `${datePart} ${time}`;
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
