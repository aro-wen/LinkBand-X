"use client";
import { useEffect, useState } from "react";
import { connect } from "../../lib/ws";
import { on, off, REFRESH } from "../../lib/bus";
import { useApp } from "../../store/app";

type Alert = { id:number; level:string; message:string; created_at:string; acknowledged_at?:string|null };

const color = (lvl:string) =>
  lvl==="warn" ? "border-yellow-400" :
  lvl==="crit" ? "border-red-500" :
  lvl==="success" ? "border-green-500" : "border-sky-400";

async function fetchAlerts() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/alerts`, { cache: "no-store" });
  return await r.json();
}

async function ack(id:number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/alerts/${id}/ack`, { method:"POST" });
}

export default function AlertList() {
  const [items, setItems] = useState<Alert[]>([]);
  const setLast = useApp(s => s.setLastUpdated);

  const load = async () => {
    const d = await fetchAlerts();
    setItems(d);
    setLast();
  };

  useEffect(() => {
    load(); connect(load);
    on(REFRESH, load);
    return () => off(REFRESH, load);
  }, []);

  return (
    <div className="space-y-3">
      {items.map(a => (
        <div key={a.id} className={`rounded-xl border-l-4 ${color(a.level)} bg-white/5 p-4 flex items-start justify-between gap-3`}>
          <div>
            <div className="text-sm opacity-70">{new Date(a.created_at).toLocaleString()}</div>
            <div className="text-base">{a.message}</div>
            {a.acknowledged_at && (
              <div className="text-xs opacity-60 mt-1">Acknowledged: {new Date(a.acknowledged_at).toLocaleString()}</div>
            )}
          </div>
          {!a.acknowledged_at && (
            <button
              className="shrink-0 rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/15 border border-white/10"
              onClick={async () => { await ack(a.id); await load(); }}
              title="Mark as acknowledged"
            >
              Acknowledge
            </button>
          )}
        </div>
      ))}
      {items.length===0 && <div className="text-slate-400">No alerts.</div>}
    </div>
  );
}
