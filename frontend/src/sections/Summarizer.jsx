import Section from "../components/Section";
import Heading from "../components/Heading";
import { useState } from "react";
import Button from "../components/Button";

// Import API function
import { summarizeText } from "../api"; // Pastikan path benar

const Summarizer = () => {
    const [reviews, setReviews] = useState("");
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSummarize = async () => {
        if (!reviews.trim()) {
            alert("Please enter some reviews first!");
            return;
        }

        setIsLoading(true);
        
        try {
            // Panggil API sebenarnya
            const data = await summarizeText(reviews);
            
            // Map response dari API ke format yang diharapkan component
            setSummary({
                overallSummary: data.summary || data.overall_summary || "No summary available",
                sentiment: data.sentiment || "Neutral",
                overallScore: data.rating ? `${data.rating}/5.0` : "N/A",
                keyInsights: data.key_insights || [
                    "No insights generated",
                    "Please check your input text"
                ]
            });
            
        } catch (error) {
            console.error("API Error:", error);
            alert("Failed to generate summary. Please try again.");
            
            // Fallback dummy hanya jika API error
            setSummary({
                overallSummary: "Error connecting to AI service. Please check your connection.",
                sentiment: "Neutral",
                overallScore: "N/A",
                keyInsights: [
                    "API connection failed",
                    "Check if backend is running",
                    "Try again later"
                ]
            });
        }
        
        setIsLoading(false);
    };

    const handleReset = () => {
        setReviews("");
        setSummary(null);
    };

    return (
        <Section className="py-20 md:py-28" id="summarizer">
            <div className="container relative pb-20">
                {/* Header dengan spacing yang lebih baik */}
                <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-16 md:mb-20">
                    <h1 className="h1 mb-6">
                        <span className="inline-block relative bg-gradient-to-r from-[#AC6AFF] to-[#0EA5E9] bg-clip-text text-transparent">
                            AI-Powered
                        </span>
                        <br />
                        Review Summarizer
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto text-n-2">
                        Paste your reviews below and let our AI extract key insights and sentiment analysis
                    </p>
                </div>

                {/* Input Section */}
                {!summary && (
                    <div className="relative max-w-[62rem] mx-auto mb-20">
                        <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-[#AC6AFF] via-[#0EA5E9] to-[#AC6AFF]">
                            <div className="relative bg-n-8 rounded-3xl p-8">
                                <label className="block text-white font-semibold mb-4 text-lg">
                                    Enter Reviews
                                </label>
                                <textarea
                                    value={reviews}
                                    onChange={(e) => setReviews(e.target.value)}
                                    placeholder="Paste your customer reviews here... (e.g., 'Great product! Fast shipping. Would recommend.' 'Good quality but expensive.')"
                                    className="w-full h-[300px] bg-n-7 border border-n-6 rounded-2xl p-6 text-white placeholder:text-n-4 resize-none focus:outline-none focus:border-color-1 transition-colors"
                                />
                                
                                <div className="flex justify-center mt-8">
                                    <Button onClick={handleSummarize} disabled={isLoading}>
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Analyzing...
                                            </span>
                                        ) : (
                                            "AI SUMMARIZE"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {summary && (
                    <div className="relative max-w-[62rem] mx-auto space-y-6 mb-20">
                        {/* Overall Summary Card */}
                        <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-[#AC6AFF] via-[#0EA5E9] to-[#AC6AFF]">
                            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AC6AFF] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="h5 text-white mb-3">Overall Summary</h3>
                                        <p className="body-2 text-n-3 leading-relaxed">{summary.overallSummary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sentiment & Score Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Sentiment Card */}
                            <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-n-6 to-n-7">
                                <div className="relative bg-n-8 rounded-3xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#88E5BE] to-[#0EA5E9] flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        <p className="body-2 text-n-3">Sentiment</p>
                                    </div>
                                    <p className="text-3xl font-bold text-[#88E5BE] capitalize">{summary.sentiment.toLowerCase()}</p>
                                </div>
                            </div>

                            {/* Overall Score Card */}
                            <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-n-6 to-n-7">
                                <div className="relative bg-n-8 rounded-3xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AC6AFF] to-[#0EA5E9] flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </div>
                                        <p className="body-2 text-n-3">Overall Score</p>
                                    </div>
                                    <p className="text-3xl font-bold text-[#AC6AFF]">{summary.overallScore}</p>
                                </div>
                            </div>
                        </div>

                        {/* Key Insights Card */}
                        <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-n-6 to-n-7">
                            <div className="relative bg-n-8 rounded-3xl p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFC876] to-[#FF6B6B] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h3 className="h5 text-white">Key Insights</h3>
                                </div>
                                <ul className="space-y-3">
                                    {summary.keyInsights.map((insight, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-color-1 mt-2 flex-shrink-0" />
                                            <p className="body-2 text-n-3">{insight}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <div className="flex justify-center mt-8">
                            <Button onClick={handleReset} white>
                                Analyze Another Review
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
};

export default Summarizer;
