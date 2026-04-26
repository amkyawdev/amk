# A-I - Burmese AI Assistant

A modern mobile-first AI assistant application built with React + Vite, featuring Burmese language support, streaming responses, and a beautiful dark theme.

![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff?style=flat&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

## 🎯 Features

- **💬 Interactive Chat** - Real-time streaming AI responses
- **🔊 Voice Input** - Speech-to-text using Web Speech API
- **📖 Text-to-Speech** - Read AI responses aloud
- **📝 Markdown Support** - Code blocks, formatting, and more
- **📱 PWA Ready** - Install as native app on any device
- **🎨 Beautiful UI** - Dark theme with gold accents
- **🔒 Daily Limits** - Token and speech usage tracking
- **💾 Local Storage** - Chat history saved locally

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router 6** - Navigation
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **React Markdown** - Markdown rendering

### Backend
- **FastAPI** - Python web framework
- **Groq API** - AI inference (mixtral-8x7b)
- **Hugging Face Spaces** - Deployment

## 📁 Project Structure

```
amk/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimationSystem.jsx    # Animations
│   │   │   ├── ButtonEffects.jsx      # Button styles
│   │   │   ├── MarkdownRenderer.jsx    # Markdown display
│   │   │   └── StreamingText.jsx      # Streaming text
│   │   ├── pages/
│   │   │   ├── GetStarted.jsx          # Landing page
│   │   │   ├── LoginPage.jsx          # Login
│   │   │   ├── RegisterPage.jsx       # Registration
│   │   │   ├── ResetPage.jsx           # Password reset
│   │   │   ├── MainPage.jsx           # Main container
│   │   │   ├── ChatPage.jsx           # Chat interface
│   │   │   ├── ApiPage.jsx            # API docs
│   │   │   ├── DocsPage.jsx           # Usage guide
│   │   │   └── AboutPage.jsx          # About
│   │   ├── dialogs/
│   │   │   ├── UserInfoDialog.jsx     # User profile
│   │   │   └── StoragePermissionDialog.jsx
│   │   ├── hooks/
│   │   │   ├── useSpeechLimit.js      # Speech limit hook
│   │   │   └── useTokenLimit.js       # Token limit hook
│   │   ├── utils/
│   │   │   ├── groqAPI.js              # Groq API client
│   │   │   └── localStorage.js        # Local storage
│   │   ├── App.jsx                    # Main app
│   │   └── main.jsx                   # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
├── backend/
│   ├── app.py                         # FastAPI app
│   ├── requirements.txt
│   ├── Dockerfile
│   └── models/
│       └── chat_history.py
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+ (for backend)
- npm or yarn

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/amkyawdev/amk.git
cd amk

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your GROQ API key

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup (Optional - for local development)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app:app --reload --port 7860
```

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/get-started` | Welcome page with start button |
| `/login` | User login |
| `/register` | User registration |
| `/reset` | Password reset |
| `/main` | Main container (protected) |
| `/main/chat` | Chat interface |
| `/main/api` | API documentation |
| `/main/docs` | Usage guide |
| `/main/about` | About page |

## 🎨 Design System

### Colors
- **Primary Gold**: #FFD700
- **Primary Dark**: #DAA520
- **Background**: #1a1a1a
- **Card Background**: #242424
- **Text White**: #ffffff
- **Text Gray**: #b0b0b0
- **Error Red**: #ff4444
- **Success Green**: #00c853

### Typography
- **Font Family**: Inter, system-ui
- **Heading**: 24px, Gold
- **Body**: 16px, White
- **Small**: 12px, Gray

### Spacing
- **Mobile max-width**: 428px
- **Padding**: 16px
- **Gap**: 12px
- **Border Radius**: 12px (cards), 24px (buttons)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/chat` | Send chat message |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/user/{id}` | Get user profile |
| GET | `/api/user/{id}/limits` | Get daily limits |
| GET | `/api/chat/history/{id}` | Get chat history |
| DELETE | `/api/chat/history/{id}` | Clear history |

## 🚀 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Add environment variable: `VITE_GROQ_API_KEY`
4. Deploy

### Backend (Hugging Face Spaces)

1. Create new Space (Docker)
2. Upload backend files
3. Add secret: `GROQ_API_KEY`
4. Build and Deploy

## 📦 Daily Limits

- **Token Limit**: 20 per day
- **Speech Limit**: 20 seconds per day
- Limits reset daily at midnight

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**AmkyawDev**
- GitHub: [@amkyawdev](https://github.com/amkyawdev)
- Email: hello@amkyawdev.ai

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The library for web and native user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- [Groq](https://console.groq.com/) - Fast AI inference
- [Hugging Face](https://huggingface.co/) - ML infrastructure

---

Star us on GitHub if you find this project useful! ⭐
