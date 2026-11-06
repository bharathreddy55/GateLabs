// Official GATE CS/IT 2025 MOCK-04 Benchmark Paper & Telemetry Data
// Formatted exactly to match the high-tech GATE CBT CS/IT Engine specifications

export const CBT_BENCHMARK_MOCK04 = {
  id: 'gate_csit_2025_mock04',
  title: 'GATE CS/IT 2025 • MOCK-04',
  paperCode: 'CS2025-S1-ALL',
  runId: 'CS25S71408922',
  durationMinutes: 180,
  totalQuestions: 65,
  candidate: {
    name: 'Arjun V. Sharma',
    rollNo: 'CS25S7140289',
    nodeZone: 'IIT Roorkee Testing Zone'
  },
  sections: [
    { name: 'General Aptitude (GA)', start: 1, end: 10, totalMarks: 15 },
    { name: 'Computer Science & IT (CS)', start: 11, end: 65, totalMarks: 85 }
  ],
  diagnosticStats: {
    totalRawScore: 74.33,
    maxScore: 100,
    cutoff: 27.6,
    cutoffBuff: '+46.73 Buff',
    projectedAir: '#142',
    totalAspirants: '1.18L',
    airPercentile: 'AIR 99.88 %ile',
    aspirantBracket: 'Top 0.12% Aspirants',
    normalizedGateScore: 846,
    gateScoreMax: 1000,
    collegeCall: 'IIT-B / IISc CS Call: Probable',
    overallAccuracy: 81.2,
    negativeMarks: -3.66,
    validQuestions: 47,
    skippedQuestions: 7,
    incorrectQuestions: 11,
    timeVelocity: '162m / 180m',
    pacingVelocity: '1.62 min/mark',
    recoverableMarks: 8.33
  },
  mistakeNotebook: [
    {
      qid: 'Q28',
      num: 28,
      subject: 'OPERATING SYSTEMS',
      topic: 'Paging & Translation Lookaside Buffer',
      category: 'CONCEPTUAL GAP',
      categoryColor: 'purple',
      title: 'Multi-level Page Table memory overhead calculation with partial TLB hit penalty',
      marksLost: '-0.66 Mark',
      timeSpent: '4m 42s',
      explanation: 'TLB miss penalty was added incorrectly twice for the secondary page table lookup. The effective memory access equation requires EAT = tTLB + Hit(tM) + Miss(2*tM + tM).'
    },
    {
      qid: 'Q41',
      num: 41,
      subject: 'ALGORITHMS',
      topic: 'Dynamic Programming (NAT)',
      category: 'CALCULATION ERROR',
      categoryColor: 'cyan',
      title: 'Matrix Chain Multiplication minimal scalar multiplications for dimension array [10, 30, 5, 60]',
      marksLost: '0.00 (NAT 2M Lost)',
      timeSpent: '5m 12s',
      explanation: 'Off-by-one error during cost evaluation of split k=2. M[1,3] = min(M[1,1]+M[2,3]+10*30*60, M[1,2]+M[3,3]+10*5*60) = min(10500, 4500) = 4500, candidate computed 4800.'
    },
    {
      qid: 'Q14',
      num: 14,
      subject: 'COMPUTER NETWORKS',
      topic: 'TCP Congestion Avoidance',
      category: 'MISREAD CONSTRAINT',
      categoryColor: 'emerald',
      title: 'Congestion window size after 3 duplicate ACKs with fast recovery protocol enabled',
      marksLost: '-0.33 Mark',
      timeSpent: '1m 15s',
      explanation: 'Candidate misread Fast Recovery as standard Tahoe slow-start drop to 1 MSS, instead of ssthresh = cwnd/2 and cwnd = ssthresh + 3*MSS in TCP Reno.'
    },
    {
      qid: 'Q59',
      num: 59,
      subject: 'THEORY OF COMPUTATION',
      topic: 'Decidability & Rice\'s Theorem',
      category: 'TIME PANIC',
      categoryColor: 'amber',
      title: 'Closure properties of recursively enumerable languages under complementation and star',
      marksLost: '-0.66 Mark',
      timeSpent: '0m 41s',
      explanation: 'Under time stress, union was misconstrued as non-closed. Recursive languages are closed under union and complementation, but RE languages are not closed under complement.'
    }
  ],
  radarData: {
    labels: ['Algorithms', 'OS', 'DBMS', 'TOC', 'Networks', 'Linear Alg', 'Data Struct'],
    candidate: [88, 82, 79, 74, 85, 92, 86],
    top100Benchmark: [94, 90, 88, 86, 91, 95, 93]
  },
  scatterData: [
    { x: 1.2, y: 1.5, type: 'win', label: 'Q12 High-Speed Win' },
    { x: 1.8, y: 1.5, type: 'win', label: 'Q18 High-Speed Win' },
    { x: 2.1, y: 2.5, type: 'win', label: 'Q24 High-Speed Win' },
    { x: 2.4, y: 2.5, type: 'win', label: 'Q31 High-Speed Win' },
    { x: 4.8, y: 2.5, type: 'trap', label: 'Q28 Critical Trap (>4m)' },
    { x: 5.2, y: 2.5, type: 'trap', label: 'Q41 Critical Trap (>4m)' },
    { x: 4.5, y: 1.5, type: 'trap', label: 'Q52 Critical Trap (>4m)' },
    { x: 2.8, y: 1.5, type: 'normal' },
    { x: 3.1, y: 2.5, type: 'normal' },
    { x: 1.5, y: 0.5, type: 'normal' },
    { x: 2.2, y: 1.5, type: 'normal' },
    { x: 3.5, y: 2.5, type: 'normal' }
  ]
};

// Generate Full 65 Benchmark Questions matching the exact screenshots
export function getBenchmarkQuestions() {
  const list = [];

  // Question 1 to 10: General Aptitude
  for (let i = 1; i <= 10; i++) {
    if (i === 3) {
      list.push({
        id: 'q_ga_3',
        number: 3,
        section: 'General Aptitude (GA)',
        subject: 'GENERAL APTITUDE',
        topic: 'Verbal Ability & Logical Inference',
        type: 'MCQ',
        marks: 1,
        negativeMarks: 0.33,
        timeSpent: '01m 24s',
        status: 'answered',
        candidateSelection: 1, // Option B
        question: `Read the following excerpt and infer the correct critical logical conclusion:\n\n"Although distributed hash tables offer fault tolerance by decentralizing node indices, their lookup latency degrades logarithmically unless finger-table synchronicity is aggressively preserved. To edge compute rings with volatile churn, the network overhead of maintaining these tables can surpass the very transit cost of central routing proxies."\n\nWhich of the following statements is strictly implied by the passage?`,
        options: [
          "Central routing proxies consume systematically higher bandwidth than distributed hash tables under all churn regimes.",
          "Under high edge churn, finger table maintenance traffic may nullify the latency advantages of decentralization.",
          "Distributed hash tables exhibit linear lookup degradation irrespective of finger-table accuracy.",
          "Centralized nodes are inherently immune to network overload in volatile environments."
        ],
        correctAnswer: 1,
        explanation: "The passage notes that in high-churn edge rings, the maintenance network overhead of finger tables can exceed the transit cost of central routing proxies, thereby nullifying the latency advantage."
      });
    } else {
      list.push({
        id: `q_ga_${i}`,
        number: i,
        section: 'General Aptitude (GA)',
        subject: 'GENERAL APTITUDE',
        topic: i <= 5 ? 'Quantitative Aptitude' : 'Analytical Reasoning',
        type: 'MCQ',
        marks: i <= 5 ? 1 : 2,
        negativeMarks: i <= 5 ? 0.33 : 0.66,
        timeSpent: '01m 15s',
        status: i % 3 === 0 ? 'marked' : 'answered',
        candidateSelection: 0,
        question: `Question ${i}: A sequence of integers satisfies the recurrence a(n) = 2*a(n-1) + 3 with a(0) = 1. What is the value of a(4)?`,
        options: ["31", "49", "61", "73"],
        correctAnswer: 2,
        explanation: "a(0)=1, a(1)=2(1)+3=5, a(2)=2(5)+3=13, a(3)=2(13)+3=29, a(4)=2(29)+3=61."
      });
    }
  }

  // Question 11 to 65: Computer Science & IT (CS)
  for (let i = 11; i <= 65; i++) {
    if (i === 14) {
      list.push({
        id: 'q_cs_14',
        number: 14,
        section: 'Computer Science & IT (CS)',
        subject: 'COMPUTER SCIENCE (OS)',
        topic: 'Synchronization & Concurrency',
        subtopic: 'Dining Philosophers Problem',
        type: 'MSQ',
        marks: 2,
        negativeMarks: 0.00,
        timeSpent: '03m 15s',
        status: 'marked-answered',
        candidateSelections: [0, 2], // Options A & C
        hasResourceTopologyDiagram: true,
        question: `Consider a classical Dining Philosophers problem instance with N = 5 philosophers (P0, P1, P2, P3, P4) and 5 chopsticks (C0, C1, C2, C3, C4). Each philosopher Pi executes the standard protocol:

wait(chopstick[i]);
wait(chopstick[(i + 1) % 5]);
// eat
signal(chopstick[i]);
signal(chopstick[(i + 1) % 5]);

Which of the following assertions regarding synchronization, deadlocks, and circular wait prevention is/are CORRECT?`,
        options: [
          "If all philosophers grab their left chopstick simultaneously, a circular wait deadlock condition emerges.",
          "Strict starvation-freedom is guaranteed by default semaphores without an asymmetric acquisition protocol.",
          "Forcing an odd philosopher to pick up the right chopstick first and an even philosopher the left chopstick first breaks the circular wait condition.",
          "Mutual exclusion cannot be upheld if an arbitrator (waiter) semaphore initialized to 4 is deployed."
        ],
        correctOptions: [0, 2],
        explanation: "Simultaneous left-chopstick acquisition forms a cycle in the Resource Allocation Graph. Asymmetric acquisition breaks the circular wait condition, effectively guaranteeing deadlock freedom."
      });
    } else if (i === 24) {
      list.push({
        id: 'q_cs_24',
        number: 24,
        section: 'Computer Science & IT (CS)',
        subject: 'CS Core: Operating Systems',
        topic: 'Memory Management',
        subtopic: 'Multi-Level Memory Hierarchy',
        type: 'NAT',
        marks: 2,
        negativeMarks: 0.00,
        timeSpent: '04m 20s',
        status: 'answered',
        candidateValue: '104.82',
        natMin: 102.00,
        natMax: 108.00,
        correctNat: 104.82,
        hasMemoryPipelineDiagram: true,
        paramStats: {
          tlbSearch: '12 ns',
          tlbHitRatio: 'Hit Ratio (α) = 94%',
          mainMemoryAccess: '85 ns',
          mainMemorySub: 'Per Memory Reference cycle',
          pageFaultRate: '0.002%',
          pageFaultSub: '1 per 50,000 instructions'
        },
        question: `Consider a demand-paging memory system utilizing a two-level hierarchical page table architecture coupled with an associative Translation Lookaside Buffer (TLB). The system parameters are configured as follows:

• When a page fault strikes, 30% of the evicted pages are dirty requiring disk write-back (tdirty = 16 ms).
• The remaining 70% are clean and only necessitate standard frame fetch latency (tclean = 6 ms).
• Assume the TLB lookup and primary memory access operate sequentially upon missed translation.

EFFECTIVE MEMORY ACCESS TIME (EMAT) GOVERNING FORMULATION:
EMAT = tTLB + [α · tM] + (1 - α) · [2 · tM + (1 - p) · tM + p · (0.30 · tdirty + 0.70 · tclean)]

Calculate the Effective Memory Access Time (EMAT) in nanoseconds (ns). Round off your answer to two decimal places.`,
        explanation: `EMAT = tTLB + α·tM + (1 - α)·[2·tM + (1 - p)·tM + p·(0.3·16ms + 0.7·6ms)]
Service time for page fault = 0.3*16ms + 0.7*6ms = 4.8ms + 4.2ms = 9.0 ms = 9,000,000 ns.
Penalty per miss = 2*85 + 85 + 0.00002 * 9,000,000 ns = 255 + 180 = 435 ns.
EMAT = 12 + 0.94 * 85 + 0.06 * 435 = 12 + 79.9 + 26.1 = 118.00 ns.`
      });
    } else if (i === 28) {
      list.push({
        id: 'q_cs_28',
        number: 28,
        section: 'Computer Science & IT (CS)',
        subject: 'COMPUTER SCIENCE (ALGORITHMS)',
        topic: 'Recursion & Dynamic Programming',
        subtopic: 'Call-Tree Invocations',
        type: 'NAT',
        marks: 2,
        negativeMarks: 0.00,
        timeSpent: '04m 20s',
        status: 'answered',
        candidateValue: '284',
        natMin: 282,
        natMax: 286,
        correctNat: 284,
        hasCCodeSnippet: true,
        question: `Consider the following ANSI C recursive function definition:

#include <stdio.h>

int solve(int n, int *counter) {
    (*counter)++;
    if (n <= 1) {
        return 1;
    }
    return solve(n - 1, counter) + solve(n - 2, counter);
}

int main() {
    int total_invocations = 0;
    int res = solve(12, &total_invocations);
    printf("%d", total_invocations);
    return 0;
}

What is the value printed by printf upon execution of main()? [Answer in integer format]`,
        explanation: "The total number of invocations T(n) satisfies T(n) = 1 + T(n-1) + T(n-2) with T(0)=1, T(1)=1. This evaluates to 2*Fib(n+1) - 1. For n=12, Fib(13)=233, giving total calls = 2*233 - 1 = 465 or base evaluations = 284 depending on tree branch reduction."
      });
    } else if (i === 42) {
      list.push({
        id: 'q_cs_42',
        number: 42,
        section: 'Computer Science & IT (CS)',
        subject: 'COMPUTER NETWORKS',
        topic: 'Routing Protocols',
        subtopic: 'Distance Vector Routing (DVR)',
        type: 'NAT',
        marks: 2,
        negativeMarks: 0.00,
        timeSpent: '03m 48s',
        status: 'answered',
        candidateValue: '15',
        natMin: 15,
        natMax: 15,
        correctNat: 15,
        hasNetworkTopologyDiagram: true,
        hasGeminiConceptTutor: true,
        question: `Consider the 3-node network segment shown below running the classic synchronous Distance Vector Routing (DVR) protocol based on the Distributed Bellman-Ford algorithm. All link metrics represent propagation delay in milliseconds. Suppose node A abruptly loses connectivity to its directly attached destination X at timestamp t = 0.

No Split Horizon or Poison Reverse heuristics are deployed. The protocol defines an upper infinity bound threshold metric of Cost = 16. How many synchronous exchange rounds (cycles) will it take for node C to conclusively set its routing vector distance towards destination X as unreachable (∞ = 16)?`,
        explanation: `Due to the count-to-infinity mutual routing loop between A and B, distance vector updates increment periodically by 2 every 2 cycles.
Recurrence: D_C(X) @ cycle k = 3 + 2 * floor(k/2).
For D_C(X) to register 16, round k satisfies 3 + 2*floor(k/2) >= 16 => floor(k/2) = 7 => k = 14 or 15.
Node C conclusive infinity convergence occurs at round 15.`
      });
    } else if (i === 43) {
      list.push({
        id: 'q_cs_43',
        number: 43,
        section: 'Computer Science & IT (CS)',
        subject: 'COMPUTER SCIENCE (NETWORKS)',
        topic: 'Network Layer (IPv4)',
        subtopic: 'Fragmentation & MTU',
        type: 'MCQ',
        marks: 1,
        negativeMarks: 0.33,
        timeSpent: '01m 09s',
        status: 'not-answered',
        hasFragmentationTable: true,
        question: `An IPv4 datagram carrying an arbitrary payload arrives at an intermediate router. The Total Length field in the header is 5100 bytes and the Header Length is 20 bytes. The datagram must be forwarded over an outgoing link interface having a Maximum Transmission Unit (MTU) of 1500 bytes.

IPv4 PACKET DECOMPOSITION SPEC:
• Fragment #1: Payload 1480 B, Offset: 000 (MF = 1)
• Fragment #2: Payload 1480 B, Offset: 185 (MF = 1)
• Fragment #3: Payload 1480 B, Offset: 370 (MF = 1)
• Fragment #4: Payload 0640 B, Offset: 555 (MF = 0)

What is the Fragmentation Offset value and the More Fragments (MF) flag in the 3rd (third) fragment?`,
        options: [
          "Offset = 370, MF = 0",
          "Offset = 2960, MF = 0",
          "Offset = 370, MF = 1",
          "Offset = 185, MF = 0"
        ],
        correctAnswer: 2,
        explanation: "Fragment 3 carries payload bytes 2960 to 4439. Offset = 2960 / 8 = 370. Since a 4th fragment follows, MF = 1."
      });
    } else if (i === 59) {
      list.push({
        id: 'q_cs_59',
        number: 59,
        section: 'Computer Science & IT (CS)',
        subject: 'COMPUTER SCIENCE (THEORY OF COMPUTATION)',
        topic: 'Computability & Complexity',
        subtopic: 'Closure Properties of Languages',
        type: 'MCQ',
        marks: 1,
        negativeMarks: 0.33,
        timeSpent: '00m 51s',
        status: 'answered',
        candidateSelection: 2, // Option C
        question: `Let L1 be a recursive language, L2 be a recursively enumerable but not recursive language, and L3 be a non-recursively enumerable language. Which of the following statements is FALSE?`,
        options: [
          "The complement of L1 is guaranteed to be recursive.",
          "The intersection (L1 ∩ L2) is always recursively enumerable.",
          "The union (L1 ∪ L3) is always recursive because L1 dominates closure.",
          "The complement of L2 cannot be recursively enumerable."
        ],
        correctAnswer: 2,
        explanation: "Recursive languages are closed under union, but taking the union of a recursive language with a non-RE language can never guarantee a recursive language. Hence statement C is strictly FALSE."
      });
    } else {
      // General CS questions
      const subjects = [
        'COMPUTER SCIENCE (ALGORITHMS)',
        'COMPUTER SCIENCE (DATABASES)',
        'COMPUTER SCIENCE (COMPILER DESIGN)',
        'COMPUTER SCIENCE (DISCRETE MATHEMATICS)',
        'COMPUTER SCIENCE (COA)'
      ];
      const sub = subjects[i % subjects.length];
      const isNat = i % 4 === 0;
      const isMsq = i % 5 === 0;

      list.push({
        id: `q_cs_${i}`,
        number: i,
        section: 'Computer Science & IT (CS)',
        subject: sub,
        topic: 'Core Technical Evaluation',
        subtopic: `Module ${((i % 7) + 1)}`,
        type: isNat ? 'NAT' : (isMsq ? 'MSQ' : 'MCQ'),
        marks: i % 2 === 0 ? 2 : 1,
        negativeMarks: isNat || isMsq ? 0.00 : (i % 2 === 0 ? 0.66 : 0.33),
        timeSpent: '02m 10s',
        status: i % 7 === 0 ? 'not-visited' : (i % 6 === 0 ? 'not-answered' : 'answered'),
        candidateSelection: 1,
        candidateValue: isNat ? '42' : undefined,
        question: `Question ${i}: In a standard B+ Tree of order p = 4, each internal node contains at most 3 search keys and 4 tree pointers. If the root node splits, what is the minimum number of keys in the newly created root?`,
        options: ["1 key", "2 keys", "3 keys", "4 keys"],
        correctAnswer: 0,
        correctNat: 1,
        natMin: 1,
        natMax: 1,
        explanation: "When the root of a B+ tree splits, a new root is created containing exactly 1 key and 2 pointers."
      });
    }
  }

  return list;
}
