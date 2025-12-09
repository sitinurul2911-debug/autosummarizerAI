import { useState } from "react";
import { analyzeReviews } from "../api";

export default function SummarizerPage() {
  const [reviews, setReviews] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const arr = reviews.split("\n").filter(r => r.trim() !== "");
    if (arr.length === 0) {
      alert("Masukkan setidaknya 1 review");
      return;
    }

    setLoading(true);
    try {
      const data = await analyzeReviews(arr);
      setResult(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Auto Summarizer</h1>
      <textarea
        className="w-full h-48 p-3 border rounded-lg"
        value={reviews}
        onChange={e => setReviews(e.target.value)}
        placeholder="Tulis review (1 per baris)"
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {loading ? "Processing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold">Summary</h2>
          <p>{result.overall_summary}</p>

          <h3 className="mt-4 font-semibold">Key Insights</h3>
          <ul className="list-disc ml-5">
            {result.key_insights.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold">Sentiment</h3>
          <p>{result.sentiment} — rating: {result.rating}</p>
        </div>
      )}
    </div>
  );
}

