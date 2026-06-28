import { useEffect, useMemo, useState } from "react";
import RefreshIcon from '../assets/refresh.svg';

import Card from './Card.jsx';
import { apiFetch } from "../utils/api.js";

const formatIp = (ip) => {
  if (ip === "::1" || ip === "127.0.0.1") return "Localhost (127.0.0.1)";
  if (!ip || ip === "unknown") return "Unknown";

  return ip;
};

const formatDateTime = (value) => {
  if (!value) return "Recent";

  return new Date(value).toLocaleString();
};

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, blocked: 0, allowed: 0 });
  const [ipRows, setIpRows] = useState([]);
  const [logs, setLogs] = useState([]);
  const [sortBy, setSortBy] = useState("totalRequests");
  const [ipFilter, setIpFilter] = useState("");
  const [requestIpFilter, setRequestIpFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsData, ipData, logsData] = await Promise.all([
        apiFetch("/api/dashboard/stats"),
        apiFetch("/api/dashboard/ip-summary"),
        apiFetch("/api/dashboard/logs")
      ]);

      setStats(statsData);
      setIpRows(ipData);
      setLogs(logsData);
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
    return ipRows.filter((row) => (
      formatIp(row.ip).toLowerCase().includes(ipFilter.toLowerCase())
    )).sort((a, b) => {
      if (sortBy === "ip") {
        return a.ip.localeCompare(b.ip);
      }

      return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
    });
  }, [ipRows, sortBy, ipFilter]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesIp = formatIp(log.ip).toLowerCase().includes(requestIpFilter.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "allowed" && log.allowed) ||
        (statusFilter === "blocked" && !log.allowed);

      return matchesIp && matchesStatus;
    });
  }, [logs, requestIpFilter, statusFilter]);

  const totalRequests = stats.total ?? 0;
  const allowedRequests = stats.allowed ?? 0;
  const blockedRequests = stats.blocked ?? 0;

  return (
    <section className="min-h-[calc(100vh-24px)] bg-slate-950 text-white">

      {/* HEADER */}
      <div className="flex flex-wrap gap-3 justify-between items-center border-b border-white/10 bg-slate-900 px-6 py-5">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400">API request activity</p>
        </div>

        <button
          onClick={loadDashboard}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <img src={RefreshIcon} alt="Refresh" className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* CONTENT */}
      <div className="space-y-6 p-4 lg:p-6">
        {error && (
          <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card title="Total Requests" value={loading ? "..." : totalRequests} tone="blue" />
          <Card title="Allowed" value={loading ? "..." : allowedRequests} tone="green" />
          <Card title="Blocked" value={loading ? "..." : blockedRequests} tone="red" />
          <Card title="Tracked IPs" value={loading ? "..." : ipRows.length} tone="purple" />
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-900">
          <div className="px-4 py-4">
            <h2 className="font-semibold text-white">Recent Requests</h2>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-white/10 p-4">
            <input
              type="search"
              value={requestIpFilter}
              onChange={(event) => setRequestIpFilter(event.target.value)}
              placeholder="Filter by IP address"
              className="w-full max-w-sm rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            >
              <option value="all">All statuses</option>
              <option value="allowed">Allowed only</option>
              <option value="blocked">Blocked only</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-t border-white/10 text-left text-sm">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">IP Address</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredLogs.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-slate-400">No requests found.</td>
                  </tr>
                ) : (
                  filteredLogs.slice(0, 12).map((log) => (
                    <tr key={log._id} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-slate-300">{formatDateTime(log.createdAt)}</td>
                      <td className="px-4 py-3 font-mono text-white">{formatIp(log.ip)}</td>
                      <td className="px-4 py-3 text-slate-300">{log.cost ?? 1}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${log.allowed ? "bg-emerald-400/15 text-emerald-200" : "bg-rose-400/15 text-rose-200"}`}>
                          {log.allowed ? "Allowed" : "Blocked"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {lastUpdated && (
            <p className="px-4 py-3 text-xs text-slate-500">
              Last updated {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}

export default Dashboard;
