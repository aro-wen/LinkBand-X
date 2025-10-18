"use client";
import { useEffect, useState } from "react";
import { getTeam } from "../../lib/api";
import { connect } from "../../lib/ws";

type T = { id:number; name:string; role:string; status:"online"|"away"|"offline"; avatar?:string };

export default function TeamStatus() {
  const [team, setTeam] = useState<T[]>([]);
  const load = async () => setTeam(await getTeam());
  useEffect(() => { load(); connect(load); }, []);
  const dot = (s:T["status"]) => s==="online"?"bg-green-500":s==="away"?"bg-yellow-400":"bg-slate-500";

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {team.map(m => (
        <div key={m.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">{m.avatar ?? "?"}</div>
          <div className="flex-1">
            <div className="font-medium">{m.name}</div>
            <div className="text-sm opacity-70">{m.role}</div>
          </div>
          <div className={`w-3 h-3 rounded-full ${dot(m.status)}`} />
        </div>
      ))}
    </div>
  );
}
