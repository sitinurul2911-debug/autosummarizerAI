export const summarizeText = async (text) => {
    try {
        const response = await fetch("https://ji2911-autosummarizer.hf.space/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();
        return data.summary;
    } catch (err) {
        console.error("Error:", err);
        return null;
    }
};
