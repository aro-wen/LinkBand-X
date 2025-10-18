let ws: WebSocket | null = null;
export function connect(onTick: () => void) {
  if (ws) return;
  const url = (process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws");
  ws = new WebSocket(url);
  ws.onmessage = () => onTick();
  ws.onclose = () => { ws = null; setTimeout(() => connect(onTick), 2000); };
}
