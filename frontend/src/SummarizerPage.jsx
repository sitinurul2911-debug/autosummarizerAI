import { useState } from "react";
import { analyzeReviews } from "../api";

const SummarizerPage = () => {
    const [reviews, setReviews] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
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
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-gray-100">
            <div className="max-w-3xl mx-auto">
                
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Review Summarizer
                </h1>

                {/* Input Card */}
                <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
                    <h2 class="text-xl font-semibold mb-3 text-gray-700">
                        Masukkan Review
                    </h2>

                    <textarea
                        className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Pisahkan review dengan ENTER..."
                        value={reviews}
                        onChange={(e) => setReviews(e.target.value)}
                    ></textarea>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full mt-4 py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
                    >
                        {loading ? "Memproses..." : "Analyze Now"}
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="mt-10 space-y-6">
                        
                        {/* Summary Card */}
                        <div className="bg-white p-6 shadow-lg rounded-xl border">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                📌 Summary
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {result.overall_summary}
                            </p>
                        </div>

                        {/* Key Insights */}
                        <div className="bg-white p-6 shadow-lg rounded-xl border">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                🔑 Key Insights
                            </h3>
                            <ul className="list-disc ml-5 text-gray-700 space-y-1">
                                {result.key_insights?.map((k, i) => (
                                    <li key={i}>{k}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Sentiment & Rating */}
                        <div className="grid grid-cols-2 gap-4">
                            
                            <div className="bg-white p-6 shadow-lg rounded-xl border text-center">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    📊 Sentiment
                                </h3>
                                <p className="text-gray-700 text-xl">{result.sentiment}</p>
                            </div>

                            <div className="bg-white p-6 shadow-lg rounded-xl border text-center">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    ⭐ Rating
                                </h3>
                                <p className="text-gray-700 text-xl">{result.rating}</p>
                            </div>

                        </div>

                        {/* Details */}
                        <div className="bg-white p-6 shadow-lg rounded-xl border">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                🧮 Detail Review
                            </h3>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                                {JSON.stringify(result.details, null, 2)}
                            </pre>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default SummarizerPage;
