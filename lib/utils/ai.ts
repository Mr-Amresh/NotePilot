import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizeText(text: string): Promise<string> {
  try {
    // Configure Gemini API with the API key from environment variable
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001-tuning" });

    // Create the prompt for summarization
    const prompt = `Summarize the following content in approximately 50-100 words:\n\n${text}`;

    // Generate content using the Gemini model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    if (!summary) {
      console.error('Gemini API Error: No summary returned');
      return 'No summary returned.';
    }

    return summary;
  } catch (error: any) {
    console.error('Error summarizing text with Gemini:', error.message || error);
    return 'Unable to generate summary at this time.';
  }
}