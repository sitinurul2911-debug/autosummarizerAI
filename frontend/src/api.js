const API_BASE = "https://ji2911-autosummarizer.hf.space";

// Fungsi untuk single text summarization (untuk endpoint /summarize)
export async function summarizeText(text) {
  const resp = await fetch(`${API_BASE}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!resp.ok) {
    throw new Error("API request failed");
  }

  return await resp.json();
}

// Fungsi untuk multiple reviews (untuk endpoint /api/analyze) - optional
export async function analyzeReviews(reviews) {
  const resp = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviews }),
  });

  if (!resp.ok) {
    throw new Error("API request failed");
  }

  return await resp.json();
}
