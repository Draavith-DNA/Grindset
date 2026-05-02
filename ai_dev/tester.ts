import readline from 'readline';
import { SYSTEM_PROMPTS } from './prompts';

// TODO: Replace with the actual SDK you want to test (e.g., @google/generative-ai, groq-sdk, openai)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chatHistory: { role: string; content: string }[] = [
  { role: 'system', content: SYSTEM_PROMPTS.GRINDSET_COACH_BASE }
];

console.log("==================================================");
console.log("🦾 GRINDSET AI COACH - LOCAL DEV ENVIRONMENT 🦾");
console.log("==================================================");
console.log("The AI's system prompt has been loaded. Start chatting to test its voice.");
console.log("Type 'exit' or 'quit' to stop.\n");

function ask() {
  rl.question('You: ', async (userInput) => {
    if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
      console.log('Exiting dev environment.');
      rl.close();
      return;
    }

    chatHistory.push({ role: 'user', content: userInput });

    // ====================================================================
    // 🚧 TODO: IMPLEMENT API CALL HERE 🚧
    // E.g., const response = await openai.chat.completions.create({...})
    // ====================================================================

    console.log('\n[Simulated API Call using SYSTEM_PROMPTS.GRINDSET_COACH_BASE]');
    
    // Placeholder response until the API is hooked up
    const mockResponse = `STOP WHINING. "${userInput}" IS NOT AN EXCUSE. DROP DOWN AND GIVE ME 50. NOW!`;

    console.log(`\nGrindset Coach: ${mockResponse}\n`);

    chatHistory.push({ role: 'assistant', content: mockResponse });

    ask();
  });
}

ask();
