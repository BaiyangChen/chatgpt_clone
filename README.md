# 🧠 ChatGPT Clone (React + Express + OpenRouter)

A lightweight ChatGPT-style application built with **React** (frontend) and **Express** (backend), powered by **OpenRouter** using the `deepseek-chat-v3` model. Supports real-time conversation, chat history, message bubbles, and avatar switching.

---

## 🚀 Features

- 💬 Interactive chat interface
- 🧠 AI replies using OpenRouter (DeepSeek model)
- 🗂️ Auto-generated conversation titles
- 🕑 Chat history with clickable titles
- 👤 User and assistant avatars
- 🌈 Chat bubble styling with role-based layout
- 🌐 CORS-enabled backend for frontend/backend communication

---

## 🛠️ Tech Stack

| Layer     | Tech                         |
|-----------|------------------------------|
| Frontend  | React 19, React Hooks, MUI Icons, CSS |
| Backend   | Express, Node.js, dotenv, CORS         |
| AI Model  | [OpenRouter](https://openrouter.ai) — `deepseek/deepseek-chat-v3`

---

## 📦 Project Structure

public/
  src/
    App.js               # Main React component
    assets/              # Avatar images
    .env                 # API key for OpenRouter
  server.js            # Express backend
  package.json
  README.md

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BaiyangChen/chatgpt_clone.git
cd react-clone-chatgpt
```
### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the src/ folder ： API_KEY=your_openrouter_api_key
You can get your API key at https://openrouter.ai

### 4. Start the app
Start backend (port 8080):npm run start:backend
Start frontend:npm run start:frontend

---
## API Integration
The backend uses the following API call: 
  	•	POST https://openrouter.ai/api/v1/chat/completions
  	•	Model: deepseek/deepseek-chat-v3
  	•	Request body includes:{
      "messages": [{ "role": "user", "content": "..." }],
      "max_token": 100
    }

---
## Screenshot
<img width="810" alt="Screenshot 2025-07-08 at 4 53 51 PM" src="https://github.com/user-attachments/assets/e882a42e-730a-43df-804b-59f3a38c3298" />

---
**Note**
  The frontend and backend are decoupled. If you deploy separately, update the API URL in App.js accordingly.
  Ensure your .env API key is valid and your network allows access to OpenRouter.

**Author**
  Baiyang Chen

