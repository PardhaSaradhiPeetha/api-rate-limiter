export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-white/10">
        <h2 className="text-xl font-bold tracking-wide">RateLimiter</h2>
        <div className="space-x-6 text-sm">
          <a href="/login" className="hover:text-blue-400">Login</a>
          <a href="/signup" className="hover:text-blue-400">Sign Up</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="text-center mt-24 px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight">
          Protect & Control Your API Traffic
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          Rate limit requests in real-time, prevent abuse, and monitor usage —
          all with a simple API.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-28 max-w-6xl mx-auto">
        {[
          {
            title: "Token Bucket Engine",
            desc: "Accurate and efficient rate limiting using token bucket algorithm"
          },
          {
            title: "API Key Control",
            desc: "Manage keys, revoke access, and apply limits per developer"
          },
          {
            title: "Cost-based Requests",
            desc: "Assign custom cost to different endpoints"
          },
          {
            title: "Redis Powered",
            desc: "High-performance in-memory rate limiting"
          },
          {
            title: "Real-time Analytics",
            desc: "Track usage, blocked requests, and traffic spikes"
          },
          {
            title: "Simple Integration",
            desc: "Plug into any backend with a single API call"
          }
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg hover:scale-[1.03] transition"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* DEVELOPER SECTION */}
      <div id="developer" className="mt-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">
          Quick Integration
        </h2>

        <p className="text-gray-400 mt-4 text-center">
          Call our API before processing any request — we’ll tell you whether to allow or block it.
        </p>

        {/* STEPS */}
        <div className="mt-8 space-y-2 text-gray-300 text-center">
          <p>1. Create API key from dashboard</p>
          <p>2. Call rate limiter API</p>
          <p>3. Allow or reject request based on response</p>
        </div>

        {/* CODE */}
        <div className="mt-10 bg-black/60 border border-white/10 p-5 rounded-xl text-sm overflow-x-auto">
<pre>
{`fetch("https://api.yourdomain.com/v1/check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    reqCost: 1
  })
})
.then(res => res.json())
.then(data => {
  if (data.allowed) {
    // process request
  } else {
    // reject or queue
  }
});`}
</pre>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center mt-24 py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} RateLimiter. All rights reserved.
      </footer>

    </div>
  );
}