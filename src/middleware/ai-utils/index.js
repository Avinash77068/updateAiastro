const SYSTEM_PROMPTS = require('./prompts');
const { buildUserContext } = require('./helper');
const { callOpenRouter } = require('./openRouterService');

const getAiChatResponse = async (userMessage, chatHistory = [], userDetails = null) => {
    try {
        const userContext = buildUserContext(userDetails);
        const messages = [
            {
                role: "system",
                content: SYSTEM_PROMPTS.astro + userContext
            }
        ];

        if (chatHistory.length > 0) {
            chatHistory.slice(-15).forEach(chat => {
                messages.push({
                    role: chat.sender === 'user' ? 'user' : 'assistant',
                    content: chat.message
                });
            });
        }

        messages.push({
            role: "user",
            content: userMessage
        });

        const aiResponse = await callOpenRouter(messages);

        return aiResponse;
    } catch (error) {
        console.error('OpenRouter API Error:', error.response?.data || error.message);
        return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
};

module.exports = { getAiChatResponse };
