import { useState } from "react";
import { analyzeReviews } from "./api";

function App() {
  const [reviews, setReviews] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleAnalyze() {
    const reviewList = reviews
      .split("\n")
      .map(r => r.trim())
      .filter(r => r !== "");

    if (reviewList.length === 0) {
      alert("Masukkan minimal 1 review!");
      return;
    }

    setLoading(true);
    const data = await analyzeReviews(reviewList);
    setLoading(false);
    setResult(data);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Auto Summarizer AI</h1>

      <textarea
        placeholder="Tulis review, pisahkan dengan ENTER..."
        value={reviews}
        onChange={(e) => setReviews(e.target.value)}
        style={{ width: "100%", height: "180px", padding: "12px" }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: "16px", padding: "12px 18px" }}
      >
        {loading ? "Memproses..." : "Analyze Reviews"}
      </button>

      {result && (
        <div style={{ marginTop: "40px" }}>
          <h2>📌 Summary</h2>
          <p>{result.overall_summary}</p>

          <h2>🔑 Key Insights</h2>
          <ul>
            {result.key_insights?.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>

          <h2>📊 Sentiment</h2>
          <p>{result.sentiment}</p>

          <h2>⭐ Rating (0–5)</h2>
          <p>{result.rating}</p>

          <h2>🧮 Details</h2>
          <pre>{JSON.stringify(result.details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
