import { useState } from "react";
import { analyzeReviews } from "../api";

export default function SummarizerPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        setLoading(true);
        setResult(null);

        try {
            const reviews = input.split("\n").filter(r => r.trim() !== "");
            const data = await analyzeReviews(reviews);
            setResult(data);
        } catch (err) {
            alert("Error: " + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Review Summarizer</h1>

            <textarea
                className="w-full border p-3 rounded-lg"
                rows={8}
                placeholder="Masukkan review, satu per baris..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                {loading ? "Processing..." : "Analyze"}
            </button>

            {result && (
                <div className="mt-8 bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <p>{result.overall_summary}</p>

                    <h2 className="text-xl font-bold mt-4">Key Insights</h2>
                    <ul className="list-disc ml-5">
                        {result.key_insights.map((k, i) => (
                            <li key={i}>{k}</li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-bold mt-4">Sentiment</h2>
                    <p>{result.sentiment} ({result.rating}/5)</p>
                </div>
            )}
        </div>
    );
}

