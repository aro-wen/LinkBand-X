"use client";
import { useEffect, useState } from "react";
import { getMeshHealth } from "../../lib/api";
import { connect } from "../../lib/ws";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Pt = { ts: string; score_pct: number };

export default function MeshHealth() {
  const [data, setData] = useState<Pt[]>([]);
  const load = async () => {
    const d = await getMeshHealth();
    setData(d.map((x: any) => ({ ts: new Date(x.ts).toLocaleTimeString(), score_pct: x.score_pct })));
  };
  useEffect(() => { load(); connect(load); }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="ts" />
          <YAxis domain={[80, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score_pct" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
