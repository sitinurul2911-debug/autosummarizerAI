import { useState } from "react";
import { summarizeText } from "../api";

export default function SummarizerPage() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        setLoading(true);
        setResult("‎"); 

        const summary = await summarizeText(input);

        if (summary) setResult(summary);
        else setResult("Error: gagal mengambil ringkasan.");

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-4">Auto Summarizer</h1>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Masukkan teks di sini..."
                className="w-full h-40 p-4 border rounded-lg"
            />

            <button
                onClick={handleSummarize}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                {loading ? "Memproses..." : "Ringkas"}
            </button>

            {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Hasil ringkasan:</h2>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}
