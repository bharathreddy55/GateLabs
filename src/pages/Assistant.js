import { db, SUBJECT_SYLLABUS } from '../config/firebase';
import { showToast } from '../utils/toast';

export const Assistant = {
  messages: [
    {
      role: 'model',
      text: "Hello Bharath! I am your GATE CS AI Tutor. Ask me any question on Data Structures, Operating Systems, Computer Networks, Linear Algebra, or GATE preparation strategy!"
    }
  ],

  render() {
    const defaultTopics = [
      'Master Theorem in Algorithms',
      'Virtual Memory & Page Tables',
      'TCP 3-Way Handshake',
      'Eigenvalues & Eigenvectors',
      'B-Trees & B+ Trees'
    ];

    return `
      <div class="h-[calc(100vh-6.5rem)] flex flex-col gap-4 animate-fade-in font-sans">
        
        <!-- Header -->
        <div class="glass-panel p-5 rounded-3xl flex items-center justify-between border border-black/[0.05] dark:border-white/[0.08]">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-2xl bg-[#0071e3] dark:bg-[#2997ff] text-white flex items-center justify-center text-lg shadow-md">
              <i class="fa-solid fa-robot"></i>
            </div>
            <div>
              <h3 class="font-display font-extrabold text-base text-slate-900 dark:text-white">AI Study Assistant</h3>
              <p class="text-xs text-slate-400 dark:text-[#86868b] font-medium">Powered by Google Gemini 1.5 Flash</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-generate-qs" class="hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white shadow-md hover:scale-102 active:scale-95 transition-all">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Generate GATE Questions
            </button>
          </div>
        </div>

        <!-- Quick Topics Bar -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span class="text-xs font-bold text-slate-400 dark:text-[#86868b] flex-shrink-0 px-2">Quick Prompts:</span>
          ${defaultTopics.map(t => `
            <button class="quick-topic-btn flex-shrink-0 px-4 py-2 text-xs font-bold rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#161618]/60 hover:bg-[#0071e3] hover:text-white dark:hover:bg-[#2997ff] dark:hover:text-white transition-all text-slate-600 dark:text-[#86868b]" data-topic="${t}">
              ${t}
            </button>
          `).join('')}
        </div>

        <!-- Chat Container -->
        <div id="chat-messages-container" class="flex-1 glass-panel p-6 rounded-3xl overflow-y-auto flex flex-col gap-4 border border-black/[0.05] dark:border-white/[0.08]">
          ${this.messages.map(m => this.renderMessageBubble(m)).join('')}
        </div>

        <!-- Input Bar -->
        <form id="assistant-form" class="glass-panel p-2 rounded-full flex items-center gap-2 border border-black/[0.05] dark:border-white/[0.08]">
          <input type="text" id="assistant-input" placeholder="Ask a GATE CS question or formula breakdown..." class="glass-input flex-1 border-0 bg-transparent focus:ring-0 text-xs px-4">
          <button type="submit" class="px-6 py-3 rounded-full bg-[#0071e3] dark:bg-[#2997ff] text-white font-bold text-xs shadow-md active:scale-95 hover:scale-102 transition-all">
            Send
          </button>
        </form>
      </div>
    `;
  },

  renderMessageBubble(msg) {
    const isUser = msg.role === 'user';
    if (isUser) {
      return `
        <div class="flex justify-end items-end gap-2">
          <div class="max-w-[80%] bg-[#0071e3] dark:bg-[#2997ff] text-white px-5 py-3 rounded-3xl rounded-br-none text-xs font-medium leading-relaxed shadow-sm whitespace-pre-line">
            ${msg.text}
          </div>
        </div>
      `;
    }
    return `
      <div class="flex justify-start items-start gap-3">
        <div class="h-8 w-8 rounded-xl bg-[#0071e3]/10 dark:bg-[#2997ff]/15 text-[#0071e3] dark:text-[#2997ff] flex items-center justify-center text-xs flex-shrink-0 mt-1 font-bold">
          <i class="fa-solid fa-robot"></i>
        </div>
        <div class="max-w-[85%] glass-card p-5 rounded-3xl rounded-tl-none border border-black/[0.04] dark:border-white/[0.06] bg-white/70 dark:bg-[#1c1c1e]/70 text-slate-800 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-line font-medium shadow-sm">
          ${msg.text}
        </div>
      </div>
    `;
  },

  init() {
    const form = document.getElementById('assistant-form');
    const input = document.getElementById('assistant-input');
    const container = document.getElementById('chat-messages-container');

    const scrollToBottom = () => {
      if (container) container.scrollTop = container.scrollHeight;
    };
    scrollToBottom();

    const quickBtns = document.querySelectorAll('.quick-topic-btn');
    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topic = btn.getAttribute('data-topic');
        if (input) {
          input.value = `Explain ${topic} with a GATE solved example.`;
          form?.dispatchEvent(new Event('submit'));
        }
      });
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      this.messages.push({ role: 'user', text });
      input.value = '';
      if (container) {
        container.innerHTML = this.messages.map(m => this.renderMessageBubble(m)).join('');
        scrollToBottom();
      }

      // Add typing indicator
      const typingMsg = { role: 'model', text: 'Thinking...' };
      this.messages.push(typingMsg);
      if (container) {
        container.innerHTML = this.messages.map(m => this.renderMessageBubble(m)).join('');
        scrollToBottom();
      }

      try {
        const apiKey = localStorage.getItem('gemini_api_key');
        let responseText = '';

        if (apiKey) {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `You are an expert GATE Computer Science tutor. Answer the user's query clearly with formulas and step-by-step logic:\n${text}` }]
              }]
            })
          });

          if (res.ok) {
            const data = await res.json();
            responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text received.";
          } else {
            const errData = await res.json().catch(() => ({}));
            responseText = `Gemini API error: ${errData.error?.message || res.statusText}`;
          }
        } else {
          responseText = `Here is the explanation for your query:\n\n1. Concept Definition: In GATE Computer Science, this concept evaluates runtime complexity and memory hierarchy boundaries.\n\n2. Key Formula: \\( T(n) = a T(n/b) + f(n) \\)\n\n3. Solved Strategy: Break down state transitions and analyze worst-case constraints.\n\n(Tip: Add your Gemini API key in AI Configuration for full real-time AI responses!)`;
        }

        this.messages.pop(); // Remove typing indicator
        this.messages.push({ role: 'model', text: responseText });
      } catch (err) {
        this.messages.pop();
        this.messages.push({ role: 'model', text: `Sorry, I encountered an error: ${err.message}` });
      }

      if (container) {
        container.innerHTML = this.messages.map(m => this.renderMessageBubble(m)).join('');
        scrollToBottom();
      }
    });
  }
};
