import { useState } from "react";
import { analyzeReviews } from "../api";

const SummarizerPage = () => {
    const [reviews, setReviews] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        const list = reviews
            .split("\n")
            .map(r => r.trim())
            .filter(r => r.length > 0);

        if (list.length === 0) {
            alert("Masukkan minimal 1 review!");
            return;
        }

        setLoading(true);
        const output = await analyzeReviews(list);
        setLoading(false);
        setResult(output);
    };

    return (
        <div className="px-6 py-10 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Review Summarizer
                </h1>

                {/* Input Card */}
                <div className="bg-white border shadow p-6 rounded-xl">
                    <textarea
                        value={reviews}
                        onChange={(e) => setReviews(e.target.value)}
                        placeholder="Tulis review (pisahkan per baris)..."
                        className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    ></textarea>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Processing..." : "Analyze"}
                    </button>
                </div>

                {result && !result.error && (
                    <div className="mt-10 space-y-6">

                        {/* Summary */}
                        <div className="bg-white border shadow p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-2">📌 Summary</h3>
                            <p>{result.overall_summary}</p>
                        </div>

                        {/* Insights */}
                        <div className="bg-white border shadow p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-2">🔑 Key Insights</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {result.key_insights?.map((i, idx) => (
                                    <li key={idx}>{i}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Sentiment & Rating */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border shadow p-6 rounded-xl">
                                <h3 className="font-bold">Sentiment</h3>
                                <p className="text-lg">{result.sentiment}</p>
                            </div>

                            <div className="bg-white border shadow p-6 rounded-xl">
                                <h3 className="font-bold">Rating</h3>
                                <p className="text-lg">{result.rating}</p>
                            </div>
                        </div>

                    </div>
                )}

                {result?.error && (
                    <div className="mt-6 bg-red-100 border border-red-400 p-4 rounded-lg">
                        Backend Error: {result.message}
                    </div>
                )}

            </div>
        </div>
    );
};

export default SummarizerPage;
