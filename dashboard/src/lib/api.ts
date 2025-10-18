const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function getCards() {
  const r = await fetch(`${API}/api/stats/cards`, { cache: "no-store" });
  return await r.json();
}
export async function getAlerts() {
  const r = await fetch(`${API}/api/alerts`, { cache: "no-store" });
  return await r.json();
}
export async function getTopology() {
  const r = await fetch(`${API}/api/topology`, { cache: "no-store" });
  return await r.json();
}
export async function getMeshHealth() {
  const r = await fetch(`${API}/api/mesh/health`, { cache: "no-store" });
  return await r.json();
}
export async function getComponentCounts() {
  const r = await fetch(`${API}/api/stats/components`, { cache: "no-store" });
  return await r.json();
}
export async function getTeam() {
  const r = await fetch(`${API}/api/team`, { cache: "no-store" });
  return await r.json();
}
export async function getActiveBeacons() {
  const r = await fetch(`${API}/api/beacons/active`, { cache: "no-store" });
  return await r.json();
}

export async function getNodeDetail(id: number) {
  const r = await fetch(`${API}/api/nodes/${id}`, { cache: "no-store" });
  return await r.json();
}

export async function getSerialPorts() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/system/serial/ports`, { cache: "no-store" });
  return await r.json();
}
export async function getSerialStatus() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/system/serial/status`, { cache: "no-store" });
  return await r.json();
}
export async function connectSerial(port: string, baud = 115200) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/system/serial/connect`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ port, baud })
  });
  return await r.json();
}
export async function disconnectSerial() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/system/serial/disconnect`, { method: "POST" });
  return await r.json();
}