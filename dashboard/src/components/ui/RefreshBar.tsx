"use client";
import { useEffect, useState } from "react";
import { emit, REFRESH } from "../../lib/bus";
import { useApp } from "../../store/app";
import { formatLastUpdated } from "../../lib/time";
import SettingsModal from "./SettingsModal";

export default function RefreshBar() {
  const { lastUpdated } = useApp();
  const [now, setNow] = useState<Date | null>(null); // null until mounted
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Only start the clock on the client to avoid SSR/CSR mismatch
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className="mb-5 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => emit(REFRESH)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 px-4 py-2 transition"
            title="Refresh all tiles now"
          >
            ⟳ Refresh
          </button>

          <button
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 px-4 py-2 transition"
            title="Open settings"
          >
            ⚙ Settings
          </button>
        </div>

        <div className="text-sm md:ml-4 opacity-80">
          <span className="mr-4">
            Live Clock:{" "}
            <span className="font-mono" suppressHydrationWarning>
              {now ? now.toLocaleTimeString() : "—"}
            </span>
          </span>
          <span>
            Last Updated:{" "}
            <span className="font-mono" suppressHydrationWarning>
              {formatLastUpdated(lastUpdated)}
            </span>
          </span>
        </div>
      </div>

      <SettingsModal open={settingsOpen} onCloseAction={() => setSettingsOpen(false)} />
    </>
  );
}
