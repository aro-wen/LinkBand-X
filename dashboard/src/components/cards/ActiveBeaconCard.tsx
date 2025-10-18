"use client";
import { useEffect, useState } from "react";
import { getActiveBeacons } from "../../lib/api";
import { connect } from "../../lib/ws";
import { on, off, REFRESH } from "../../lib/bus";
import { useApp } from "../../store/app";

type Beacon = { id:number; name:string; identifier:string; status:string; battery_pct:number|null };

export default function ActiveBeaconCard() {
  const [list, setList] = useState<Beacon[]>([]);
  const setLast = useApp(s => s.setLastUpdated);

  const load = async () => {
    const d = await getActiveBeacons();
    setList(d);
    setLast();
  };

  useEffect(() => {
    load(); connect(load);
    on(REFRESH, load);
    return () => off(REFRESH, load);
  }, []);

  const n = list.length;
  const first = list[0];

  return (
    <div className="card">
      <div className="title mb-1">Active Beacon</div>
      <div className="stat">{n}</div>
      {first && (
        <div className="mt-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs border border-white/20 bg-white/10">
              {first.identifier}
            </span>
            <span className="opacity-80">{first.name}</span>
          </div>
          {first.battery_pct!=null && (
            <div className="opacity-70 mt-1">Battery: {first.battery_pct}%</div>
          )}
        </div>
      )}
    </div>
  );
}
