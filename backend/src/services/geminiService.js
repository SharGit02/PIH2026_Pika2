import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate AI insights for a product listing.
 *
 * @param {Object} productDetails - { title, description, category, pricePerDay }
 * @returns {Object} - { rentalValueScore, demandEstimate, pricingSuggestion, buyerSummary }
 */
export const generateProductInsights = async (productDetails) => {
    const { title, description, category, pricePerDay } = productDetails;

    console.log('🤖 [Gemini] Triggered AI insights for product:', title);

    const prompt = `
You are a rental marketplace AI analyst. Analyze the following rental product and return a JSON object with insights.

Product Details:
- Title: ${title}
- Description: ${description}
- Category: ${category}
- Price Per Day: ₹${pricePerDay}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "rentalValueScore": <number between 1-10>,
  "demandEstimate": "<Low | Medium | High>",
  "pricingSuggestion": "<brief pricing advice in 1 sentence>",
  "buyerSummary": "<2-3 sentence summary written for a potential renter>"
}
`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        console.log('🤖 [Gemini] Sending request to Gemini API...');
        const result = await model.generateContent(prompt);
        const rawText = result.response.text();

        console.log('🤖 [Gemini] Raw response received:', rawText);

        // Strip possible markdown code fences
        const cleaned = rawText.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        console.log('✅ [Gemini] Parsed insights:', parsed);
        return parsed;
    } catch (error) {
        console.error('❌ [Gemini] Error generating insights:', error.message);
        // Return safe defaults so product creation doesn't fail
        return {
            rentalValueScore: null,
            demandEstimate: 'Unknown',
            pricingSuggestion: 'AI insights unavailable at this time.',
            buyerSummary: 'AI-generated summary unavailable.',
        };
    }
};
