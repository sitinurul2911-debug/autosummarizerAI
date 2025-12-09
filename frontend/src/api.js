const API_BASE = "https://ji2911-autosummarizer.hf.space";

export async function analyzeReviews(reviews) {
    const response = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews }),
    });

    if (!response.ok) {
        throw new Error("Failed to analyze reviews");
    }

    return response.json();
}
