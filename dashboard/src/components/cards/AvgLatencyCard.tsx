"use client";
import { useEffect, useState } from "react";
import { getCards } from "../../lib/api";
import { connect } from "../../lib/ws";

export default function AvgLatencyCard() {
  const [ms, setMs] = useState(0);
  const load = async () => { const s = await getCards(); setMs(s.avg_latency_ms); };
  useEffect(() => { load(); connect(load); }, []);
  return (
    <div className="card">
      <div className="title mb-1">Avg Latency</div>
      <div className="stat">{ms}<span className="text-2xl ml-2">ms</span></div>
    </div>
  );
}
