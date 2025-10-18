export function formatLastUpdated(ts: number | null) {
  if (!ts) return "—";
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getHours()}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
