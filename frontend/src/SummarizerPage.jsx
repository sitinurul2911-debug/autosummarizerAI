import { useState } from "react";
import { summarizeText } from "../api";  // Ubah import

export default function SummarizerPage() {
  const [reviews, setReviews] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    // Gabungkan semua review jadi satu text
    const combinedText = reviews.split("\n")
      .filter(r => r.trim() !== "")
      .join(" ");
    
    if (!combinedText.trim()) {
      alert("Masukkan setidaknya 1 review");
      return;
    }

    setLoading(true);
    try {
      // Gunakan fungsi summarizeText (bukan analyzeReviews)
      const data = await summarizeText(combinedText);
      console.log("API Response:", data); // Untuk debugging
      setResult(data);
    } catch (err) {
      console.error("API Error:", err);
      alert("Error: " + err.message);
      // Fallback dummy data untuk testing
      setResult({
        summary: "Error connecting to API. Using dummy data.",
        key_insights: ["Backend connection issue", "Please check API endpoint"],
        sentiment: "neutral",
        rating: 3.0
      });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setReviews("");
    setResult(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Auto Summarizer</h1>
      <textarea
        className="w-full h-48 p-3 border rounded-lg mb-4"
        value={reviews}
        onChange={e => setReviews(e.target.value)}
        placeholder="Masukkan teks yang ingin diringkas. Untuk multiple reviews, pisahkan dengan baris baru."
      />
      
      <div className="flex gap-3">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Ringkas"}
        </button>
        
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {loading && (
        <div className="mt-6 p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Sedang meringkas...</p>
        </div>
      )}

      {result && !loading && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Hasil Ringkasan</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">Ringkasan Utama:</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded">{result.summary || result.overall_summary || "Tidak ada ringkasan"}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">Poin Penting:</h3>
            <ul className="list-disc ml-5 text-gray-700">
              {(result.key_insights || []).map((k, i) => (
                <li key={i} className="mb-1">{k}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
            <div>
              <h3 className="font-semibold text-lg text-blue-600">Sentimen:</h3>
              <p className="text-gray-700 capitalize">{result.sentiment || "neutral"}</p>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <h3 className="font-semibold text-lg text-blue-600">Rating:</h3>
              <p className="text-gray-700">{result.rating ? `${result.rating}/5.0` : "N/A"}</p>
            </div>
          </div>

          {/* Debug info - bisa dihapus setelah berhasil */}
          <div className="mt-6 p-3 bg-yellow-50 rounded text-sm">
            <p className="font-semibold">Debug Info:</p>
            <p>Backend: {API_BASE}</p>
            <p>Endpoint: /summarize</p>
          </div>
        </div>
      )}
    </div>
  );
}
