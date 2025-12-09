import axios from "axios";

const API_URL = "https://ji2911-autosummarizer.hf.space/api";

export const analyzeReviews = async (reviews) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, { reviews });
        return response.data;
    } catch (error) {
        console.error("API error:", error);
        return { error: "Gagal menghubungi backend" };
    }
};
