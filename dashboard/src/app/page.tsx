"use client";

import RefreshBar from "../components/ui/RefreshBar";
import NodesOnlineCard from "../components/cards/NodesOnlineCard";
import AvgLatencyCard from "../components/cards/AvgLatencyCard";
import ActiveBeaconCard from "../components/cards/ActiveBeaconCard";
import GraphCanvas from "../components/topology/GraphCanvas";
import MeshHealth from "../components/charts/MeshHealth";
import TopologySummary from "../components/charts/TopologySummary";
import TeamStatus from "../components/cards/TeamStatus";
import AlertList from "../components/alerts/AlertList";

export default function Page() {
  return (
    <>
      <RefreshBar />

      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        <NodesOnlineCard />
        <AvgLatencyCard />
        <ActiveBeaconCard />

        <div className="md:col-span-2 card">
          <div className="title mb-3">Tactical Map</div>
          <GraphCanvas />
        </div>

        <div className="card">
          <div className="title mb-3">Mesh Health</div>
          <MeshHealth />
        </div>

        <div className="card">
          <div className="title mb-3">Topology Summary</div>
          <TopologySummary />
        </div>

        <div className="card md:col-span-2">
          <div className="title mb-3">Team Status</div>
          <TeamStatus />
        </div>

        <div className="card">
          <div className="title mb-3">Alerts</div>
          <AlertList />
        </div>
      </div>
    </>
  );
}
