import { useEffect, useMemo, useState } from "react";
import RefreshIcon from '../assets/refresh.svg';

import Card from './Card.jsx';
import { apiFetch } from "../utils/api.js";

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, blocked: 0, allowed: 0 });
  const [ipRows, setIpRows] = useState([]);
  const [sortBy, setSortBy] = useState("totalRequests");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsData, ipData] = await Promise.all([
        apiFetch("/api/dashboard/stats"),
        apiFetch("/api/dashboard/ip-summary")
      ]);

      setStats(statsData);
      setIpRows(ipData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const sortedIpRows = useMemo(() => {
    return [...ipRows].sort((a, b) => {
      if (sortBy === "ip") {
        return a.ip.localeCompare(b.ip);
      }

      return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
    });
  }, [ipRows, sortBy]);

  return (
    <section className="min-h-[calc(100vh-24px)] m-3 rounded-2xl overflow-hidden flex flex-col text-white bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10">

      {/* HEADER */}
      <div className="flex flex-wrap gap-3 justify-between items-center p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-semibold">Developer Dashboard</h1>
          <p className="text-sm text-gray-400">Live request activity and IP usage</p>
        </div>

        <button
          onClick={loadDashboard}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-100 border border-cyan-300/20 transition"
        >
          <img src={RefreshIcon} alt="Refresh" className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card title="Total Requests" value={loading ? "…" : stats.total ?? 0} />
          <Card title="Blocked Requests" value={loading ? "…" : stats.blocked ?? 0} />
          <Card title="Allowed Requests" value={loading ? "…" : stats.allowed ?? 0} />
          <Card title="Tracked IPs" value={loading ? "…" : ipRows.length} />
        </div>

        {/* IP LIST */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
            <div>
              <h2 className="font-medium text-white">IP Activity</h2>
              <p className="text-sm text-gray-400">
                Sorted by {sortBy === "ip" ? "IP address" : sortBy.replace("Requests", " requests")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { key: "totalRequests", label: "Most Requests" },
                { key: "blockedRequests", label: "Most Blocked" },
                { key: "allowedRequests", label: "Most Allowed" },
                { key: "ip", label: "IP A→Z" }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`px-3 py-1.5 rounded-full border transition ${sortBy === option.key
                      ? "bg-cyan-400/20 border-cyan-300/40 text-cyan-100"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-3 px-4 py-3 bg-black/20 text-xs uppercase tracking-wide text-gray-400">
              <span>IP Address</span>
              <span>Total</span>
              <span>Allowed</span>
              <span>Blocked</span>
            </div>

            <div className="divide-y divide-white/5">
              {sortedIpRows.length === 0 && !loading ? (
                <div className="px-4 py-6 text-sm text-gray-400">No traffic recorded yet.</div>
              ) : (
                sortedIpRows.map((row) => (
                  <div key={row.ip} className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-3 px-4 py-3 text-sm">
                    <span className="font-mono text-white">{row.ip}</span>
                    <span className="text-gray-300">{row.totalRequests}</span>
                    <span className="text-emerald-300">{row.allowedRequests}</span>
                    <span className="text-rose-300">{row.blockedRequests}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {lastUpdated && (
            <p className="mt-4 text-xs text-gray-500">
              Last updated {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}

export default Dashboard;