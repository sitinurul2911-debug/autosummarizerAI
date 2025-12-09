import axios from "axios";

const API_BASE = "https://ji2911-autosummarizer.hf.space";

export const analyzeReviews = async (reviews) => {
    try {
        const res = await axios.post(`${API_BASE}/api/analyze`, {
            reviews: reviews,
        });

        return res.data;
    } catch (err) {
        console.error("API ERROR:", err);
        return { error: true, message: "Backend unreachable" };
    }
};
