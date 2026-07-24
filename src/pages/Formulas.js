export const Formulas = {
  activeSubject: 'All',
  searchQuery: '',
  flippedCards: {},

  render() {
    const flashcards = [
      // Operating Systems
      {
        id: 'f1',
        subject: 'Operating Systems',
        topic: 'Deadlocks',
        concept: 'What are Coffman\'s 4 Necessary Conditions for Deadlock?',
        formula: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\nBanker\'s Algorithm Safety Check: Need = Max - Allocation. If Need ≤ Available, state is SAFE.',
        mastered: false
      },
      {
        id: 'f2',
        subject: 'Operating Systems',
        topic: 'Memory Management',
        concept: 'Page Table Size & Effective Access Time Formula',
        formula: 'Page Table Size = (Number of Pages) × (Page Table Entry Size)\nNumber of Pages = Virtual Address Space / Page Size\nEAT = Hit Rate × (TLB + RAM) + Miss Rate × (TLB + 2 × RAM)',
        mastered: false
      },
      // Algorithms
      {
        id: 'f3',
        subject: 'Algorithms',
        topic: 'Divide & Conquer',
        concept: 'Master Theorem for Divide and Conquer Recurrences',
        formula: 'For T(n) = a T(n/b) + f(n) where a ≥ 1, b > 1:\nCompare f(n) with n^(log_b(a)):\n1. If f(n) = O(n^(log_b(a) - ε)), then T(n) = Θ(n^(log_b(a)))\n2. If f(n) = Θ(n^(log_b(a))), then T(n) = Θ(n^(log_b(a)) log n)\n3. If f(n) = Ω(n^(log_b(a) + ε)), then T(n) = Θ(f(n))',
        mastered: false
      },
      {
        id: 'f4',
        subject: 'Algorithms',
        topic: 'Graph Algorithms',
        concept: 'Single Source Shortest Path Time Complexities',
        formula: 'Dijkstra (Binary Heap): O((V + E) log V)\nDijkstra (Array): O(V²)\nBellman-Ford (Handles negative edges): O(V × E)\nFloyd-Warshall (All Pairs Shortest Path): O(V³)',
        mastered: false
      },
      // DBMS
      {
        id: 'f5',
        subject: 'Databases (DBMS)',
        topic: 'Normalization',
        concept: 'Relational Normal Forms Hierarchy & Checking Rules',
        formula: '1NF: Atomic values only\n2NF: 1NF + No partial dependency (Non-prime attribute dependent on proper subset of candidate key)\n3NF: 2NF + No transitive dependency (X → Y, X is candidate key or Y is prime)\nBCNF: For every X → Y, X MUST be a candidate key.',
        mastered: false
      },
      // Computer Networks
      {
        id: 'f6',
        subject: 'Computer Networks (CN)',
        topic: 'TCP / IP & Flow Control',
        concept: 'Sliding Window Protocol Efficiency & Channel Utilization',
        formula: 'Propagation Delay (Tp) = Distance / Speed\nTransmission Delay (Tt) = Frame Size / Bandwidth\nParameter a = Tp / Tt\nStop-and-Wait Efficiency = 1 / (1 + 2a)\nGo-Back-N Efficiency = min(W, 1 + 2a) / (1 + 2a)',
        mastered: false
      },
      // Theory of Computation
      {
        id: 'f7',
        subject: 'Theory of Computation (TOC)',
        topic: 'Chomsky Hierarchy',
        concept: 'Chomsky Hierarchy Languages & Automata Recognizers',
        formula: 'Type 3 (Regular): Finite Automata (DFA/NFA)\nType 2 (Context-Free): Pushdown Automata (PDA)\nType 1 (Context-Sensitive): Linear Bounded Automata (LBA)\nType 0 (Unrestricted / RE): Turing Machine (TM)\nClosure: CFL closed under Union, Concatenation, Kleene Star. NOT closed under Intersection or Complement.',
        mastered: false
      },
      // Engineering Mathematics
      {
        id: 'f8',
        subject: 'Engineering Mathematics',
        topic: 'Linear Algebra',
        concept: 'Eigenvalues & Matrix Properties',
        formula: 'Sum of Eigenvalues = Trace of Matrix (Sum of main diagonal elements)\nProduct of Eigenvalues = Determinant of Matrix (|A|)\nIf A is Symmetric → Eigenvalues are purely real.\nCayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation P(λ) = 0.',
        mastered: false
      }
    ];

    const subjects = ['All', 'Operating Systems', 'Algorithms', 'Databases (DBMS)', 'Computer Networks (CN)', 'Theory of Computation (TOC)', 'Engineering Mathematics'];

    const filtered = flashcards.filter(c => {
      const matchSub = this.activeSubject === 'All' || c.subject === this.activeSubject;
      const matchQ = !this.searchQuery || c.concept.toLowerCase().includes(this.searchQuery.toLowerCase()) || c.topic.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchSub && matchQ;
    });

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-12">
        <!-- Header -->
        <div class="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-200/60 dark:border-white/[0.08]">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-book-bookmark"></i> Quick Revision
            </div>
            <h3 class="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
              GATE CS Formula & Short Notes Deck
            </h3>
            <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
              Interactive flashcards for high-weightage formulas, theorems, and normal forms. Click any card to flip.
            </p>
          </div>

          <div class="relative w-full md:w-72">
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
            <input type="text" id="formula-search" placeholder="Search formulas, e.g. Master Theorem..." value="${this.searchQuery}" class="glass-input pl-9 text-xs font-semibold">
          </div>
        </div>

        <!-- Subject Filter Pills -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          ${subjects.map(s => `
            <button class="formula-sub-pill flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              this.activeSubject === s ? 'btn-accent scale-105' : 'glass-card text-slate-600 dark:text-slate-400 hover:accent-text'
            }" data-sub="${s}">
              ${s}
            </button>
          `).join('')}
        </div>

        <!-- Flashcards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.map(card => {
            const isFlipped = !!this.flippedCards[card.id];
            return `
              <div class="perspective-1000 h-72 cursor-pointer group" data-cardid="${card.id}">
                <div class="relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}">
                  
                  <!-- FRONT: Concept / Question -->
                  <div class="absolute inset-0 bento-card p-6 flex flex-col justify-between backface-hidden border border-slate-200/60 dark:border-white/[0.08] group-hover:border-primary-500/40">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-primary-500 uppercase tracking-wider bg-primary-500/10 px-2.5 py-1 rounded-lg">${card.subject}</span>
                      <span class="text-[10px] font-bold text-slate-400">${card.topic}</span>
                    </div>

                    <div class="my-auto text-center px-2">
                      <h4 class="font-display font-bold text-base text-slate-800 dark:text-white leading-snug">${card.concept}</h4>
                      <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-3 flex items-center justify-center gap-1 font-semibold">
                        <i class="fa-solid fa-rotate text-xs animate-spin-slow"></i> Click card to reveal formula & answer
                      </p>
                    </div>

                    <div class="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-3 text-[10px] text-slate-400 font-bold">
                      <span>Question Side</span>
                      <span class="text-indigo-500 group-hover:underline">Flip Card &rarr;</span>
                    </div>
                  </div>

                  <!-- BACK: Formula / Solution -->
                  <div class="absolute inset-0 bento-card p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-slate-900 text-white border border-slate-700">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                        <i class="fa-solid fa-square-check text-indigo-400"></i> Formula & Key Solution
                      </span>
                      <span class="text-[10px] text-slate-400">${card.topic}</span>
                    </div>

                    <div class="my-auto overflow-y-auto max-h-44 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-line py-2">
                      ${card.formula}
                    </div>

                    <div class="flex items-center justify-between border-t border-slate-800 pt-2 text-[10px] text-slate-400 font-bold">
                      <span class="text-slate-400">Answer Side</span>
                      <span class="text-indigo-300">Click to flip back &circlearrowleft;</span>
                    </div>
                  </div>

                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  init() {
    // Ensure page scrolls to top when landing on Formulas
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Subject filter click handlers
    document.querySelectorAll('.formula-sub-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeSubject = btn.getAttribute('data-sub');
        this.refresh();
      });
    });

    // Search input handler - maintains focus & cursor position
    const searchInput = document.getElementById('formula-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const cursor = e.target.selectionStart;
        this.searchQuery = val;
        this.refresh();
        const newSearchInput = document.getElementById('formula-search');
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(cursor, cursor);
        }
      });
    }

    // Flashcard 3D flip click handler - toggles CSS class directly for 60fps 3D flip animation
    document.querySelectorAll('[data-cardid]').forEach(cardDom => {
      cardDom.addEventListener('click', () => {
        const id = cardDom.getAttribute('data-cardid');
        this.flippedCards[id] = !this.flippedCards[id];
        const innerFlip = cardDom.querySelector('.transform-style-3d');
        if (innerFlip) {
          if (this.flippedCards[id]) {
            innerFlip.classList.add('rotate-y-180');
          } else {
            innerFlip.classList.remove('rotate-y-180');
          }
        }
      });
    });
  },

  refresh() {
    const mainContainer = document.getElementById('sub-page-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.render();
      this.init();
    }
  }
};
