"use client";
import { useEffect, useState } from "react";
import {
  getSerialPorts,
  getSerialStatus,
  connectSerial,
  disconnectSerial,
} from "../../lib/api";

export default function SettingsModal({
  open,
  onCloseAction,              // <-- rename prop
}: {
  open: boolean;
  onCloseAction: () => void;  // <-- renamed type
}) {
  const [ports, setPorts] = useState<string[]>([]);
  const [sel, setSel] = useState<string>("");
  const [typed, setTyped] = useState<string>("");
  const [status, setStatus] = useState<any>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  const load = async () => {
    setErr("");
    try {
      const p = await getSerialPorts().catch(() => ({ ports: [] }));
      setPorts(p?.ports || []);
      const s = await getSerialStatus().catch(() => ({}));
      setStatus(s || {});
      if (s?.port) {
        setSel(s.port);
        setTyped(s.port);
      }
    } catch {
      // ignore; err text is for connect/disconnect
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  if (!open) return null;

  const chosen = (typed || sel).trim();

  const handleConnect = async () => {
    if (!chosen) return;
    setBusy(true);
    setErr("");
    const res = await connectSerial(chosen).catch((e) => ({ ok: false, error: String(e) }));
    setBusy(false);
    if (!res?.ok) setErr(res?.error || "Failed to connect");
    await load();
  };

  const handleDisconnect = async () => {
    setBusy(true);
    setErr("");
    await disconnectSerial().catch((e) => setErr(String(e)));
    setBusy(false);
    await load();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="w-[520px] max-w-full rounded-xl border border-white/10 bg-[#0b0d12] p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-semibold">Settings</div>
          <button
            onClick={onCloseAction}
            className="rounded-lg bg-white/10 px-3 py-1 hover:bg-white/15"
          >
            Close
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <div className="mb-2 opacity-80">Gateway Serial Port</div>

            {/* Row 1: Select + Rescan */}
            <div className="flex gap-2 mb-2">
              <select
                value={sel}
                onChange={(e) => {
                  setSel(e.target.value);
                  if (!typed) setTyped(e.target.value);
                }}
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 flex-1"
              >
                <option value="">Select a port…</option>
                {ports.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <button
                className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/15 border border-white/10"
                onClick={load}
                disabled={busy}
                title="Rescan ports"
              >
                Rescan
              </button>
            </div>

            {ports.length === 0 && (
              <div className="text-xs opacity-70 -mt-1 mb-2">
                No ports detected. You can still type a port (e.g.{" "}
                <span className="font-mono">COM9</span>) and click Connect.
              </div>
            )}

            {/* Row 2: Manual input + Connect/Disconnect */}
            <div className="flex gap-2">
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="Or type a port (e.g. COM9)"
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 flex-1"
              />
              <button
                className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/15 border border-white/10"
                onClick={handleConnect}
                disabled={!chosen || busy}
                title="Open serial connection"
              >
                Connect
              </button>
              <button
                className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/15 border border-white/10"
                onClick={handleDisconnect}
                disabled={busy}
                title="Close serial connection"
              >
                Disconnect
              </button>
            </div>

            {err && <div className="text-xs text-red-400 mt-2">{err}</div>}

            <div className="mt-2 opacity-70">
              Status:{" "}
              {status?.running
                ? `connected to ${status?.port} @ ${status?.baud}`
                : "disconnected"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
