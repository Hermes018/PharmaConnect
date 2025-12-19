export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, dataContext } = req.body;

        const prompt = `You are an AI assistant for PharmaConnect, a pharmaceutical sales management system in Bangladesh. 
        
Here is the current data context:
${JSON.stringify(dataContext, null, 2)}

User question: ${message}

Please provide a concise, helpful answer based on the data. Use Bengali Taka (৳) for currency. Keep response under 150 words.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that request.';

        return res.status(200).json({ response: aiResponse });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
