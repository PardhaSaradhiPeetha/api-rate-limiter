import { useState } from "react";

function TrafficGraph() {
  const [graphData] = useState([40, 80, 30, 100, 60, 20, 90]);

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="mb-3 font-medium text-white">Traffic</h2>

      <div className="flex items-end gap-2 h-40">
        {graphData.map((val, i) => (
          <div
            key={i}
            className="w-6 rounded bg-cyan-400/80"
            style={{ height: `${val}px` }}  
          />
        ))}
      </div>
    </div>
  );
}

export default TrafficGraph;