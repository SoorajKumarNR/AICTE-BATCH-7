document.getElementById("generateBtn").addEventListener("click", async function () {
    const apiKey = document.getElementById("apiKey").value;

    // Show loading
    document.getElementById("loading").classList.add("active");
    this.disabled = true;

    // Correct Prompt logic
    const resumeType = document.getElementById("resumeType").value;
    const prompt = `Generate a professional ${resumeType} resume in HTML...`;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
            {
                method: "POST",
                headers: {
                    "x-goog-api-key": apiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "API Error");
        }

        const data = await response.json();
        const resumeHTML = data.candidates[0].content.parts[0].text;
        
        // Remove markdown and display
        let cleanHTML = resumeHTML.replace(/```html\n?/g, "").replace(/```\n?/g, "");
        document.getElementById("resumePreview").innerHTML = cleanHTML;

    } catch (error) {
        alert("Error generating resume: " + error.message);
    } finally {
        document.getElementById("loading").classList.remove("active");
        this.disabled = false;
    }
});