import { GoogleGenAI } from '@google/genai';
import { Prompt } from '../models/prompt.model.js';

export async function generateNames(
    keywords: string[],
    style: string,
    creativity: "conservative" | "balanced" | "creative",
    brandInfo = '') {

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const customPrompt = await Prompt.findOne({
        style
    })

    const creativityInstruction = creativity === 'creative'
        ? 'High (Be highly creative, less direct, and use abstract concepts).'
        : creativity == "balanced" ?
            'Medium (Maintain some relevance to the provided keywords but be creative and can use abstract concepts).' :
            'Low (Stick strictly to the provided keywords and maintain close relevance).'

    const prompt = `
        Generate 10 unique business names based on the following criteria and description.

        **CRITERIA:**
        1. Keywords: ${keywords}
        2. Name Style: ${style}
        3. Randomness/Creativity Level: ${creativityInstruction}
        4. Brand Information: ${brandInfo}

        **DESCRIPTION:**
        ${customPrompt ? customPrompt.description : "stick to the mentioned criteria"}

        **RESPONSE FORMAT INSTRUCTION:**
        Respond strictly with a JSON object. This JSON object MUST have a single key: 'names'. The value of 'names' must be a JSON array of the suggested business names (strings). DO NOT include any text, explanations, or markdown outside of the JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Use a fast and capable model
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        names: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "An array of 10 suggested business names.",
                        },
                    },
                    required: ["names"],
                },
            },
        }) as { text: string }

        // The SDK returns the structured object directly when using responseSchema
        // The .text contains the raw JSON string
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate names from the AI model.");
    }
}