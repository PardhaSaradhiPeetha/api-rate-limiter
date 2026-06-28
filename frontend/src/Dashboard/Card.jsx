function Card({ title, value, tone = "blue" }) {
  const toneClasses = {
    blue: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    green: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    red: "border-rose-400/20 bg-rose-500/10 text-rose-200",
    purple: "border-violet-400/20 bg-violet-500/10 text-violet-200"
  };

  return (
    <div className={`rounded-lg border p-4 ${toneClasses[tone]}`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="mt-2 text-2xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

export default Card;
