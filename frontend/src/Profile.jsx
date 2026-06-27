import { useEffect, useState } from "react";
import { apiFetch } from "./utils/api.js";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [keyName, setKeyName] = useState("");
  const [newKey, setNewKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const [profileData, keysData] = await Promise.all([
        apiFetch("/api/auth/profile"),
        apiFetch("/api/developer/api-keys")
      ]);

      setUser(profileData);
      setApiKeys(keysData);
    } catch (err) {
      setError(err.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const generateApiKey = async () => {
    setSaving(true);
    setError("");

    try {
      const data = await apiFetch("/api/developer/generate-api-key", {
        method: "POST",
        body: JSON.stringify({ name: keyName })
      });

      setNewKey(data.apiKey);
      setKeyName("");
      setApiKeys((keys) => [...keys, data.key]);
    } catch (err) {
      setError(err.message || "Unable to generate key");
    } finally {
      setSaving(false);
    }
  };

  const toggleKey = async (key) => {
    setError("");

    try {
      const updatedKey = await apiFetch(`/api/developer/api-keys/${key.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !key.active })
      });

      setApiKeys((keys) => keys.map((item) => item.id === key.id ? updatedKey : item));
    } catch (err) {
      setError(err.message || "Unable to update key");
    }
  };

  const deleteKey = async (id) => {
    if (!confirm("Delete this API key?")) return;

    setError("");

    try {
      await apiFetch(`/api/developer/api-keys/${id}`, {
        method: "DELETE"
      });

      setApiKeys((keys) => keys.filter((key) => key.id !== id));
    } catch (err) {
      setError(err.message || "Unable to delete key");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">Developer Profile</h1>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {/* USER INFO */}
      <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h2 className="text-xl font-semibold mb-2">Account Info</h2>
        <p className="text-gray-400">Name: {loading ? "Loading..." : user?.name}</p>
        <p className="text-gray-400">Email: {loading ? "Loading..." : user?.email}</p>
      </div>

      {/* GENERATE KEY */}
      <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Generate API Key</h2>

        <input
          type="text"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Key name"
          className="mb-4 w-full max-w-md rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
        />

        <button
          onClick={generateApiKey}
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition"
        >
          {saving ? "Generating..." : "Generate API Key"}
        </button>

        {newKey && (
          <div className="mt-5 bg-black/60 border border-white/10 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Copy your API key now (it won't be shown again)
            </p>
            <div className="flex justify-between items-center mt-2">
              <p className="font-mono break-all text-sm">{newKey}</p>
              <button
                onClick={() => navigator.clipboard.writeText(newKey)}
                className="text-xs bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* API KEYS LIST */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-6">Your API Keys</h2>

        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5"
            >
              <div>
                <p className="font-semibold">{key.name}</p>
                <p className="text-gray-400 text-sm font-mono">
                  Created {key.createdAt ? new Date(key.createdAt).toLocaleString() : "recently"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleKey(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    key.active
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {key.active ? "Active" : "Deactivated"}
                </button>

                <button
                  onClick={() => deleteKey(key.id)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-gray-700 hover:bg-gray-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {apiKeys.length === 0 && !loading && (
            <p className="text-sm text-gray-400">No API keys yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
