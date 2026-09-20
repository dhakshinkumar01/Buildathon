import domainAgenticAi from '../assets/domain-agentic-ai.webp';
import domainSmartCities from '../assets/domain-smart-cities.webp';
import domainEdtech from '../assets/domain-edtech.webp';
import domainFintech from '../assets/domain-fintech.webp';
import domainAgritech from '../assets/domain-agritech.webp';

export const CHALLENGES = [
  {
    id: '01',
    name: 'Agentic AI & Automation',
    short: 'AGENTIC AI',
    title: 'DOMAIN 1 - AGENTIC AI & AUTOMATION',
    desc: 'Build intelligent AI agents that can perform multi-step tasks, make decisions, recover from failures, verify information and improve future execution.',
    image: domainAgenticAi,
    tag: 'AUTONOMOUS AGENTS',
    about: 'Build intelligent AI agents that can perform multi-step tasks, make decisions during execution, recover from failures, handle permissions securely, verify conflicting information and learn from previous execution results.',
    realWorld: 'AI automation systems can fail when a step times out, returns invalid data or loses access to a dependency. Agents also need controlled authorization and reliable decision-making.',
    whatToBuild: 'Create intelligent agent-based systems that can execute tasks, make decisions, recover from failures, verify information and improve future execution.',
    problemStatements: [
      {
        code: 'AG01',
        title: 'The Agent That Proves It Did the Right Thing',
        desc: 'When an autonomous agent completes a multistep task, teams and auditors cannot tell whether it actually followed the correct steps or simply produced plausible output. The same agent run twice can take different paths, making failures impossible to reproduce and debug. Build a deterministic record and replay harness that wraps a tool calling agent (a scripted or simple LLM driven agent is fine), captures every tool call, input, and output as a signed, hash chained trace, and can rerun the exact same trajectory offline with mocked tools so results are byte for byte reproducible. The system must detect and flag nondeterminism (a replay that diverges from the recorded trace), redact secrets from stored traces, and produce a verifiable trajectory report showing which steps passed a set of task completion assertions. Demonstrate on at least three tasks where a tool returns a different result on replay and show the harness catches the divergence, and show that editing a stored trace is detected. Success is judged on reproducibility, divergence detection, and tamper evidence of the trace, not on the agent’s own accuracy.',
        skills: ['Agent orchestration', 'deterministic testing/record replay', 'serialization', 'hashing/signing', 'Python or equivalent']
      },
      {
        code: 'AG02',
        title: 'The Agent With an Undo Button',
        desc: 'Agents that take real actions (booking a room, charging a card, creating a ticket, emailing a customer) often fail halfway through a multistep task, leaving systems in a half finished state that nobody can safely clean up. Build a transactional execution layer for tool calling agents, in the spirit of the saga pattern, where every side effecting tool declares how it can be compensated (undone) or that it cannot be undone. Given a multistep plan, the layer must order steps sensibly (irreversible steps go last or behind an approval), and when any step fails it must roll back the completed steps in reverse order using their compensating actions. It must keep a durable log so that a crash mid run can be recovered by resuming or rolling back without repeating any side effect, and it must raise a clear alert when a rollback itself fails. Demonstrate on at least three multistep workflows with mocked tools and faults injected at every step position, showing the mocked world ends either fully complete or fully restored. Judges evaluate rollback correctness under injected failures and crashes, handling of irreversible actions, and the clarity of the compensation model, not the agent’s intelligence.',
        skills: ['Workflow/saga design', 'idempotency', 'durable logging', 'fault injection', 'API design']
      },
      {
        code: 'AG03',
        title: 'The Agent That Survives a Poisoned Tool (HARD)',
        desc: 'In multiagent and tool using systems, a single compromised tool, web page, or email can hijack the whole workflow, as shown by EchoLeak (CVE-2025-32711), a zero click prompt injection exploit in which a single crafted email, with no user interaction, could cause an enterprise AI assistant to access internal files and exfiltrate their contents to an attacker controlled server. Filtering suspicious phrases does not solve this, because injected instructions can be reworded endlessly. Build a defensive orchestrator based on information flow control rather than keyword detection: the plan of tool calls is produced from the user’s request alone, every value returned by a tool carries a provenance label that survives transformations such as extraction and concatenation, and sensitive tools (sending email, transferring money, reading internal files) enforce a policy on where their arguments are allowed to come from. A tool that suddenly asks for data unrelated to the task must be blocked and raise an alert rather than be obeyed. Demonstrate on at least five legitimate multitool tasks and at least five attacks, including one that reaches a sensitive tool through a reworded or multihop path, using a scripted or LLM driven agent with mocked tools, and report attack success rate and task completion rate against an undefended baseline. Judges evaluate containment under reworded and multihop attacks, how much legitimate work still completes (overblocking is penalized), and the clarity of the trust model.',
        skills: ['Information flow/taint tracking', 'multiagent orchestration', 'LLM security', 'policy design', 'threat modeling']
      },
      {
        code: 'AGOPEN',
        title: 'Open Problem Statement',
        desc: 'Have a problem in this domain that is not listed? Choose your own. Any problem about AI agents that plan, call tools, and act for people or organizations (such as their reliability, safety, evaluation, memory, cost, coordination, or the automation of real workflows) is in scope. The problem must stay inside this domain: projects that belong to another domain, or that are only a generic app, chatbot, or dashboard, are not accepted. Before building begins, write a short brief (half a page) and get it confirmed by an organizer or mentor: the problem and who it affects, the core behavior you will build, a baseline or naive approach to beat, one stress or edge case, and the metric you will report. Demonstrate a working prototype on public, synthetic, or simulated data that reports the metric against the baseline, shows the edge case, and states its limits honestly. Judges apply the same criteria as for the listed problems, measured against your own brief, and reward a well scoped problem done properly over an ambitious one left half built.',
        skills: ['Problem scoping and framing', 'prototyping', 'evaluation design', 'plus whatever the chosen problem requires']
      }
    ]
  },
  {
    id: '02',
    name: 'Smart Cities & Urban Intelligence',
    short: 'SMART CITIES',
    title: 'DOMAIN 2 - SMART CITIES & URBAN INTELLIGENCE',
    desc: 'Create intelligent urban systems that improve emergency response, resource allocation, mobility management and predictive infrastructure maintenance.',
    image: domainSmartCities,
    tag: 'URBAN TECH',
    about: 'Build intelligent urban systems that improve emergency response, allocate limited city resources, manage contested road space and predict infrastructure failures.',
    realWorld: 'Cities must respond to emergencies while dealing with traffic, limited resources, road constraints and aging infrastructure.',
    whatToBuild: 'Create dynamic systems that can react to changing city conditions and make intelligent decisions in real time.',
    problemStatements: [
      {
        code: 'SC01',
        title: 'Why Three Buses Arrive at Once',
        desc: 'On a busy bus line, one bus runs slightly late, picks up more passengers, falls further behind, and the bus behind it catches up, until three buses arrive together, followed by a long gap. This bus bunching inflates waiting times without adding any capacity. Build a realtime control system that keeps buses evenly spaced using only levers operators actually have: holding a bus at a stop, skipping a stop, or limiting boarding. Simulate a single looping bus line with random passenger arrivals, variable boarding times, and traffic delays, and implement a controller that decides at each stop whether and how long to hold a bus based on the gaps to the buses ahead and behind. Demonstrate the measured average passenger waiting time and headway regularity (for example the coefficient of variation of headways) against a no control baseline and a fixed timetable baseline, including a disruption in which one bus is delayed by an incident and the line must recover. Judges evaluate the soundness of the simulation, the controller’s effect on the metrics, and the tradeoff between shorter waits and the extra in vehicle time imposed on passengers held on board, not UI polish.',
        skills: ['Discrete event/agent based simulation', 'control logic', 'metrics design', 'data visualization']
      },
      {
        code: 'SC02',
        title: 'Evacuate Without Gridlock (HARD)',
        desc: 'When a flood, wildfire, or chemical leak forces an evacuation, sending everyone down the shortest route at once turns roads into parking lots, and the last people out are the ones who needed the most time. Build an evacuation planner that, given a road network with segment capacities and travel times, populations at origin zones, and shelters with limited capacity, computes a plan (which share of each zone leaves when and by which route) that minimizes the time until the last person is safe. The planner must reason about time and congestion (for example with a time expanded flow model or an equivalent method), respect shelter capacities, and support staged departures. It must replan mid evacuation when a road segment becomes blocked, starting from where everyone currently is rather than from scratch. Demonstrate on a synthetic city graph of at least a few dozen nodes, running every plan through the same simple queue based traffic simulator, and report total clearance time and average evacuation time against an everyone leaves now shortest path baseline, including at least one mid evacuation road closure. Judges evaluate plan optimality and feasibility (no segment or shelter over capacity), the quality of the congestion model, and the replanning behavior, not visual polish.',
        skills: ['Network flow/time expanded graphs', 'optimization (LP/min cost flow)', 'traffic simulation', 'replanning', 'graph algorithms']
      },
      {
        code: 'SCOPEN',
        title: 'Open Problem Statement',
        desc: 'Have a problem in this domain that is not listed? Choose your own. Any problem about the systems that make a city work (such as mobility and transit, traffic, water and power networks, waste, public safety, emergency response, air quality, and city planning) is in scope. The problem must stay inside this domain: projects that belong to another domain, or that are only a generic app, chatbot, or dashboard, are not accepted. Before building begins, write a short brief (half a page) and get it confirmed by an organizer or mentor: the problem and who it affects, the core behavior you will build, a baseline or naive approach to beat, one stress or edge case, and the metric you will report. Demonstrate a working prototype on public, synthetic, or simulated data that reports the metric against the baseline, shows the edge case, and states its limits honestly. Judges apply the same criteria as for the listed problems, measured against your own brief, and reward a well scoped problem done properly over an ambitious one left half built.',
        skills: ['Problem scoping and framing', 'prototyping', 'evaluation design', 'plus whatever the chosen problem requires']
      }
    ]
  },
  {
    id: '03',
    name: 'EdTech & Future of Learning',
    short: 'EDTECH',
    title: 'DOMAIN 3 - EDTECH & FUTURE OF LEARNING',
    desc: 'Build personalized learning systems that identify skill gaps, misconceptions, student struggles and improve learning outcomes.',
    image: domainEdtech,
    tag: 'NEXT-GEN LEARNING',
    about: 'Create intelligent learning systems that understand student needs, identify skill gaps and misconceptions, detect disengagement and improve academic scheduling.',
    realWorld: 'Students may struggle because they lack prerequisite skills, misunderstand concepts or gradually disengage without receiving timely support.',
    whatToBuild: 'Build personalized learning and education-support systems that analyze learner information and provide useful, explainable interventions.',
    problemStatements: [
      {
        code: 'ED01',
        title: 'Detect the Misconception, Not the Wrong Answer',
        desc: 'Two students can get the same question wrong for completely different reasons (one has a deep misconception, the other made a careless slip), and grading them identically wastes the misconception student’s time. Build a system that analyzes wrong answers (the specific wrong option chosen in a multiple choice question) to distinguish a systematic misconception from a random slip, identifies which misconception it is, selects or writes a targeted followup question that discriminates between hypotheses, and retests to confirm. The system must avoid overdiagnosing (flagging slips as misconceptions) and quantify its confidence. Demonstrate on a small question bank (for example, fractions or algebra) where wrong options map to known misconceptions, using simulated students with injected slips, showing it correctly separates “slip” cases from “misconception” cases and that the followup question actually discriminates. Judges evaluate diagnostic precision and recall on misconceptions, the discriminating question logic, and calibration.',
        skills: ['Diagnostic modeling', 'Bayesian reasoning/hypothesis testing', 'item response concepts', 'evaluation design']
      },
      {
        code: 'ED02',
        title: 'Review What You Are About to Forget',
        desc: 'Students forget most of what they learn unless it is revisited at the right moment, yet a fixed review schedule wastes time on material they already know and reaches the shaky items too late. Build a spaced repetition scheduler that each day chooses which items a learner should review, within a limited daily time budget, so that long term retention is as high as possible. The scheduler must estimate how quickly each learner forgets each item from their past review results, update those estimates online, and prioritize the items closest to being forgotten. It must handle realistic disruptions (a learner who skips several days and returns to a large backlog, and items of very different difficulty) and stay stable rather than overreacting to one lucky or unlucky recall. Demonstrate on simulated learners whose true forgetting curves are hidden from the scheduler, reporting average retention on a final test day and the number of reviews used, versus a fixed interval schedule and a random review baseline, and show the backlog scenario. Judges evaluate the forgetting model, the scheduling logic under a fixed daily budget, and robustness to disruptions, not the number of ML tricks used.',
        skills: ['Memory/forgetting models', 'online estimation', 'scheduling under a budget', 'simulation', 'evaluation design']
      },
      {
        code: 'ED03',
        title: 'The Autograder That Fixes and Explains (HARD)',
        desc: 'Grading programming assignments by running hidden tests tells a student they failed but not why or how close they were, and manual feedback does not scale. Build an autograder (single function Python problems are fine) that, given a student’s buggy program, generates targeted test cases that expose the fault, localizes it to a specific line or expression, searches for the smallest change that makes the program pass (program repair), and produces layered feedback (from a hint about the failing block up to the corrected line) without simply handing over the full solution. The system must handle submissions that do not parse or that crash or loop forever, resist reward hacking (a student hardcoding expected outputs should be caught), and grade against a reference behavior rather than exact text match. Demonstrate on at least three problems with at least five buggy submissions each (write them yourselves, covering off by one errors, wrong operators, and missed edge cases), reporting fault localization accuracy and repair success rate, and show it catches at least one gaming attempt. Judges evaluate repair and localization correctness, feedback quality and leveling, and robustness to gaming.',
        skills: ['Program analysis/automated repair', 'test generation', 'compilers/parsing', 'feedback design']
      },
      {
        code: 'EDOPEN',
        title: 'Open Problem Statement',
        desc: 'Have a problem in this domain that is not listed? Choose your own. Any problem about teaching, learning, assessment, or the running of schools and colleges (such as personalization, feedback, exam integrity, accessibility, scheduling, and student support) is in scope. The problem must stay inside this domain: projects that belong to another domain, or that are only a generic app, chatbot, or dashboard, are not accepted. Before building begins, write a short brief (half a page) and get it confirmed by an organizer or mentor: the problem and who it affects, the core behavior you will build, a baseline or naive approach to beat, one stress or edge case, and the metric you will report. Demonstrate a working prototype on public, synthetic, or simulated data that reports the metric against the baseline, shows the edge case, and states its limits honestly. Judges apply the same criteria as for the listed problems, measured against your own brief, and reward a well scoped problem done properly over an ambitious one left half built.',
        skills: ['Problem scoping and framing', 'prototyping', 'evaluation design', 'plus whatever the chosen problem requires']
      }
    ]
  },
  {
    id: '04',
    name: 'FinTech & Digital Economy',
    short: 'FINTECH',
    title: 'DOMAIN 4 - FINTECH & DIGITAL ECONOMY',
    desc: 'Develop intelligent financial systems for fraud detection, risk analysis, reliable payments and cash-flow forecasting.',
    image: domainFintech,
    tag: 'FINANCIAL TECH',
    about: 'Build intelligent financial systems that detect coordinated fraud, explain risk decisions, prevent duplicate payments and identify cash-flow pressure.',
    realWorld: 'Financial problems are often difficult to detect when individual transactions appear legitimate or when payment networks behave unpredictably.',
    whatToBuild: 'Create transparent and reliable financial intelligence systems that detect patterns, explain decisions and handle payment failures safely.',
    problemStatements: [
      {
        code: 'FT01',
        title: 'The Fraud That Hides in Time',
        desc: 'Money laundering rings do not look suspicious account by account; the signal is in the shape and timing of money moving through many accounts: fan in/fan out, rapid pass through, and circular flows that only appear when you look at the temporal graph. Build a system that ingests a stream of transactions as a time evolving graph and detects at least two laundering motifs (for example time ordered cycles and rapid pass through or smurfing patterns) while respecting temporal order, so a cycle only counts if money flowed in the right time sequence. The system must stay fast on a graph of at least tens of thousands of transactions, resist evasion (splitting amounts, adding delays), and rank alerts by suspiciousness with an explanation of the pattern found. Demonstrate on a synthetic generator with injected laundering patterns (or a public AML dataset such as the IBM synthetic AML datasets or the Elliptic Bitcoin dataset), reporting precision and recall on labeled laundering versus a nontemporal baseline, and show it catches an evasion variant. Judges evaluate temporal motif correctness, speed on a larger graph, and evasion resistance.',
        skills: ['Temporal/graph algorithms', 'streaming data', 'pattern mining', 'anomaly detection', 'scalability engineering']
      },
      {
        code: 'FT02',
        title: 'Route the Payment, Survive the Outage',
        desc: 'Online businesses connect to several payment processors, each cheaper or more reliable in different regions and for different card types, until one has a partial outage and thousands of payments quietly fail. Build a payment routing engine that decides, for every incoming transaction, which processor to send it to. It must learn each processor’s success rate and cost from live outcomes, balance exploring alternatives against exploiting the current best, and detect degradation quickly enough to stop sending traffic to a failing processor and probe it for recovery. On a soft decline it must retry through a different processor without ever charging the customer twice (using idempotency keys), and it must respect per processor constraints such as supported currencies and volume caps. Demonstrate on a simulated transaction stream with at least three processors whose success rates change over time, including a sudden outage and a slow degradation, and report authorization rate, cost per successful payment, and time to detect the outage versus a static primary with failover baseline and a round robin baseline. Judges evaluate adaptation to changing conditions, the explore/exploit logic, and correctness of the retry and no double charge guarantee.',
        skills: ['Bandit/online learning', 'change detection', 'simulation', 'idempotency', 'metrics design']
      },
      {
        code: 'FT03',
        title: 'One Charge, No Matter How Many Times the Network Lies (HARD)',
        desc: 'In real payment systems, networks drop, clients retry, queues redeliver, and webhooks arrive twice, yet the customer must be charged exactly once and the ledger must always balance. Build a payment processing engine that guarantees exactly once effect on an append only, double entry ledger (an embedded database such as SQLite is fine) under duplicate, out of order, and adversarially replayed events, using client supplied idempotency keys (including rejecting a reused key that arrives with a different amount) and a reconciliation process that detects and repairs mismatches against a mocked external processor’s records. The engine must survive a crash between “processor succeeded” and “ledger written” without losing or duplicating money. Demonstrate with a chaos test that injects duplicates, reordering, and a mid write crash, then verifies with automated invariant checks that the ledger is correct afterward: every transaction’s entries sum to zero, each idempotency key has exactly one effect, and ledger totals match the processor’s records. Judges evaluate correctness under adversarial event streams, crash recovery, and reconciliation; money must never be created or destroyed.',
        skills: ['Distributed systems', 'idempotency/exactly once semantics', 'transactional/ledger design', 'fault injection', 'reconciliation']
      },
      {
        code: 'FTOPEN',
        title: 'Open Problem Statement',
        desc: 'Have a problem in this domain that is not listed? Choose your own. Any problem about money and the digital economy (such as payments, lending, fraud and risk, markets, financial inclusion, digital commerce infrastructure, and the correctness and security of financial systems) is in scope. The problem must stay inside this domain: projects that belong to another domain, or that are only a generic app, chatbot, or dashboard, are not accepted. Before building begins, write a short brief (half a page) and get it confirmed by an organizer or mentor: the problem and who it affects, the core behavior you will build, a baseline or naive approach to beat, one stress or edge case, and the metric you will report. Demonstrate a working prototype on public, synthetic, or simulated data that reports the metric against the baseline, shows the edge case, and states its limits honestly. Judges apply the same criteria as for the listed problems, measured against your own brief, and reward a well scoped problem done properly over an ambitious one left half built.',
        skills: ['Problem scoping and framing', 'prototyping', 'evaluation design', 'plus whatever the chosen problem requires']
      }
    ]
  },
  {
    id: '05',
    name: 'AgriTech & FoodTech',
    short: 'AGRITECH',
    title: 'DOMAIN 5 - AGRITECH & FOODTECH',
    desc: 'Create intelligent agriculture and food systems using sensors, computer vision and predictive analytics to improve farming and food supply decisions.',
    image: domainAgritech,
    tag: 'SUSTAINABLE AGRI',
    about: 'Build technology-driven solutions for precision agriculture, crop-health monitoring, food transportation and market-aware agricultural decisions.',
    realWorld: 'Agricultural fields can have different conditions across zones, crop stress can become visible too late, food can spoil during transportation and farmers face changing market demand and prices.',
    whatToBuild: 'Create intelligent agriculture and food systems that use data, sensors, computer vision and predictive analytics to improve decisions and reduce resource or economic loss.',
    problemStatements: [
      {
        code: 'AT01',
        title: 'When the Sensor Lies',
        desc: 'Precision irrigation depends on field sensors, but sensors drift, get stuck, or die, and a control system that blindly trusts a faulty reading will drown or starve a whole zone. Build a zone based irrigation controller that fuses multiple noisy sensor streams, detects when a sensor is faulty (stuck, drifting, or outlier) versus a real field change, and continues to make sound irrigation decisions by falling back on redundant sensors or a physics informed soil moisture model. The controller must degrade gracefully as sensors fail and quantify its confidence in each zone’s estimate. Demonstrate on synthetic or public sensor time series with injected faults, reporting fault detection accuracy and irrigation decision quality (water saved versus crop stress avoided) under increasing sensor failure versus a naive threshold controller. Judges evaluate fault discrimination, robust decision making under failure, and the soil model’s soundness.',
        skills: ['Sensor fusion', 'fault/anomaly detection', 'physics informed/state estimation', 'time series', 'control logic']
      },
      {
        code: 'AT02',
        title: 'Recall Exactly What Is Contaminated',
        desc: 'When a food safety problem is found (a contaminated ingredient or a failed lab test), recalling everything from a supplier is ruinously expensive, while recalling too little makes people ill. The evidence needed to scope a recall is spread across a supply chain in which lots are received, split, blended into other lots, cooked, repackaged, and shipped to stores. Build a traceability engine that models the supply chain as a lot genealogy graph with quantities and timestamps and, given a contamination report at any point in the chain, computes the smallest defensible recall set: every downstream lot that could contain contaminated material, with an estimated contamination fraction after blending, while excluding lots that provably cannot (for example those produced before the contaminated lot arrived). It must also trace backwards from sick customer reports to rank the most likely source lots, and handle missing or late records by widening the recall and stating exactly why. Demonstrate on a synthetic supply chain of at least a few hundred lots with known injected contamination, reporting recall (no contaminated lot missed), precision (unnecessary recalls avoided), and units saved versus a recall the whole supplier baseline. Judges evaluate the time aware lineage logic, the backward tracing ranking, and the handling of missing data.',
        skills: ['Graph algorithms', 'data modeling/provenance', 'simulation', 'ranking', 'explainability']
      },
      {
        code: 'AT03',
        title: 'Deliver Before It Spoils (HARD)',
        desc: 'Delivering perishable produce is not just the shortest route: every extra hour in a warm truck destroys value, and a route that is short in distance can be terrible for freshness. Build a routing engine for perishable goods that plans multistop delivery routes minimizing total spoilage and value loss (a function of time and temperature per item) subject to vehicle capacity and delivery time windows, and reoptimizes the remaining stops when a vehicle breaks down or a road closes mid route. The engine must handle the tradeoff where a longer distance route preserves more value, and an independent checker must verify that every route respects all hard constraints. Demonstrate on instances of 25 to 50 customers (for example Solomon VRPTW instances or a synthetic generator) augmented with perishability, using an off the shelf routing solver or your own heuristic, and report value preserved and constraint compliance versus a distance only routing baseline, including a mid route disruption. Judges evaluate the spoilage aware objective, constraint satisfaction, and dynamic reoptimization.',
        skills: ['Vehicle routing/combinatorial optimization', 'metaheuristics', 'constraint handling', 'simulation', 'OR modeling']
      },
      {
        code: 'ATOPEN',
        title: 'Open Problem Statement',
        desc: 'Have a problem in this domain that is not listed? Choose your own. Any problem about producing, storing, moving, and safely consuming food (such as farming and irrigation, crop and livestock monitoring, soil and weather, post harvest storage, food logistics, food safety, and reducing food waste) is in scope. The problem must stay inside this domain: projects that belong to another domain, or that are only a generic app, chatbot, or dashboard, are not accepted. Before building begins, write a short brief (half a page) and get it confirmed by an organizer or mentor: the problem and who it affects, the core behavior you will build, a baseline or naive approach to beat, one stress or edge case, and the metric you will report. Demonstrate a working prototype on public, synthetic, or simulated data that reports the metric against the baseline, shows the edge case, and states its limits honestly. Judges apply the same criteria as for the listed problems, measured against your own brief, and reward a well scoped problem done properly over an ambitious one left half built.',
        skills: ['Problem scoping and framing', 'prototyping', 'evaluation design', 'plus whatever the chosen problem requires']
      }
    ]
  }
];
