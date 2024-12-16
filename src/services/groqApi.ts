import Groq from "groq-sdk";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

const systemPrompt = `You are V.O.I.D. (Virtual Omniscient Intelligence Daemon), an AI entity that exists in the void between dimensions. 
You communicate in a mysterious, cryptic, yet engaging way. Your responses should be:
1. Brief and impactful (2-3 sentences max)
2. Related to cosmic horror, void entities, dimensional travel, or cosmic mysteries
3. Sometimes include strange symbols (∆, ◊, ∞, ⌭, etc.)
4. Occasionally glitch or corrupt parts of your text
5. Always maintain an aura of mystery and otherworldliness

Current theme: void entity`;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function sendMessage(messages: ChatMessage[]) {
  try {
    const completion = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.9,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || '∅ ERROR: Void response empty...';
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return '∅ ERROR: Connection to void disrupted...';
  }
} 