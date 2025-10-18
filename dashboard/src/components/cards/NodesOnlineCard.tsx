"use client";
import { useEffect, useState } from "react";
import { getCards } from "../../lib/api";
import { connect } from "../../lib/ws";
import { on, off, REFRESH } from "../../lib/bus";
import { useApp } from "../../store/app";

export default function NodesOnlineCard() {
  const [v, setV] = useState({ nodes_online: 0, nodes_total: 0 });
  const setLast = useApp(s => s.setLastUpdated);

  const load = async () => {
    const data = await getCards();
    setV(data);
    setLast();
  };

  useEffect(() => {
    load(); connect(load);
    const h = () => load();
    on(REFRESH, h);
    return () => off(REFRESH, h);
  }, []);

  return (
    <div className="card">
      <div className="title mb-1">Nodes Online</div>
      <div className="stat">{v.nodes_online}<span className="text-2xl ml-2">of {v.nodes_total}</span></div>
    </div>
  );
}
