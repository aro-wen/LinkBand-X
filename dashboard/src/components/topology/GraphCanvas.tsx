"use client";
import { useEffect, useMemo, useState } from "react";
import { getTopology } from "../../lib/api";
import { connect } from "../../lib/ws";
import { on, off, REFRESH } from "../../lib/bus";
import { useApp } from "../../store/app";

type Node = { id:number; name:string; type:string; status:string };
type Link = { src_id:number; dst_id:number; latency_ms:number|null };
type Topo = { nodes: Node[]; links: Link[] };

const colorFor = (s:string) =>
  s==="online" ? "#22c55e" : s==="warning" ? "#f59e0b" : s==="critical" ? "#ef4444" : "#64748b";

export default function GraphCanvas() {
  const [topo, setTopo] = useState<Topo>({ nodes:[], links:[] });
  const [hover, setHover] = useState<{id:number;x:number;y:number}|null>(null);
  const setLast = useApp(s => s.setLastUpdated);

  const load = async () => {
    const t = await getTopology();
    setTopo(t);
    setLast();
  };

  useEffect(() => {
    load(); connect(load);
    on(REFRESH, load);
    return () => off(REFRESH, load);
  }, []);

  const W = 720, H = 260, padding = 40;
  const positions = useMemo(() => {
    const n = topo.nodes.length || 1;
    return topo.nodes.reduce<Record<number,{x:number;y:number;type:string;status:string;name:string}>>((acc, node, i) => {
      const x = padding + (i * (W - 2*padding)) / Math.max(1, n-1);
      const yBand = node.type==="gateway" ? 20 : node.type==="primary" ? 0 : node.type==="relay" ? 70 : 110;
      const y = padding + yBand + (Math.sin(i)*6) + 60;
      acc[node.id] = { x, y, type: node.type, status: node.status, name: node.name };
      return acc;
    }, {});
  }, [topo.nodes]);

  // pulse CSS via inline style keyframes
  const pulse = `
  @keyframes pulseDot { 0%{r:7; opacity:0.9} 50%{r:10; opacity:0.6} 100%{r:7; opacity:0.9} }
  `;

  return (
    <div className="relative">
      <style>{pulse}</style>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} className="rounded-xl bg-black/30 border border-white/10">
        {/* grid */}
        {[...Array(6)].map((_,i) => (
          <line key={i} x1={padding} x2={W-padding} y1={padding+i*35} y2={padding+i*35} stroke="#ffffff10" />
        ))}
        {/* links */}
        {topo.links.map((l, idx) => {
          const a = positions[l.src_id], b = positions[l.dst_id];
          if (!a || !b) return null;
          return (
            <g key={idx}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#60a5fa" strokeOpacity="0.6" strokeWidth="2" />
              {l.latency_ms!=null && (
                <text x={(a.x+b.x)/2} y={(a.y+b.y)/2 - 6} fontSize="10" fill="#93c5fd">{l.latency_ms}ms</text>
              )}
            </g>
          );
        })}
        {/* nodes */}
        {topo.nodes.map(n => {
          const p = positions[n.id]; if (!p) return null;
          const c = colorFor(n.status);
          const pulseThis = n.status==="online" || n.status==="warning"; // active nodes pulse
          return (
            <g key={n.id}
               onMouseEnter={(e) => {
                 const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                 setHover({ id:n.id, x: (p.x/ W)*rect.width, y: (p.y/ H)*rect.height });
               }}
               onMouseLeave={() => setHover(null)}
               style={{ cursor:"pointer" }}>
              <circle cx={p.x} cy={p.y} r={8} fill={c} style={pulseThis ? { animation:"pulseDot 1.4s infinite" } : {}} />
              <text x={p.x+12} y={p.y+4} fontSize="12" fill="#cbd5e1">{n.name}</text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hover && (() => {
        const nd = topo.nodes.find(x => x.id===hover.id)!;
        const p = positions[hover.id]!;
        const badge = nd.type.toUpperCase();
        return (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-white/15 bg-[#0b0d12] px-3 py-2 text-sm shadow-lg"
            style={{ left: hover.x + 12, top: hover.y - 10 }}
          >
            <div className="font-medium">{nd.name}</div>
            <div className="opacity-80">{badge} • <span style={{color: colorFor(nd.status)}}>{nd.status}</span></div>
          </div>
        );
      })()}
    </div>
  );
}
