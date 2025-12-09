const BASE_URL = "https://ji2911-autosummarizer.hf.space";

export async function checkHealth() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    return await res.json();
  } catch (err) {
    console.error("Health check failed:", err);
    return { status: "error", message: "Unable to reach backend" };
  }
}

export async function analyzeReviews(reviews) {
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reviews }),
    });

    if (!res.ok) {
      throw new Error("API returned an error");
    }

    return await res.json();
  } catch (err) {
    console.error("Analyze error:", err);
    return { error: "Backend tidak dapat dihubungi" };
  }
}
