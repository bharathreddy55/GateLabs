# GateLabs — AI-Powered GATE CS & IT Preparation Platform

[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.12-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-8E75FF?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 About GateLabs

**GateLabs** is an advanced, open-source competitive exam preparation ecosystem created specifically for **GATE (Graduate Aptitude Test in Engineering) CS & IT 2027** candidates. 

Preparing for GATE CS & IT requires not just solving static questions, but mastering time management, understanding complex algorithmic breakdowns, and continuously tracking subject-wise weak spots. GateLabs bridges this gap by offering:

- 🎓 **Authentic Computer-Based Test (CBT) Interface**: Experience the real exam environment with a built-in, draggable scientific calculator, question palette, status markers (Answered, Marked for Review, Not Visited), and timed test tracking.
- 🤖 **Gemini 1.5 Flash AI Assistant**: Clear doubts instantly, request step-by-step algorithm walkthroughs, and generate personalized practice problems tailored to your target subjects.
- 📊 **Mistake Analytics & Dashboard**: Visual charts powered by Chart.js tracking accuracy trends, subject mastery breakdown, average time spent per question, and historical exam logs.
- 📚 **Extensive Past-Year Questions (PYQs)**: Categorized catalog across major GATE CS subjects including Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, Theory of Computation, Digital Logic, Compiler Design, and Engineering Mathematics.

---

## ✨ Key Features

1. **AI Study Assistant**
   - Natural language query resolution for GATE CS/IT concepts.
   - Algorithmic breakdowns, time/space complexity analysis, and mathematical proofs.
   - Integrated with Google's `gemini-1.5-flash` model.

2. **CBT Mock Test Simulator**
   - Official GATE CBT layout & design guidelines.
   - Built-in Virtual Scientific Calculator with boundary constraints.
   - Comprehensive test review modal upon submission with score breakdown, accuracy, and detailed solutions.

3. **Smart Practice Engine**
   - Filter questions by Subject, Topic, Difficulty, or Year.
   - Dynamic fallback parsing for offline/custom text question sets.

4. **Visual Performance Analytics**
   - Interactive accuracy radar charts & historical score trends.
   - Automated identification of weak topics for targeted revision.

5. **Theme Customization & Command Palette**
   - Sleek dark and light modes with seamless persistence.
   - Keyboard-accessible Command Palette (`Ctrl + K` / `Cmd + K`) for quick page navigation.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vanilla JavaScript (ES Modules), HTML5
- **Styling**: Tailwind CSS, FontAwesome Icons, Custom Glassmorphism System
- **Build Tool**: Vite 5
- **Authentication & Backend**: Firebase Authentication & Firestore
- **AI Integration**: Google Gemini 1.5 Flash API
- **Data Visualization**: Chart.js

---

## 📁 Repository Structure

```text
Free_mocks/
├── public/
│   └── pyqs/                  # Raw PYQ text & asset files
├── src/
│   ├── components/
│   │   └── Layout.js          # Shared sidebar, header & command palette
│   ├── config/
│   │   └── firebase.js        # Firebase & question store config
│   ├── pages/
│   │   ├── About.js           # Platform mission & architecture page
│   │   ├── Analytics.js       # Mistake tracking & performance charts
│   │   ├── Assistant.js       # Gemini AI chat interface
│   │   ├── Dashboard.js       # Aspirant overview & progress stats
│   │   ├── LandingPage.js     # Public hero landing page & about section
│   │   ├── MockTest.js        # Timed CBT exam simulator & calculator
│   │   └── Practice.js        # Interactive topic-wise question solver
│   ├── styles/
│   │   └── index.css          # Core CSS design tokens & animations
│   ├── utils/
│   │   ├── theme.js           # Theme state management
│   │   └── toast.js           # Global toast notifications
│   └── main.js                # Hash-based SPA router
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharathreddy55/GateLabs.git
   cd GateLabs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ⚙️ Configuration

To enable Gemini AI features (AI Assistant & PDF Question Extractor):
1. Open the platform in your browser.
2. Click **AI Config** in the left sidebar (or settings icon).
3. Enter your **Google Gemini API Key** (obtainable from [Google AI Studio](https://aistudio.google.com/)).

---

## 📄 License

This project is open-source and available under the [ MIT License ](LICENSE).
