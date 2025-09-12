import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Reuse the same model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate text from Gemini given a prompt.
 * Handles all errors in one place.
 */
export async function geminiGenerate(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    throw new Error("Gemini API request failed");
  }
}
