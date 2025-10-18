"use client";
import { useEffect, useState } from "react";
import { getComponentCounts } from "../../lib/api";
import { connect } from "../../lib/ws";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopologySummary() {
  const [counts, setCounts] = useState({ online_nodes: 0, beacons_live: 0, relays: 0, gateways: 0 });
  const load = async () => setCounts(await getComponentCounts());
  useEffect(() => { load(); connect(load); }, []);

  const data = [
    { name: "Online Nodes", val: counts.online_nodes },
    { name: "Beacons Live", val: counts.beacons_live },
    { name: "Relays", val: counts.relays },
    { name: "Gateways", val: counts.gateways },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="val" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
