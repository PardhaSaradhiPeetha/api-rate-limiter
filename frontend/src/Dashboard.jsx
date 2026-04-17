import { useState } from "react";
import RefreshIcon from './assets/refresh.svg';

import Card from './Card';
import TrafficGraph from "./TrafficGraph";

function Dashboard() {
  const [stats] = useState({
    totalRequests: 1200,
    blockedRequests: 300,
    allowedRequests: 900,
    activeUsers: 25,
  });

  return (
    <section className="h-[calc(100vh-24px)] m-3 rounded-2xl overflow-hidden flex flex-col text-white bg-linear-to-br from-slate-900 via-slate-800 to-slate-950">

      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>

        <button className="p-2 rounded-lg bg-cyan-200 ">
          <img src={RefreshIcon} alt="Refresh" className="w-5 h-5" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          <Card title="Total Requests" value={stats.totalRequests} />
          <Card title="Blocked Requests" value={stats.blockedRequests} />
          <Card title="Allowed Requests" value={stats.allowedRequests} />
          <Card title="Active Users" value={stats.activeUsers} />
        </div>

        {/* GRAPH */}
        <TrafficGraph />

        {/* TABLES */}
        <div className="grid grid-cols-2 gap-4">

          {/* Blocked */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <h2 className="mb-3 font-medium text-white">Blocked IPs</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>192.168.1.1 → 15 blocks</li>
              <li>10.0.0.2 → 8 blocks</li>
              <li>172.16.0.3 → 5 blocks</li>
            </ul>
          </div>

          {/* Active */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <h2 className="mb-3 font-medium text-white">Active Users</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>192.168.1.2 → 45 requests</li>
              <li>192.168.1.3 → 20 requests</li>
              <li>10.0.0.4 → 12 requests</li>
            </ul>
          </div>

        </div>

        {/* SYSTEM */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h2 className="mb-2 font-medium text-white">System Info</h2>
          <p className="text-sm text-gray-300">Rate Limit: 10 req/min</p>
          <p className="text-sm text-gray-300">Algorithm: Sliding Window</p>
          <p className="text-sm text-cyan-300">
            Redis: Connected
          </p>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;