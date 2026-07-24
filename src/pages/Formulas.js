import { showToast } from '../utils/toast';

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
        icon: 'fa-solid fa-microchip',
        weightage: 'High (2-3 Marks)',
        concept: 'Coffman\'s Conditions & Banker\'s Safety Check',
        mathLatex: 'Need[i][j] = Max[i][j] - Allocation[i][j] \\le Available[j]',
        formula: `1. Mutual Exclusion
2. Hold & Wait
3. No Preemption
4. Circular Wait

• Banker's Safety Algorithm:
  Need = Max - Allocation
  State is SAFE if an execution sequence exists where Need ≤ Available.`,
      },
      {
        id: 'f2',
        subject: 'Operating Systems',
        topic: 'Memory Management',
        icon: 'fa-solid fa-memory',
        weightage: 'High (2-3 Marks)',
        concept: 'Page Table Size & Effective Access Time (EAT)',
        mathLatex: 'EAT = h \\cdot (t_{TLB} + t_{RAM}) + (1-h) \\cdot (t_{TLB} + 2 t_{RAM})',
        formula: `• Number of Pages = Virtual Address Space / Page Size
• Page Table Size = (Number of Pages) × (PTE Size)
• Effective Access Time (Single-level Page Table):
  EAT = h × (t_TLB + t_RAM) + (1 - h) × (t_TLB + 2 × t_RAM)
  (where h = TLB hit ratio)`,
      },
      {
        id: 'f3',
        subject: 'Operating Systems',
        topic: 'CPU Scheduling',
        icon: 'fa-solid fa-clock-rotate-left',
        weightage: 'Medium (1-2 Marks)',
        concept: 'Turnaround Time & Waiting Time Formulas',
        mathLatex: 'TAT = Completion - Arrival \\quad\\mid\\quad WT = TAT - Burst',
        formula: `• Turnaround Time (TAT) = Completion Time - Arrival Time
• Waiting Time (WT) = Turnaround Time - Burst Time
• Response Time (RT) = First CPU Time - Arrival Time
• Convoy Effect occurs in FCFS when CPU-bound process blocks I/O-bound processes.`,
      },

      // Algorithms
      {
        id: 'f4',
        subject: 'Algorithms',
        topic: 'Divide & Conquer',
        icon: 'fa-solid fa-code-branch',
        weightage: 'High (2-3 Marks)',
        concept: 'Master Theorem for Recurrences',
        mathLatex: 'T(n) = a T(n/b) + f(n), \\quad a \\ge 1, b > 1',
        formula: `Compare f(n) with n^(log_b a):

1. If f(n) = O(n^(log_b a - ε))  ⇒  T(n) = Θ(n^(log_b a))
2. If f(n) = Θ(n^(log_b a) · log^k n)  ⇒  T(n) = Θ(n^(log_b a) · log^(k+1) n)
3. If f(n) = Ω(n^(log_b a + ε)) AND a·f(n/b) ≤ c·f(n)  ⇒  T(n) = Θ(f(n))`,
      },
      {
        id: 'f5',
        subject: 'Algorithms',
        topic: 'Graph Algorithms',
        icon: 'fa-solid fa-diagram-project',
        weightage: 'High (2 Marks)',
        concept: 'Shortest Path & MST Time Complexities',
        mathLatex: 'O((V + E) \\log V) \\quad\\text{vs}\\quad O(V \\cdot E)',
        formula: `• Dijkstra (Binary Heap): O((V + E) log V)
• Dijkstra (Array): O(V²)
• Bellman-Ford (Negative Edge Weights): O(V × E)
• Floyd-Warshall (All-Pairs): O(V³)
• Kruskal's MST (Disjoint Sets): O(E log E)
• Prim's MST (Min-Heap): O(E log V)`,
      },

      // DBMS
      {
        id: 'f6',
        subject: 'Databases (DBMS)',
        topic: 'Normalization',
        icon: 'fa-solid fa-database',
        weightage: 'High (2-3 Marks)',
        concept: 'Relational Normal Forms (1NF → BCNF)',
        mathLatex: 'X \\to Y \\implies X \\text{ is Candidate Key (BCNF)}',
        formula: `• 1NF: Atomic attributes only.
• 2NF: 1NF + No Partial Dependency (Non-prime dependent on proper subset of Candidate Key).
• 3NF: 2NF + No Transitive Dependency (For X → Y, X is Super Key OR Y is Prime).
• BCNF: For EVERY non-trivial FD X → Y, X MUST be a Super Key.`,
      },
      {
        id: 'f7',
        subject: 'Databases (DBMS)',
        topic: 'Transactions & Concurrency',
        icon: 'fa-solid fa-list-check',
        weightage: 'Medium (2 Marks)',
        concept: 'Conflict Serializability & 2PL Rules',
        mathLatex: 'S_1 \\equiv_c S_2 \\iff \\text{Precedence Graph is Acyclic}',
        formula: `• Conflict Operations: Same item, different transactions, at least one is WRITE.
• Conflict Serializable if Serialization / Precedence Graph has NO CYCLES.
• Basic 2PL: Ensures Conflict Serializability (Growing phase → Shrinking phase).
• Strict 2PL: All Exclusive Locks held until COMMIT (prevents cascading rollbacks).`,
      },

      // Computer Networks
      {
        id: 'f8',
        subject: 'Computer Networks (CN)',
        topic: 'Flow & Congestion Control',
        icon: 'fa-solid fa-network-wired',
        weightage: 'High (2 Marks)',
        concept: 'Sliding Window Protocol Efficiency',
        mathLatex: '\\eta = \\frac{W}{1 + 2a}, \\quad a = \\frac{T_p}{T_t}',
        formula: `• Propagation Delay (Tp) = Distance / Speed
• Transmission Delay (Tt) = Packet Size / Bandwidth
• Efficiency Parameter: a = Tp / Tt
• Stop-and-Wait Efficiency = 1 / (1 + 2a)
• Go-Back-N (Window W) Efficiency = min(W, 1 + 2a) / (1 + 2a)
• Selective Repeat Efficiency = min(W, 1 + 2a) / (1 + 2a) (Max W = 2^(n-1))`,
      },
      {
        id: 'f9',
        subject: 'Computer Networks (CN)',
        topic: 'IP Subnetting & CIDR',
        icon: 'fa-solid fa-globe',
        weightage: 'High (2 Marks)',
        concept: 'CIDR Subnetting & Usable IP Host Calculation',
        mathLatex: 'N_{\\text{hosts}} = 2^{(32 - /n)} - 2',
        formula: `• Given CIDR prefix /n:
  - Subnet Mask = n consecutive 1s followed by (32 - n) 0s
  - Total Addresses = 2^(32 - n)
  - Usable Host IPs = 2^(32 - n) - 2 (subtract Network ID & Broadcast ID)
• Subnet ID = IP Bitwise AND Subnet Mask
• Broadcast ID = Subnet ID with host bits set to 1`,
      },

      // Theory of Computation
      {
        id: 'f10',
        subject: 'Theory of Computation (TOC)',
        topic: 'Chomsky Hierarchy',
        icon: 'fa-solid fa-gears',
        weightage: 'High (2-3 Marks)',
        concept: 'Chomsky Hierarchy & Automata Recognizers',
        mathLatex: 'L_3 \\subset L_2 \\subset L_1 \\subset L_0',
        formula: `• Type 3 (Regular): Finite Automata (DFA / NFA)
• Type 2 (Context-Free): Pushdown Automata (PDA)
• Type 1 (Context-Sensitive): Linear Bounded Automata (LBA)
• Type 0 (Unrestricted / RE): Turing Machine (TM)

Closure Properties:
• Regular: Closed under ALL (Union, Intersect, Comp, Kleene, Concatenation)
• Context-Free: Closed under Union, Concatenation, Star. NOT under Intersect or Complement.`,
      },
      {
        id: 'f11',
        subject: 'Theory of Computation (TOC)',
        topic: 'Regular Languages',
        icon: 'fa-solid fa-shield-halved',
        weightage: 'Medium (1-2 Marks)',
        concept: 'Pumping Lemma for Regular Languages',
        mathLatex: 'w = xyz \\quad\\text{s.t.}\\quad |xy| \\le p, |y| \\ge 1, \\forall i \\ge 0: xy^i z \\in L',
        formula: `If L is regular, there exists pumping length p such that any string w ∈ L with |w| ≥ p can be split into w = xyz satisfying:
1. |xy| ≤ p
2. |y| ≥ 1
3. xy^i z ∈ L for all i ≥ 0

Used to PROVE a language is NOT regular by contradiction (e.g. L = {a^n b^n | n ≥ 0}).`,
      },

      // COA
      {
        id: 'f12',
        subject: 'Computer Organization (COA)',
        topic: 'Pipelining',
        icon: 'fa-solid fa-bolt',
        weightage: 'High (2 Marks)',
        concept: 'Pipeline Speedup & Execution Time Ratio',
        mathLatex: 'S_k = \\frac{n \\cdot k}{(k + n - 1)} \\xrightarrow{n \\to \\infty} k',
        formula: `• Non-Pipelined Execution Time = n × k × τ
• Pipelined Execution Time = (k + n - 1) × τ_p
  (where k = number of segments, n = number of instructions)
• Speedup S_k = (n × k × τ) / ((k + n - 1) × τ_p)
• Ideal Speedup (n → ∞) = k (Number of pipeline stages)
• CPI (Cycles Per Instruction) of Ideal Pipeline = 1`,
      },
      {
        id: 'f13',
        subject: 'Computer Organization (COA)',
        topic: 'Cache Memory',
        icon: 'fa-solid fa-hard-drive',
        weightage: 'High (2 Marks)',
        concept: 'Direct Mapping vs Set-Associative Cache Fields',
        mathLatex: '\\text{CPU Address} = \\text{Tag} + \\text{Set/Index} + \\text{Block Offset}',
        formula: `• Block Offset bits = log2(Block Size in bytes)
• Direct Mapping Index bits = log2(Number of Lines in Cache)
• K-way Set-Associative Set bits = log2(Number of Lines / K)
• Tag bits = Main Memory Address Bits - (Index bits + Offset bits)
• Tag Directory Size = (Number of Cache Lines) × (Tag bits + Valid/Dirty bits)`,
      },

      // Engineering Mathematics
      {
        id: 'f14',
        subject: 'Engineering Mathematics',
        topic: 'Linear Algebra',
        icon: 'fa-solid fa-calculator',
        weightage: 'High (2 Marks)',
        concept: 'Eigenvalues & Matrix Properties',
        mathLatex: '\\sum \\lambda_i = \\text{Trace}(A), \\quad \\prod \\lambda_i = \\det(A)',
        formula: `• Sum of Eigenvalues = Trace(A) (Sum of main diagonal elements)
• Product of Eigenvalues = Determinant det(A)
• Eigenvalues of Triangular / Diagonal matrix are its diagonal elements.
• If A is Symmetric  ⇒  Eigenvalues are purely REAL.
• Cayley-Hamilton Theorem: Every square matrix satisfies its characteristic polynomial P(λ) = 0.`,
      },
      {
        id: 'f15',
        subject: 'Engineering Mathematics',
        topic: 'Probability & Statistics',
        icon: 'fa-solid fa-chart-line',
        weightage: 'High (2 Marks)',
        concept: 'Bayes\' Theorem & Poisson Distribution',
        mathLatex: 'P(A|B) = \\frac{P(B|A) P(A)}{P(B)}, \\quad P(X=k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}',
        formula: `• Bayes' Theorem: P(A|B) = P(B|A) · P(A) / P(B)
• Expectation E[X] = ∑ x P(x)
• Variance Var(X) = E[X²] - (E[X])²
• Binomial Distribution: Mean = n p, Variance = n p (1 - p)
• Poisson Distribution: Mean = λ, Variance = λ
  P(X = k) = (e^(-λ) · λ^k) / k!`,
      },

      // Compiler Design
      {
        id: 'f16',
        subject: 'Compiler Design',
        topic: 'Parsing & Syntax Analysis',
        icon: 'fa-solid fa-file-code',
        weightage: 'Medium (1-2 Marks)',
        concept: 'FIRST & FOLLOW Sets for LL(1) Parsing',
        mathLatex: '\\text{LL}(1) \\implies \\text{FIRST}(\\alpha) \\cap \\text{FIRST}(\\beta) = \\emptyset',
        formula: `• FIRST(α): Set of terminals that begin strings derived from α.
• FOLLOW(A): Set of terminals that can appear immediately to the right of A in any sentential form.
  - $ is always in FOLLOW(S) where S is the start symbol.
• LL(1) Parsing Table Conflict Check for A → α | β:
  1. FIRST(α) ∩ FIRST(β) = ∅
  2. If ε ∈ FIRST(α), then FIRST(β) ∩ FOLLOW(A) = ∅`,
      }
    ];

    // Merge custom user-created formula cards from localStorage
    const customCards = JSON.parse(localStorage.getItem('gate_custom_formulas') || '[]');
    const allFlashcards = [...flashcards, ...customCards];

    const subjects = [
      'All',
      'Operating Systems',
      'Algorithms',
      'Databases (DBMS)',
      'Computer Networks (CN)',
      'Theory of Computation (TOC)',
      'Computer Organization (COA)',
      'Engineering Mathematics',
      'Compiler Design',
      'Custom Cards'
    ];

    const filtered = allFlashcards.filter(c => {
      let matchSub = false;
      if (this.activeSubject === 'All') {
        matchSub = true;
      } else if (this.activeSubject === 'Custom Cards') {
        matchSub = c.isCustom === true;
      } else {
        matchSub = c.subject === this.activeSubject || c.subject.includes(this.activeSubject);
      }

      const matchQ = !this.searchQuery ||
        c.concept.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.topic.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.formula.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchSub && matchQ;
    });

    return `
      <div class="flex flex-col gap-6 animate-fade-in font-sans pb-16">

        <!-- ===== APPLE GLASSMORPHISM HEADER ===== -->
        <div class="glass-panel p-8 rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-slate-200/60 dark:border-white/[0.08] relative overflow-hidden">
          <!-- Background ambient glow -->
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[var(--accent-from)]/15 to-[var(--accent-to)]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold accent-text streak-badge border accent-border mb-3 shadow-sm">
              <i class="fa-solid fa-book-bookmark"></i> Quick Revision Deck
            </div>
            <h3 class="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight leading-tight">
              GATE CS Formula & Theorem Deck
            </h3>
            <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
              Interactive 3D flashcards with LaTeX equations, step-by-step proofs, and high-weightage formulas for GATE CS 2027.
            </p>
          </div>

          <!-- Search & Counter Box -->
          <div class="relative z-10 w-full lg:w-96 flex flex-col gap-3">
            <div class="flex gap-2">
              <div class="relative flex-1">
                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                <input type="text" id="formula-search" placeholder="Search formulas..." value="${this.searchQuery}" class="glass-input pl-9 text-xs font-semibold">
              </div>
              <button id="btn-open-custom-formula" type="button" class="px-4 py-2.5 rounded-2xl btn-accent text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0">
                <i class="fa-solid fa-plus"></i> Add Card
              </button>
            </div>

            <div class="flex items-center justify-between px-4 py-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.05] text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-layer-group accent-text"></i> ${filtered.length} of ${allFlashcards.length} Cards
              </span>
              <span class="accent-text">Click card to flip ↺</span>
            </div>
          </div>
        </div>

        <!-- ===== SUBJECT FILTER PILLS ===== -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          ${subjects.map(s => `
            <button class="formula-sub-pill flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              this.activeSubject === s ? 'btn-accent scale-105 shadow-md' : 'glass-card text-slate-600 dark:text-slate-400 hover:accent-text'
            }" data-sub="${s}">
              ${s}
            </button>
          `).join('')}
        </div>

        <!-- ===== 3D CARD GRID CANVAS ===== -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.map(c => this.renderFormulaCard(c)).join('')}
        </div>

        <!-- ===== ADD CUSTOM FORMULA MODAL ===== -->
        <div id="custom-formula-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md hidden px-4 animate-fade-in">
          <div class="w-full max-w-lg bg-white dark:bg-[#0f1424] text-slate-900 dark:text-white rounded-3xl p-7 shadow-2xl border border-slate-200 dark:border-indigo-500/40 flex flex-col gap-5">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-2xl btn-accent text-white flex items-center justify-center text-base shadow-md">
                  <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <div>
                  <h4 class="font-display font-extrabold text-base tracking-tight">Create Custom Flashcard</h4>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">Save personal formulas & notes to your 3D revision deck</p>
                </div>
              </div>
              <button id="close-custom-modal" type="button" class="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form id="custom-formula-form" class="flex flex-col gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Subject</label>
                <select id="custom-subject" class="glass-input text-xs font-bold" required>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Databases (DBMS)">Databases (DBMS)</option>
                  <option value="Computer Networks (CN)">Computer Networks (CN)</option>
                  <option value="Theory of Computation (TOC)">Theory of Computation (TOC)</option>
                  <option value="Computer Organization (COA)">Computer Organization (COA)</option>
                  <option value="Engineering Mathematics">Engineering Mathematics</option>
                  <option value="Compiler Design">Compiler Design</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Topic Name</label>
                  <input type="text" id="custom-topic" placeholder="e.g. Deadlocks" class="glass-input text-xs" required>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Weightage Badge</label>
                  <input type="text" id="custom-weightage" placeholder="e.g. High (2 Marks)" class="glass-input text-xs" required>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Concept Title</label>
                <input type="text" id="custom-concept" placeholder="e.g. Banker's Algorithm Safety Formula" class="glass-input text-xs font-bold" required>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">LaTeX Math Expression (Optional)</label>
                <input type="text" id="custom-latex" placeholder="e.g. Need[i] = Max[i] - Allocation[i]" class="glass-input font-mono text-xs">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Formula & Notes (Text Body)</label>
                <textarea id="custom-formula-text" rows="3" placeholder="Enter key formula, conditions, or step-by-step notes..." class="glass-input text-xs leading-relaxed" required></textarea>
              </div>

              <div class="pt-2 flex justify-end gap-2">
                <button id="cancel-custom-modal" type="button" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">Cancel</button>
                <button type="submit" class="px-5 py-2 rounded-xl btn-accent text-white text-xs font-bold shadow-md">Save Card</button>
              </div>
            </form>

          </div>
        </div>

      </div>
    `;
  },

  renderFormulaCard(card) {
    const isFlipped = !!this.flippedCards[card.id];
    return `
      <div class="perspective-1000 min-h-[19rem] cursor-pointer group" data-cardid="${card.id}">
        <div class="relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}">
          <!-- Front -->
          <div class="absolute inset-0 bento-card p-6 flex flex-col justify-between backface-hidden border border-slate-200/70 dark:border-white/[0.08] group-hover:border-[var(--accent-from)]/50 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04] pb-3">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold accent-text uppercase tracking-wider bg-[var(--accent-soft)] px-2.5 py-1 rounded-xl">
                <i class="${card.icon}"></i> ${card.subject}
              </span>
              <span class="text-[10px] font-bold text-amber-500">${card.weightage}</span>
            </div>
            <div class="my-auto py-4">
              <span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">${card.topic}</span>
              <h4 class="font-display font-extrabold text-base text-slate-900 dark:text-white">${card.concept}</h4>
              <div class="mt-4 p-3 rounded-2xl bg-black/5 dark:bg-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 katex-render" data-latex="${card.mathLatex}">
                ${card.mathLatex}
              </div>
            </div>
          </div>
          <!-- Back -->
          <div class="absolute inset-0 bento-card p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#0a0f1d] text-white border border-[var(--accent-from)]/40 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <span class="text-[10px] font-extrabold accent-text uppercase tracking-wider">Formula</span>
              <button class="copy-formula-btn h-7 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold" data-formula="${encodeURIComponent(card.formula)}">Copy</button>
            </div>
            <div class="my-auto overflow-y-auto font-mono text-xs text-slate-200 whitespace-pre-line py-2">${card.formula}</div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.katex) {
      document.querySelectorAll('.katex-render').forEach(elem => {
        const latex = elem.getAttribute('data-latex');
        if (latex) {
          try {
            window.katex.render(latex, elem, { throwOnError: false, displayMode: false });
          } catch (e) {
            console.warn("KaTeX render error:", e);
          }
        }
      });
    }

    const modal = document.getElementById('custom-formula-modal');
    const btnOpen = document.getElementById('btn-open-custom-formula');
    const btnClose = document.getElementById('close-custom-modal');
    const btnCancel = document.getElementById('cancel-custom-modal');
    const form = document.getElementById('custom-formula-form');

    btnOpen?.addEventListener('click', () => modal?.classList.remove('hidden'));
    const closeModal = () => modal?.classList.add('hidden');
    btnClose?.addEventListener('click', closeModal);
    btnCancel?.addEventListener('click', closeModal);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = document.getElementById('custom-subject').value;
      const topic = document.getElementById('custom-topic').value;
      const weightage = document.getElementById('custom-weightage').value;
      const concept = document.getElementById('custom-concept').value;
      const mathLatex = document.getElementById('custom-latex').value;
      const formula = document.getElementById('custom-formula-text').value;

      const newCard = {
        id: 'custom_' + Date.now(),
        isCustom: true,
        subject,
        topic,
        icon: 'fa-solid fa-sparkles',
        weightage,
        concept,
        mathLatex,
        formula
      };

      const existing = JSON.parse(localStorage.getItem('gate_custom_formulas') || '[]');
      existing.push(newCard);
      localStorage.setItem('gate_custom_formulas', JSON.stringify(existing));

      closeModal();
      this.refresh();
    });

    document.querySelectorAll('.formula-sub-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeSubject = btn.getAttribute('data-sub');
        this.refresh();
      });
    });

    // Search input handler
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

    // 3D Card flip handler
    document.querySelectorAll('[data-cardid]').forEach(cardDom => {
      cardDom.addEventListener('click', (e) => {
        // Prevent flip if clicking copy button
        if (e.target.closest('.copy-formula-btn')) return;

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

    // Copy formula to clipboard handler
    document.querySelectorAll('.copy-formula-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const encoded = btn.getAttribute('data-formula');
        const text = decodeURIComponent(encoded);
        navigator.clipboard.writeText(text);
        showToast('Formula copied to clipboard! 📋', 'success');
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
