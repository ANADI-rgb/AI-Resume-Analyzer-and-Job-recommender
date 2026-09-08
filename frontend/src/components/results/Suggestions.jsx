export default function Suggestions({ suggestions = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">
      <h2 className="text-2xl font-bold mb-6">
        AI Suggestions
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-green-400">
          Excellent Resume! No improvements detected.
        </p>
      ) : (
        <ul className="space-y-3">
          {suggestions.map((item, index) => (
            <li key={index}>
              ✅ {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}