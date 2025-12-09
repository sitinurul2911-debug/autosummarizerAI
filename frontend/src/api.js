const API_BASE = "https://ji2911-autosummarizer.hf.space";

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

  const data = await resp.json();
  return data;
}
