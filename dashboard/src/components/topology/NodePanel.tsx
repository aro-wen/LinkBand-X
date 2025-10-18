"use client";

type Props = {
  nodeId: number | null;
  data: {
    id: number;
    name: string;
    type: string;            // primary | relay | gateway | standard
    status: string;          // online | warning | critical | offline
    battery_pct?: number | null;
    degree?: number;
    last_seen?: string;
    last_alert?: {
      level: string;         // info | warn | crit | success
      message: string;
      created_at: string;
    } | null;
  } | null;
  onCloseAction: () => void; // renamed to satisfy Next “server action” lint
};

export default function NodePanel({ nodeId, data, onCloseAction }: Props) {
  const open = Boolean(nodeId);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[360px] bg-[#0b0d12] border-l border-white/10 shadow-2xl transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ transitionDuration: "200ms" }}
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <div className="text-lg font-semibold">Node Details</div>
        <button
          onClick={onCloseAction}
          className="rounded-lg bg-white/10 px-3 py-1 hover:bg-white/15"
        >
          Close
        </button>
      </div>

      {/* Body */}
      {data ? (
        <div className="p-4 space-y-2 text-sm">
          <Row label="Name" value={data.name} />
          <Row label="Type" value={titleCase(data.type)} />
          <Row label="Status" value={titleCase(data.status)} />
          {data.battery_pct != null && <Row label="Battery" value={`${data.battery_pct}%`} />}
          {typeof data.degree === "number" && <Row label="Links" value={String(data.degree)} />}
          {data.last_seen && (
            <Row
              label="Last Seen"
              value={new Date(data.last_seen).toLocaleString()}
            />
          )}

          {/* Last Alert */}
          <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-medium mb-1">Last Alert</div>
            {data.last_alert ? (
              <>
                <div className="opacity-80">
                  {data.last_alert.level} •{" "}
                  {new Date(data.last_alert.created_at).toLocaleString()}
                </div>
                <div>{data.last_alert.message}</div>
              </>
            ) : (
              <div className="opacity-60">No alerts.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 text-slate-400">Select a node…</div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-28 opacity-70">{label}:</div>
      <div className="flex-1">{value}</div>
    </div>
  );
}

function titleCase(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}
