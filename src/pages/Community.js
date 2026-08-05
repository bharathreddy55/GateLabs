import { db, auth } from '../config/firebase';
import { showToast } from '../utils/toast';

export const Community = {
  posts: [],
  selectedCategory: 'All',
  searchQuery: '',
  activePostId: null, // If set, shows the full thread view for this post
  
  categories: [
    'All',
    'General Strategy',
    'Theory of Computation',
    'Algorithms',
    'Operating Systems',
    'Databases',
    'Computer Networks',
    'Mathematics'
  ],

  async render() {
    this.posts = await db.getCommunityPosts();
    
    // Filter posts
    let filteredPosts = [...this.posts];
    if (this.selectedCategory !== 'All') {
      filteredPosts = filteredPosts.filter(p => p.category === this.selectedCategory);
    }
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.content.toLowerCase().includes(query)
      );
    }

    if (this.activePostId) {
      return this.renderThreadView();
    }

    return this.renderListView(filteredPosts);
  },

  renderListView(filteredPosts) {
    const categoryChips = this.categories.map(cat => {
      const active = this.selectedCategory === cat;
      return `
        <button class="cat-filter-chip flex-shrink-0 px-4 py-1.5 text-xs font-bold rounded-full border transition-all select-none ${
          active 
            ? 'btn-accent text-white border-transparent shadow-md' 
            : 'border-slate-200 dark:border-white/10 text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 dark:text-slate-400'
        }" data-category="${cat}">
          ${cat}
        </button>
      `;
    }).join('');

    const postsHtml = filteredPosts.map(post => {
      const user = auth.currentUser;
      const initial = post.authorInitial || 'A';
      const repliesCount = post.replies ? post.replies.length : 0;
      
      return `
        <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] hover:border-primary-500/20 hover:shadow-lg transition-all duration-200 flex flex-col gap-4 relative group">
          <div class="flex items-start justify-between gap-4">
            <!-- Author initial & category -->
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary-500/15 to-indigo-500/15 text-primary-500 flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                ${initial}
              </div>
              <div>
                <p class="text-[11px] font-extrabold text-slate-900 dark:text-white leading-none">${post.author}</p>
                <p class="text-[9px] text-slate-400 mt-1 font-semibold">${post.authorTitle || 'Aspirant'} &bull; ${this.formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>
            
            <span class="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-slate-100 dark:bg-slate-950/40 border border-slate-200/20 dark:border-white/[0.03] text-slate-505 dark:text-slate-400 uppercase tracking-wider">
              ${post.category}
            </span>
          </div>

          <!-- Post Content -->
          <div class="cursor-pointer view-post-thread" data-id="${post.id}">
            <h4 class="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white hover:text-primary-500 transition-colors leading-tight">
              ${post.title}
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed font-medium">
              ${post.content}
            </p>
          </div>

          <!-- Actions: Upvotes, Comments, Ask AI -->
          <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-3 mt-1">
            <div class="flex items-center gap-4">
              <button class="upvote-post-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-extrabold select-none active:scale-95 ${
                post.upvoted 
                  ? 'bg-primary-500/10 text-primary-500 border-primary-500/30 shadow-sm' 
                  : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
              }" data-id="${post.id}">
                <i class="fa-solid fa-chevron-up"></i>
                <span>${post.upvotes}</span>
              </button>

              <button class="view-post-thread flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-extrabold select-none" data-id="${post.id}">
                <i class="fa-regular fa-comment"></i>
                <span>${repliesCount} Replies</span>
              </button>
            </div>

            <button class="ask-ai-mentor-btn px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-650 text-white text-[10px] font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-1.5 select-none" data-id="${post.id}" data-title="${post.title}" data-content="${post.content}">
              <i class="fa-solid fa-sparkles animate-pulse"></i> Ask AI Mentor
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in pb-12">
        
        <!-- Main Forum Column -->
        <div class="lg:col-span-3 flex flex-col gap-5">
          <!-- Top Control Panel -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <!-- Search bar -->
            <div class="relative flex-1">
              <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input type="text" id="forum-search-input" value="${this.searchQuery}" placeholder="Search doubts, queries, topics..." class="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950/20 border border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-semibold transition-all">
            </div>

            <!-- Action: Ask doubt -->
            <button id="btn-open-doubt-modal" class="px-5 py-2.5 rounded-xl btn-accent text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-1.5 select-none">
              <i class="fa-solid fa-plus text-xs"></i> Post a Doubt
            </button>
          </div>

          <!-- Category Chips Horizontal Feed -->
          <div class="flex gap-2.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
            ${categoryChips}
          </div>

          <!-- Doubts list -->
          <div class="flex flex-col gap-4">
            ${filteredPosts.length === 0 
              ? `<div class="text-center py-16 glass-panel rounded-3xl">
                   <i class="fa-solid fa-comments text-slate-400 text-3xl mb-3 block"></i>
                   <p class="text-xs text-slate-500 font-bold">No discussions found matching filters.</p>
                 </div>`
              : postsHtml
            }
          </div>
        </div>

        <!-- Leaderboard / Stats Sidebar Column -->
        <div class="lg:col-span-1 flex flex-col gap-6">
          <!-- Active Doubt Solvers Leaderboard -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4">
            <div class="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
              <i class="fa-solid fa-trophy text-amber-500"></i>
              <h4 class="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white leading-none">Top Doubt Solvers</h4>
            </div>

            <div class="flex flex-col gap-3.5">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold text-slate-400">1</span>
                  <div class="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-extrabold">R</div>
                  <div>
                    <p class="text-[11px] font-extrabold text-slate-900 dark:text-white leading-none">Rohan Verma</p>
                    <p class="text-[9px] text-slate-400 mt-1 font-semibold">AIR 246 &bull; 42 Solved</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-primary-500">1,240 pts</span>
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold text-slate-400">2</span>
                  <div class="h-8 w-8 rounded-xl bg-slate-300/20 text-slate-500 flex items-center justify-center text-xs font-extrabold">A</div>
                  <div>
                    <p class="text-[11px] font-extrabold text-slate-900 dark:text-white leading-none">Ananya Sharma</p>
                    <p class="text-[9px] text-slate-400 mt-1 font-semibold">Aspirant &bull; 28 Solved</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-primary-500">890 pts</span>
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold text-slate-400">3</span>
                  <div class="h-8 w-8 rounded-xl bg-amber-700/10 text-amber-700 flex items-center justify-center text-xs font-extrabold">A</div>
                  <div>
                    <p class="text-[11px] font-extrabold text-slate-900 dark:text-white leading-none">Amit Das</p>
                    <p class="text-[9px] text-slate-400 mt-1 font-semibold">Aspirant &bull; 15 Solved</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-primary-500">620 pts</span>
              </div>
            </div>
          </div>

          <!-- Community Guidelines Info Widget -->
          <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] bg-gradient-to-br from-primary-500/5 to-indigo-500/5 flex flex-col gap-3">
            <h4 class="font-display font-extrabold text-[11px] uppercase tracking-wider text-slate-900 dark:text-white">Community Mentor</h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Post detailed equations, concepts, or code. Click **"Ask AI Mentor"** to prompt Gemini for quick mathematical resolutions.
            </p>
          </div>
        </div>

        <!-- Post Doubt Modal -->
        <div id="doubt-post-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 dark:bg-black/80 backdrop-blur-md hidden animate-fade-in px-4">
          <div class="w-full max-w-lg glass-panel p-7 rounded-3xl relative border border-slate-200 dark:border-white/10 shadow-2xl text-slate-900 dark:text-white">
            <button id="close-doubt-modal-btn" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>

            <h3 class="font-display font-extrabold text-lg mb-4">Post a New Doubt</h3>

            <form id="new-doubt-form" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Subject Category</label>
                <select id="doubt-form-category" required class="glass-input text-xs font-semibold bg-white dark:bg-[#0d1320] focus:outline-none">
                  ${this.categories.slice(1).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Title / Topic Query</label>
                <input type="text" id="doubt-form-title" placeholder="e.g. Master Method vs Recursion Tree complexity bound query" required class="glass-input text-xs font-semibold">
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Doubt Description</label>
                <textarea id="doubt-form-content" placeholder="Describe your doubt in detail. Paste equations, numerical parameters, or code blocks here..." required rows="5" class="glass-input text-xs font-semibold resize-none"></textarea>
              </div>

              <button type="submit" class="w-full mt-2 py-3 rounded-xl btn-accent text-white font-bold text-xs shadow-md active:scale-95 transition-all">
                Publish doubt to Community
              </button>
            </form>
          </div>
        </div>

      </div>
    `;
  },

  renderThreadView() {
    const post = this.posts.find(p => p.id === this.activePostId);
    if (!post) {
      this.activePostId = null;
      return 'Loading discussion thread...';
    }

    const repliesHtml = (post.replies || []).map(r => {
      const initial = r.authorInitial || 'A';
      return `
        <div class="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-white/[0.04] bg-slate-50/50 dark:bg-slate-950/10 flex gap-4">
          <div class="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary-500/10 to-indigo-500/10 text-primary-500 flex items-center justify-center text-xs font-extrabold flex-shrink-0">
            ${initial}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-4 mb-2">
              <div>
                <span class="text-xs font-extrabold text-slate-905 dark:text-white leading-none">${r.author}</span>
                <span class="text-[9px] font-semibold text-slate-400 dark:text-slate-500 ml-1.5">${r.authorTitle || 'Aspirant'}</span>
              </div>
              <span class="text-[9px] text-slate-450 dark:text-slate-500 font-semibold">${this.formatTimeAgo(r.timestamp)}</span>
            </div>
            <p class="text-xs text-slate-655 dark:text-slate-350 leading-relaxed font-semibold whitespace-pre-line">${r.content}</p>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="flex flex-col gap-6 animate-fade-in pb-12 max-w-4xl mx-auto">
        <!-- Back button -->
        <div class="flex items-center">
          <button id="btn-back-to-forum" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 select-none">
            <i class="fa-solid fa-arrow-left"></i> Back to Feed
          </button>
        </div>

        <!-- Thread Head Post Card -->
        <div class="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-white/[0.08] flex flex-col gap-4 relative">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="h-9 w-9 rounded-2xl bg-gradient-to-tr from-primary-500/15 to-indigo-500/15 text-primary-500 flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                ${post.authorInitial || 'A'}
              </div>
              <div>
                <p class="text-xs font-extrabold text-slate-909 dark:text-white leading-none">${post.author}</p>
                <p class="text-[10px] text-slate-400 mt-1 font-semibold">${post.authorTitle || 'Aspirant'} &bull; ${this.formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>
            
            <span class="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-slate-100 dark:bg-slate-950/40 border border-slate-200/20 dark:border-white/[0.03] text-slate-500 dark:text-slate-450 uppercase tracking-wider">
              ${post.category}
            </span>
          </div>

          <h3 class="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight mt-1">
            ${post.title}
          </h3>
          
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-semibold whitespace-pre-line border-l-2 border-primary-500/50 pl-4 py-1">
            ${post.content}
          </p>

          <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-4 mt-2">
            <button class="upvote-post-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-extrabold select-none active:scale-95 ${
              post.upvoted 
                ? 'bg-primary-500/10 text-primary-500 border-primary-500/30' 
                : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
            }" data-id="${post.id}">
              <i class="fa-solid fa-chevron-up"></i>
              <span>${post.upvotes} Upvotes</span>
            </button>

            <button class="ask-ai-mentor-btn px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-650 text-white text-[10px] font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-1.5 select-none" data-id="${post.id}" data-title="${post.title}" data-content="${post.content}">
              <i class="fa-solid fa-sparkles animate-pulse"></i> Solve with AI Mentor
            </button>
          </div>
        </div>

        <!-- Replies Section -->
        <div class="space-y-4">
          <h4 class="font-display font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">
            Replies (${post.replies ? post.replies.length : 0})
          </h4>

          <div class="flex flex-col gap-4">
            ${post.replies && post.replies.length > 0
              ? repliesHtml
              : `<div class="text-center py-8 glass-panel rounded-2xl border border-slate-200/50 dark:border-white/[0.04]">
                   <i class="fa-regular fa-comment-dots text-slate-400 text-2xl mb-2 block"></i>
                   <p class="text-xs text-slate-500 font-bold">No replies yet. Be the first to answer!</p>
                 </div>`
            }
          </div>
        </div>

        <!-- Reply Form Box -->
        <div class="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-white/[0.07] flex flex-col gap-4 mt-2">
          <h4 class="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Write a Reply</h4>
          <form id="thread-reply-form" class="flex flex-col gap-3">
            <textarea id="thread-reply-content" placeholder="Write your mathematical solution, explanation, or query response here. Be precise..." required rows="4" class="glass-input text-xs font-semibold resize-none"></textarea>
            <div class="flex justify-end">
              <button type="submit" class="px-5 py-2.5 rounded-xl btn-accent text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5">
                <i class="fa-solid fa-paper-plane"></i> Post Reply
              </button>
            </div>
          </form>
        </div>

      </div>
    `;
  },

  async init() {
    window.scrollTo(0, 0);

    const searchInput = document.getElementById('forum-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        // Debounce list refresh
        clearTimeout(this.searchDebounce);
        this.searchDebounce = setTimeout(() => {
          this.refreshListView();
        }, 300);
      });
    }

    // Category chips filters
    document.querySelectorAll('.cat-filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedCategory = btn.getAttribute('data-category');
        this.refreshListView();
      });
    });

    // View post thread
    document.querySelectorAll('.view-post-thread').forEach(item => {
      item.addEventListener('click', () => {
        this.activePostId = item.getAttribute('data-id');
        this.refreshListView();
      });
    });

    // Upvote trigger
    document.querySelectorAll('.upvote-post-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        await db.upvotePost(id);
        this.refreshListView();
      });
    });

    // Ask AI Mentor triggers
    document.querySelectorAll('.ask-ai-mentor-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        const content = btn.getAttribute('data-content');

        showToast("Consulting AI Mentor...", "info");
        btn.disabled = true;
        btn.classList.add('opacity-50');

        try {
          const apiKey = localStorage.getItem('gemini_api_key');
          let replyText = '';

          if (apiKey) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{ text: `You are an expert GATE Computer Science mentor. Provide a precise, conceptual, and mathematically accurate solution or explanation to this aspirant's doubt.\n\nQuery Title: ${title}\nQuery Detail: ${content}` }]
                }]
              })
            });

            if (res.ok) {
              const data = await res.json();
              replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to compile response.";
            } else {
              const err = await res.json().catch(() => ({}));
              replyText = `AI Mentor failed to answer: ${err.error?.message || res.statusText}`;
            }
          } else {
            // High-quality static fallback
            replyText = `Here is the AI Mentor analysis of your doubt:\n\n1. **Core Concept**: This concerns states evaluation inside finite automata and DFAs. In TOC, we track string endings by configuring transitions that shift back to historical state parameters upon encountering mismatch inputs.\n\n2. **Step-by-Step State Transition Table**:\n- State \\( q_0 \\) (Start state / strings ending in other configurations).\n- State \\( q_1 \\) (Strings ending in '0').\n- State \\( q_2 \\) (Accept state / strings ending in '01').\n\n- Transitioning: On reading '0' in state \\( q_2 \\), stay in state \\( q_1 \\) because it still ends with '0'. On reading '1', go back to \\( q_0 \\).\n\n(Tip: Save your Google Gemini API key in configuration settings to fetch live custom solver comments!)`;
          }

          // Save reply
          await db.addPostReply(id, {
            author: 'GateLabs AI Mentor',
            authorTitle: 'AI Core Assistant',
            authorInitial: '🤖',
            content: replyText
          });

          showToast("AI Mentor replied successfully!", "success");
          this.refreshListView();
        } catch (err) {
          showToast(`Error running AI Solver: ${err.message}`, "error");
        } finally {
          btn.disabled = false;
          btn.classList.remove('opacity-50');
        }
      });
    });

    // New doubt modal controls
    const openDoubtBtn = document.getElementById('btn-open-doubt-modal');
    const closeDoubtBtn = document.getElementById('close-doubt-modal-btn');
    const modal = document.getElementById('doubt-post-modal');
    const form = document.getElementById('new-doubt-form');

    if (openDoubtBtn && modal) {
      openDoubtBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }

    if (closeDoubtBtn && modal) {
      closeDoubtBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (form && modal) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        const newPost = {
          title: document.getElementById('doubt-form-title').value,
          category: document.getElementById('doubt-form-category').value,
          content: document.getElementById('doubt-form-content').value,
          author: user ? (user.displayName || 'Anonymous') : 'Bharath',
          authorTitle: 'Aspirant',
          authorInitial: user && user.displayName ? user.displayName.charAt(0).toUpperCase() : 'B'
        };

        await db.saveCommunityPost(newPost);
        showToast("Doubt published to the community!", "success");
        modal.classList.add('hidden');
        form.reset();
        this.refreshListView();
      });
    }

    // Thread back button
    const backBtn = document.getElementById('btn-back-to-forum');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.activePostId = null;
        this.refreshListView();
      });
    }

    // Thread reply form
    const replyForm = document.getElementById('thread-reply-form');
    if (replyForm) {
      replyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        const replyContent = document.getElementById('thread-reply-content').value;

        const newReply = {
          author: user ? (user.displayName || 'Anonymous') : 'Bharath',
          authorTitle: 'Aspirant',
          authorInitial: user && user.displayName ? user.displayName.charAt(0).toUpperCase() : 'B',
          content: replyContent
        };

        await db.addPostReply(this.activePostId, newReply);
        showToast("Reply published!", "success");
        replyForm.reset();
        this.refreshListView();
      });
    }
  },

  async refreshListView() {
    const container = document.getElementById('sub-page-container');
    if (container) {
      container.innerHTML = await this.render();
      await this.init();
    }
  },

  formatTimeAgo(isoString) {
    try {
      const date = new Date(isoString);
      const seconds = Math.floor((new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) return interval + "y ago";
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) return interval + "m ago";
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) return interval + "d ago";
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) return interval + "h ago";
      interval = Math.floor(seconds / 60);
      if (interval >= 1) return interval + "m ago";
      return seconds < 10 ? "just now" : Math.floor(seconds) + "s ago";
    } catch (e) {
      return "some time ago";
    }
  }
};
