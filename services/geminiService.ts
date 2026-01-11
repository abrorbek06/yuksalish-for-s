
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateGrowthInsight(chapterTitle: string, userPreference: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class life coach and philosopher. The user is currently exploring the stage of "${chapterTitle}" in their personal growth journey.
      Style: ${userPreference}. Language: Uzbek.
      Provide a profound, short (max 3 sentences) psychological insight or a practical challenge for the user to help them grow in this area.`,
      config: {
        temperature: 0.9,
        maxOutputTokens: 200,
      }
    });
    // Access the .text property directly, not as a method
    return response.text;
  } catch (error) {
    console.error("Error generating insight:", error);
    return "Har bir qiyinchilik — bu yangi imkoniyat eshigidir.";
  }
}