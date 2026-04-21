import { useState } from "react";

export default function Profile() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Default Key", key: "sk_test_123456", active: true },
    { id: 2, name: "Mobile App", key: "sk_test_abcdef", active: false }
  ]);

  const [newKey, setNewKey] = useState("");

  const generateApiKey = () => {
    const key = "sk_" + Math.random().toString(36).substring(2, 14);

    setNewKey(key);

    setApiKeys([
      ...apiKeys,
      {
        id: Date.now(),
        name: "New Key",
        key,
        active: true
      }
    ]);
  };

  const toggleKey = (id) => {
    setApiKeys(apiKeys.map(k =>
      k.id === id ? { ...k, active: !k.active } : k
    ));
  };

  const deleteKey = (id) => {
    if (!confirm("Delete this API key?")) return;
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">Developer Profile</h1>

      {/* USER INFO */}
      <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h2 className="text-xl font-semibold mb-2">Account Info</h2>
        <p className="text-gray-400">Name: John Doe</p>
        <p className="text-gray-400">Email: john@example.com</p>
      </div>

      {/* GENERATE KEY */}
      <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Generate API Key</h2>

        <button
          onClick={generateApiKey}
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition"
        >
          Generate API Key
        </button>

        {newKey && (
          <div className="mt-5 bg-black/60 border border-white/10 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Copy your API key now (it won’t be shown again)
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
                  {key.key}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleKey(key.id)}
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
        </div>
      </div>

    </div>
  );
}