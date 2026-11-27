export const gateFormulaCards = [
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
