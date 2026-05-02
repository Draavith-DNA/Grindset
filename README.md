# 🦾 Grindset AI Coach

**No excuses. No days off.**

Grindset is a hyper-aggressive, AI-powered fitness application built to push you past your limits. Forget soft, friendly virtual assistants—Grindset delivers brutal motivation, no-nonsense workout plans, and ruthless diet reviews. If you skip leg day or eat trash, the AI *will* roast you.

## 🚀 Features

- **Brutal AI Coach:** A highly opinionated, aggressive AI persona that doesn't accept excuses.
- **Dynamic Workouts:** AI-generated, compound-movement-focused workouts tailored to your goals.
- **Diet Roasts:** Submit your daily meals and get mercilessly judged or aggressively praised.
- **Secure Authentication:** Integrated with Firebase Auth (Email/Password & Google Sign-In).
- **Brutalist UI/UX:** A striking, high-contrast brutalist design system built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** Firebase Auth v9 (Modular SDK)
- **AI Integration:** *[Ready for Groq/Gemini/OpenAI SDKs]*

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/grindset-ai-coach.git
   cd grindset-ai-coach
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Test the AI Persona locally:**
   We have a standalone CLI testing environment for prompt engineering.
   ```bash
   bun run ai_dev/tester.ts
   ```

## 🔐 Environment Variables
To get the Firebase authentication working, make sure you have your Firebase config applied in `src/lib/firebase.ts`.

---
*Pain is temporary. Quitting lasts forever.*
