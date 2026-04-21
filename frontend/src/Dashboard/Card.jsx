function Card({ title, value }) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <h2 className="text-sm text-gray-300">{title}</h2>
      <p className="text-2xl font-semibold mt-1 text-white">
        {value}
      </p>
    </div>
  );
}

export default Card;