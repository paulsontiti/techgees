export type Module = {
  number: number;
  title: string;
  description: string;
  project?: string;
};

export type Phase = {
  slug: string;
  number: string;
  emoji: string;
  title: string;
  subtitle: string;
  promise: string;
  learn: string[];
  build: string[];
  skills: string[];
  outcomes: string[];
  next: string;
  nextSlug: string;
  age: string;
  color: string;
  intro: string;
  modules: Module[];
};

export const phases: Phase[] = [
  {
    slug: "computer-foundations",
    number: "01",
    emoji: "💻",
    title: "Computer Foundations",
    subtitle: "Understand the machine before you command it.",
    promise:
      "Build a strong mental model of computers, operating systems, networks and programming.",
    age: "Ages 8+ when ready",
    color: "from-blue-500/20 to-cyan-400/10",
    intro:
      "Great engineers do not treat computers as magic boxes. This phase helps learners understand what is inside a computer, how software runs, how the operating system works and how code becomes action.",
    modules: [
      {
        number: 1,
        title: "Python Programming Foundations",
        description:
          "Move from concepts to code with variables, control flow, functions, collections and modules.",
      },
      {
        number: 2,
        title: "Inside the Computer",
        description:
          "Discover what a computer is, why it exists and how hardware and software work together.",
      },
      {
        number: 3,
        title: "Binary & Digital Information",
        description:
          "Learn how computers represent numbers, text, images, sound and instructions using bits.",
      },
      {
        number: 4,
        title: "CPU, GPU & Computer Architecture",
        description:
          "Explore the processor, ALU, registers, cache, RAM, GPU and how instructions are executed.",
      },
      {
        number: 5,
        title: "Memory & Storage",
        description:
          "Understand memory hierarchy, RAM, ROM, SSDs, files, storage and why speed differs across layers.",
      },
      {
        number: 6,
        title: "Operating Systems",
        description:
          "Learn what an operating system does and how it manages hardware, applications, users and resources.",
      },
      {
        number: 7,
        title: "Linux & the Command Line",
        description:
          "Build confidence navigating Linux, folders, permissions, commands, pipes and shell workflows.",
      },
      {
        number: 8,
        title: "Processes, Programs & Execution",
        description:
          "Understand programs, processes, threads and what happens when software runs.",
      },
      {
        number: 9,
        title: "Computer Networking Fundamentals",
        description:
          "Learn IP addresses, packets, ports, protocols, DNS and how computers communicate.",
      },
      
      {
        number: 10,
        title: "Virtual Computer Architecture Simulator",
        description:
          "Build a simplified computer simulator that makes CPU, memory and instruction execution visible.",
      },
    ],
    learn: [
      "Computer architecture & binary",
      "Hardware, memory, CPU & GPU",
      "Operating systems & Linux",
      "Files, processes & the command line",
      "Networking fundamentals",
      "Python programming foundations",
    ],
    build: [
      "Virtual computer architecture simulator",
      "Linux command-line projects",
      "Python utilities",
      "File and process tools",
      "Simple networked programs",
    ],
    skills: [
      "Technical curiosity",
      "Command-line confidence",
      "Programming fundamentals",
      "Systems thinking",
    ],
    outcomes: [
      "Explain what happens when a program runs",
      "Navigate a Linux environment",
      "Write useful beginner Python programs",
      "Understand the foundation beneath modern software",
    ],
    next: "Maths & Algorithms",
    nextSlug: "maths-and-algorithms",
  },
  {
    slug: "maths-and-algorithms",
    number: "02",
    emoji: "🧮",
    title: "Maths & Algorithms",
    subtitle: "Learn how great engineers think through problems.",
    promise: "Turn problems into precise steps, structures and algorithms.",
    age: "Progressive",
    color: "from-violet-500/20 to-fuchsia-400/10",
    intro:
      "Programming becomes powerful when learners can reason. This phase develops mathematical intuition, algorithmic thinking and data structures that support everything from software to AI.",
    modules: [
      {
        number: 1,
        title: "Logic & Computational Thinking",
        description:
          "Learn statements, conditions, logical operators and rigorous ways to reason about problems.",
      },
      {
        number: 2,
        title: "Numbers, Functions & Mathematical Models",
        description:
          "Build mathematical intuition for variables, functions, relationships and computational models.",
      },
      {
        number: 3,
        title: "Problem Decomposition",
        description:
          "Turn large problems into smaller, understandable tasks that can be solved and tested independently.",
      },
      {
        number: 4,
        title: "Complexity & Big-O",
        description:
          "Understand time, space and trade-offs so learners can reason about algorithm efficiency.",
      },
      {
        number: 5,
        title: "Arrays, Strings & Hash Tables",
        description:
          "Explore core data structures and learn when each structure is useful.",
      },
      {
        number: 6,
        title: "Stacks, Queues & Linked Structures",
        description:
          "Build and apply structures that organize data around different access patterns.",
      },
      {
        number: 7,
        title: "Trees & Recursion",
        description:
          "Understand hierarchical data, recursive thinking and tree traversal algorithms.",
      },
      {
        number: 8,
        title: "Graphs & Networks",
        description:
          "Model relationships with graphs and explore traversal, paths and connectivity.",
      },
      {
        number: 9,
        title: "Searching, Sorting & Optimization",
        description:
          "Implement classic algorithms and compare their approaches, costs and trade-offs.",
      },
      {
        number: 10,
        title: "Algorithm Visualizer Project",
        description:
          "Build an interactive tool that visualizes data structures, algorithms and their performance.",
      },
    ],
    learn: [
      "Logic & mathematical foundations",
      "Complexity and efficiency",
      "Algorithms",
      "Arrays, stacks, queues & trees",
      "Graphs and searching",
      "Problem-solving patterns",
    ],
    build: [
      "Algorithm visualizers",
      "Sorting and searching tools",
      "Data-structure implementations",
      "Optimization challenges",
      "Algorithmic mini-projects",
    ],
    skills: [
      "Logical reasoning",
      "Decomposition",
      "Efficiency thinking",
      "Pattern recognition",
    ],
    outcomes: [
      "Break complex problems into steps",
      "Choose appropriate data structures",
      "Compare algorithmic approaches",
      "Develop disciplined problem-solving habits",
    ],
    next: "Software Engineering",
    nextSlug: "software-engineering",
  },
  {
    slug: "software-engineering",
    number: "03",
    emoji: "🏗️",
    title: "Software Engineering",
    subtitle: "Move from writing code to engineering software.",
    promise:
      "Learn how reliable, maintainable software is designed, tested and evolved.",
    age: "Progressive",
    color: "from-amber-500/20 to-yellow-400/10",
    intro:
      "Writing code is only one part of software engineering. Learners discover architecture, object-oriented design, testing, version control and the habits used to build software that can grow.",
    modules: [
      {
        number: 1,
        title: "Programming as Engineering",
        description:
          "Move beyond syntax and learn how engineers plan, model and structure software.",
      },
      {
        number: 2,
        title: "Object-Oriented Programming",
        description:
          "Understand objects, classes, composition, inheritance and abstraction through practical systems.",
      },
      {
        number: 3,
        title: "Clean Code & Design Principles",
        description:
          "Learn naming, separation of concerns, cohesion, coupling and maintainable code practices.",
      },
      {
        number: 4,
        title: "Git & Version Control",
        description:
          "Use commits, branches, merges and pull requests to manage software changes safely.",
      },
      {
        number: 5,
        title: "Testing Fundamentals",
        description:
          "Learn unit, integration and end-to-end testing and why automated tests matter.",
      },
      {
        number: 6,
        title: "Debugging & Error Analysis",
        description:
          "Develop a systematic process for finding, explaining and fixing software defects.",
      },
      {
        number: 7,
        title: "Software Architecture",
        description:
          "Explore modules, layers, boundaries, dependencies and architectural trade-offs.",
      },
      {
        number: 8,
        title: "APIs & Service Boundaries",
        description:
          "Design interfaces between software components and understand contracts, validation and errors.",
      },
      {
        number: 9,
        title: "Documentation & Technical Communication",
        description:
          "Learn to explain software through READMEs, diagrams, decisions and technical writing.",
      },
      {
        number: 10,
        title: "Production-Ready Software Project",
        description:
          "Build a tested, documented, multi-module application using professional engineering workflows.",
      },
    ],
    learn: [
      "OOP & design principles",
      "Git & collaborative workflows",
      "Testing & debugging",
      "Architecture & modularity",
      "APIs and software boundaries",
      "Clean code & documentation",
    ],
    build: [
      "Tested applications",
      "Reusable libraries",
      "REST APIs",
      "Multi-module software",
      "Team-style Git projects",
    ],
    skills: [
      "Code quality",
      "Architecture thinking",
      "Testing discipline",
      "Collaboration",
    ],
    outcomes: [
      "Design software before coding",
      "Write maintainable code",
      "Test and debug systematically",
      "Explain architectural decisions",
    ],
    next: "Data & Machine Learning",
    nextSlug: "data-machine-learning",
  },
  {
    slug: "data-machine-learning",
    number: "04",
    emoji: "📊",
    title: "Data & Machine Learning",
    subtitle: "Teach computers to learn from information.",
    promise:
      "Understand data, statistics and machine-learning workflows before jumping into AI hype.",
    age: "Progressive",
    color: "from-emerald-500/20 to-teal-400/10",
    intro:
      "AI starts with data. Learners discover how information is collected, cleaned, represented and used to train models that can make useful predictions.",
    modules: [
      {
        number: 1,
        title: "What Is Data?",
        description:
          "Understand datasets, observations, variables, features, labels and the role of data in computing.",
      },
      {
        number: 2,
        title: "Python for Data",
        description:
          "Use Python tools to load, inspect, transform and analyze structured data.",
      },
      {
        number: 3,
        title: "Data Cleaning & Preparation",
        description:
          "Handle missing values, duplicates, inconsistent formats and noisy information.",
      },
      {
        number: 4,
        title: "Descriptive Statistics",
        description:
          "Learn distributions, averages, spread, correlation and how to summarize datasets responsibly.",
      },
      {
        number: 5,
        title: "Probability & Uncertainty",
        description:
          "Build intuition for probability, conditional reasoning and uncertainty in predictions.",
      },
      {
        number: 6,
        title: "Supervised Learning",
        description:
          "Explore regression, classification and the relationship between features, labels and models.",
      },
      {
        number: 7,
        title: "Unsupervised Learning",
        description:
          "Discover clustering, dimensionality reduction and patterns without predefined labels.",
      },
      {
        number: 8,
        title: "Model Evaluation",
        description:
          "Learn train/test splits, validation, metrics, overfitting, underfitting and data leakage.",
      },
      {
        number: 9,
        title: "Feature Engineering & Pipelines",
        description:
          "Turn raw information into useful model inputs and repeatable ML workflows.",
      },
      {
        number: 10,
        title: "End-to-End ML Project",
        description:
          "Build a complete data-to-model project with analysis, training, evaluation and presentation.",
      },
    ],
    learn: [
      "Data analysis",
      "Statistics & probability",
      "Data cleaning",
      "Features & labels",
      "Supervised & unsupervised learning",
      "Model evaluation",
    ],
    build: [
      "Data dashboards",
      "Prediction models",
      "Classification projects",
      "Recommendation experiments",
      "ML notebooks",
    ],
    skills: [
      "Data literacy",
      "Statistical reasoning",
      "Experimentation",
      "Model evaluation",
    ],
    outcomes: [
      "Prepare real datasets",
      "Explain how ML training works",
      "Evaluate model performance",
      "Build beginner-to-intermediate ML projects",
    ],
    next: "Full-Stack Development",
    nextSlug: "full-stack-development",
  },
  {
    slug: "full-stack-development",
    number: "05",
    emoji: "🌐",
    title: "Full-Stack Development",
    subtitle: "Build complete products from interface to backend.",
    promise:
      "Connect frontend, backend, APIs and databases into real applications.",
    age: "Progressive",
    color: "from-sky-500/20 to-blue-400/10",
    intro:
      "This phase turns software concepts into products people can use. Learners build interfaces, APIs, databases and complete web applications while understanding how the pieces communicate.",
    modules: [
      {
        number: 1,
        title: "How the Web Works",
        description:
          "Understand browsers, servers, HTTP, URLs, requests, responses and the lifecycle of a web page.",
      },
      {
        number: 2,
        title: "HTML & Semantic Interfaces",
        description:
          "Build structured, accessible pages using modern HTML and semantic elements.",
      },
      {
        number: 3,
        title: "CSS & Responsive Design",
        description:
          "Learn layout, typography, responsive design and interfaces that work across devices.",
      },
      {
        number: 4,
        title: "JavaScript Programming",
        description:
          "Use modern JavaScript for state, logic, events, asynchronous work and browser APIs.",
      },
      {
        number: 5,
        title: "TypeScript & Application Design",
        description:
          "Add types and stronger contracts while learning how to structure larger frontend codebases.",
      },
      {
        number: 6,
        title: "React & Component Architecture",
        description:
          "Build reusable interfaces with components, state, props, forms and application patterns.",
      },
      {
        number: 7,
        title: "Backend APIs",
        description:
          "Create server-side applications, routes, validation, authentication and business logic.",
      },
      {
        number: 8,
        title: "Databases & Data Modeling",
        description:
          "Design relational and document data models and connect applications to persistent data.",
      },
      {
        number: 9,
        title: "Authentication, Security & Deployment",
        description:
          "Understand identity, authorization, common web risks and how applications reach production.",
      },
      {
        number: 10,
        title: "Full-Stack Product Project",
        description:
          "Build and deploy a complete application connecting UI, APIs, authentication and a database.",
      },
    ],
    learn: [
      "HTML, CSS & modern UI",
      "JavaScript/TypeScript",
      "React & application architecture",
      "Backend APIs",
      "Databases",
      "Authentication & deployment",
    ],
    build: [
      "Portfolio websites",
      "Full-stack dashboards",
      "REST APIs",
      "Database-backed applications",
      "AI-powered web apps",
    ],
    skills: [
      "Product thinking",
      "Frontend engineering",
      "Backend engineering",
      "Integration",
    ],
    outcomes: [
      "Build complete web applications",
      "Connect frontend and backend systems",
      "Work with databases and APIs",
      "Deploy usable software",
    ],
    next: "Deep Learning",
    nextSlug: "deep-learning",
  },
  {
    slug: "deep-learning",
    number: "06",
    emoji: "🧠",
    title: "Deep Learning",
    subtitle: "Explore how neural networks learn patterns.",
    promise:
      "Move from classical machine learning into neural networks, computer vision and modern deep-learning workflows.",
    age: "Progressive",
    color: "from-pink-500/20 to-purple-400/10",
    intro:
      "Learners go deeper into representation learning and neural networks. The focus is on understanding how models work, not simply calling an API.",
    modules: [
      {
        number: 1,
        title: "Neural Networks from First Principles",
        description:
          "Understand neurons, layers, activations and why neural networks can learn representations.",
      },
      {
        number: 2,
        title: "Tensors & Training Data",
        description:
          "Learn tensors, datasets, batching and the structures used by deep-learning frameworks.",
      },
      {
        number: 3,
        title: "Forward Pass & Loss",
        description:
          "See how inputs become predictions and how loss measures model error.",
      },
      {
        number: 4,
        title: "Backpropagation & Gradient Descent",
        description:
          "Understand how neural networks learn by propagating error and updating parameters.",
      },
      {
        number: 5,
        title: "PyTorch Foundations",
        description:
          "Build neural networks with tensors, modules, datasets, optimizers and training loops.",
      },
      {
        number: 6,
        title: "Convolutional Neural Networks",
        description:
          "Explore image representations, convolution, pooling and visual feature learning.",
      },
      {
        number: 7,
        title: "Embeddings & Representation Learning",
        description:
          "Learn how models represent meaning and similarity in useful vector spaces.",
      },
      {
        number: 8,
        title: "Transfer Learning",
        description:
          "Use pretrained models responsibly and adapt them to new tasks and datasets.",
      },
      {
        number: 9,
        title: "Training, Evaluation & Debugging",
        description:
          "Diagnose learning problems, tune experiments and compare model behavior.",
      },
      {
        number: 10,
        title: "Deep Learning Capstone",
        description:
          "Train and evaluate a meaningful neural-network project and explain its architecture and results.",
      },
    ],
    learn: [
      "Neural-network fundamentals",
      "Backpropagation",
      "PyTorch",
      "Computer vision",
      "Embeddings",
      "Training & evaluation",
    ],
    build: [
      "Image classifiers",
      "Neural-network experiments",
      "Vision projects",
      "Embedding search",
      "Deep-learning notebooks",
    ],
    skills: [
      "Model reasoning",
      "Experiment design",
      "Python engineering",
      "AI debugging",
    ],
    outcomes: [
      "Explain the core mechanics of neural networks",
      "Train and evaluate models",
      "Work with modern deep-learning tooling",
      "Build meaningful AI experiments",
    ],
    next: "Mobile, Games & Edge AI",
    nextSlug: "mobile-games-edge-ai",
  },
  {
    slug: "mobile-games-edge-ai",
    number: "07",
    emoji: "🎮",
    title: "Mobile, Games & Edge AI",
    subtitle: "Build technology that lives beyond the browser.",
    promise:
      "Explore mobile apps, game development, graphics and intelligent experiences running close to users and devices.",
    age: "Progressive",
    color: "from-orange-500/20 to-red-400/10",
    intro:
      "Technology becomes more exciting when it interacts with the real world. Learners explore creative computing through games and mobile apps, then discover how AI can run closer to devices.",
    modules: [
      {
        number: 1,
        title: "Mobile Computing Foundations",
        description:
          "Understand mobile platforms, application lifecycles, touch input and device constraints.",
      },
      {
        number: 2,
        title: "Mobile UI & Interaction",
        description:
          "Design responsive mobile interfaces around navigation, gestures, state and accessibility.",
      },
      {
        number: 3,
        title: "Game Loops & Real-Time Systems",
        description:
          "Learn update loops, input handling, timing, state and the foundations of interactive games.",
      },
      {
        number: 4,
        title: "Game Mechanics & Physics",
        description:
          "Build movement, collision, scoring, levels and simple physics-driven interactions.",
      },
      {
        number: 5,
        title: "2D Graphics & Animation",
        description:
          "Explore sprites, coordinates, animation and visual feedback in interactive applications.",
      },
      {
        number: 6,
        title: "Audio & Interactive Experiences",
        description:
          "Add sound, feedback and game states to make experiences more engaging and understandable.",
      },
      {
        number: 7,
        title: "Device Sensors & Cameras",
        description:
          "Explore how applications can interact with cameras, sensors and device capabilities.",
      },
      {
        number: 8,
        title: "Performance on Devices",
        description:
          "Understand CPU, memory, battery and latency constraints on resource-limited hardware.",
      },
      {
        number: 9,
        title: "Edge AI Fundamentals",
        description:
          "Learn why models sometimes run locally and explore inference close to the device.",
      },
      {
        number: 10,
        title: "Interactive Edge AI Project",
        description:
          "Build a mobile, game or device experience that combines interaction with an intelligent feature.",
      },
    ],
    learn: [
      "Mobile application concepts",
      "Game loops & mechanics",
      "Graphics foundations",
      "Interactive systems",
      "Device constraints",
      "Edge AI concepts",
    ],
    build: [
      "Mobile apps",
      "2D games",
      "Interactive simulations",
      "Camera/vision experiences",
      "Device-aware AI prototypes",
    ],
    skills: [
      "Creative engineering",
      "Interaction design",
      "Performance awareness",
      "Systems integration",
    ],
    outcomes: [
      "Prototype mobile experiences",
      "Build games with real mechanics",
      "Understand graphics and interaction loops",
      "Explore AI on resource-constrained devices",
    ],
    next: "Cloud & MLOps",
    nextSlug: "cloud-and-mlops",
  },
  {
    slug: "cloud-and-mlops",
    number: "08",
    emoji: "☁️",
    title: "Cloud & MLOps",
    subtitle: "Learn how software becomes dependable infrastructure.",
    promise:
      "Understand deployment, containers, cloud platforms and the operational side of modern applications and AI.",
    age: "Progressive",
    color: "from-cyan-500/20 to-blue-400/10",
    intro:
      "A great application still needs reliable infrastructure. This phase introduces cloud architecture, containers, databases, CI/CD and MLOps concepts for running systems in the real world.",
    modules: [
      {
        number: 1,
        title: "Cloud Computing Foundations",
        description:
          "Understand compute, storage, networking and the shared-resource model of cloud platforms.",
      },
      {
        number: 2,
        title: "Virtual Machines & Containers",
        description:
          "Compare virtual machines and containers and learn why containers changed deployment workflows.",
      },
      {
        number: 3,
        title: "Docker & Containerized Apps",
        description:
          "Package an application with Docker and understand images, containers, ports and volumes.",
      },
      {
        number: 4,
        title: "Cloud Networking",
        description:
          "Explore services, regions, networks, DNS, gateways and how cloud components communicate.",
      },
      {
        number: 5,
        title: "Databases & Persistent Infrastructure",
        description:
          "Learn managed databases, backups, scaling and reliable persistence in cloud environments.",
      },
      {
        number: 6,
        title: "CI/CD & Automation",
        description:
          "Build automated pipelines that test, package and deploy software consistently.",
      },
      {
        number: 7,
        title: "Observability & Monitoring",
        description:
          "Understand logs, metrics, traces, health checks and how engineers operate live systems.",
      },
      {
        number: 8,
        title: "Scaling & Reliability",
        description:
          "Explore load, caching, queues, redundancy and the trade-offs behind dependable services.",
      },
      {
        number: 9,
        title: "MLOps Workflows",
        description:
          "Connect data, models, experiments, deployment and monitoring into repeatable ML workflows.",
      },
      {
        number: 10,
        title: "Cloud Deployment Capstone",
        description:
          "Deploy and operate a containerized application or ML service with automation and monitoring.",
      },
    ],
    learn: [
      "Cloud fundamentals",
      "Docker & containers",
      "Databases at scale",
      "CI/CD",
      "Observability",
      "MLOps workflows",
    ],
    build: [
      "Containerized applications",
      "CI/CD pipelines",
      "Cloud deployments",
      "Monitoring dashboards",
      "Model deployment workflows",
    ],
    skills: [
      "Deployment thinking",
      "Reliability",
      "Automation",
      "Infrastructure literacy",
    ],
    outcomes: [
      "Containerize applications",
      "Understand cloud architecture",
      "Build deployment pipelines",
      "Operate software more confidently",
    ],
    next: "Systems & Computer Science",
    nextSlug: "systems-and-computer-science",
  },
  {
    slug: "systems-and-computer-science",
    number: "09",
    emoji: "⚙️",
    title: "Systems & Computer Science",
    subtitle: "Go beneath the abstractions.",
    promise:
      "Explore lower-level programming, operating systems, compilers and performance.",
    age: "Advanced / readiness-based",
    color: "from-slate-500/20 to-indigo-400/10",
    intro:
      "Advanced engineers benefit from knowing what abstractions hide. Learners explore C, C++, Rust, memory, concurrency, operating-system concepts and how languages become executable systems.",
    modules: [
      {
        number: 1,
        title: "C & Systems Programming",
        description:
          "Learn low-level programming, compilation, types, memory and direct interaction with a machine.",
      },
      {
        number: 2,
        title: "Pointers & Memory",
        description:
          "Understand addresses, pointers, allocation, stack, heap and memory safety concepts.",
      },
      {
        number: 3,
        title: "Data Representation & Binary Layout",
        description:
          "Explore how values, structures and files are represented in memory and storage.",
      },
      {
        number: 4,
        title: "Concurrency & Threads",
        description:
          "Learn parallel execution, synchronization, shared state and race conditions.",
      },
      {
        number: 5,
        title: "Operating System Internals",
        description:
          "Explore processes, scheduling, system calls, virtual memory and resource management.",
      },
      {
        number: 6,
        title: "Filesystems & I/O",
        description:
          "Understand files, directories, blocks, buffering and how programs interact with storage.",
      },
      {
        number: 7,
        title: "Compilers & Interpreters",
        description:
          "Follow the journey from source code through parsing and transformation to execution.",
      },
      {
        number: 8,
        title: "Runtimes & Language Design",
        description:
          "Explore virtual machines, garbage collection, runtime systems and language trade-offs.",
      },
      {
        number: 9,
        title: "Performance Engineering",
        description:
          "Measure software, identify bottlenecks and reason about CPU, memory, I/O and concurrency.",
      },
      {
        number: 10,
        title: "Build a Mini Systems Tool",
        description:
          "Create a low-level utility, interpreter, runtime component or systems project that exposes these ideas.",
      },
    ],
    learn: [
      "C/C++/Rust foundations",
      "Memory & pointers",
      "Concurrency",
      "Operating systems",
      "Compilers & runtimes",
      "Performance engineering",
    ],
    build: [
      "Memory allocators",
      "CLI systems tools",
      "Mini compiler/interpreter",
      "Concurrent programs",
      "Performance benchmarks",
    ],
    skills: [
      "Low-level reasoning",
      "Performance thinking",
      "Systems debugging",
      "Abstraction awareness",
    ],
    outcomes: [
      "Reason about memory and execution",
      "Understand systems-level tradeoffs",
      "Build lower-level software",
      "Connect high-level code to machine behavior",
    ],
    next: "Generative AI & Architecture",
    nextSlug: "generative-ai-and-architecture",
  },
  {
    slug: "generative-ai-and-architecture",
    number: "10",
    emoji: "🤖",
    title: "Generative AI & Architecture",
    subtitle: "Design intelligent systems, not just AI demos.",
    promise:
      "Bring software, data, models and infrastructure together into production-minded intelligent systems.",
    age: "Advanced / readiness-based",
    color: "from-yellow-500/20 to-orange-400/10",
    intro:
      "The final phase connects the journey. Learners explore LLMs, RAG, agents, evaluation, distributed systems and AI architecture — with an emphasis on engineering reliable intelligent products.",
    modules: [
      {
        number: 1,
        title: "Generative AI Foundations",
        description:
          "Understand generative models, tokens, embeddings, context and the modern AI application stack.",
      },
      {
        number: 2,
        title: "Transformers & LLMs",
        description:
          "Explore attention, transformer architecture, pretraining and how large language models process text.",
      },
      {
        number: 3,
        title: "Prompting & Structured Outputs",
        description:
          "Design reliable prompts, schemas, constraints and workflows for model-driven applications.",
      },
      {
        number: 4,
        title: "Embeddings & Vector Search",
        description:
          "Turn information into vectors and build semantic retrieval systems.",
      },
      {
        number: 5,
        title: "RAG Systems",
        description:
          "Connect language models to external knowledge through retrieval, grounding and context construction.",
      },
      {
        number: 6,
        title: "AI Agents & Tool Use",
        description:
          "Design systems where models reason through tasks, call tools and interact with software.",
      },
      {
        number: 7,
        title: "AI Evaluation & Reliability",
        description:
          "Measure quality, detect failure modes and design evaluation workflows for AI systems.",
      },
      {
        number: 8,
        title: "AI Safety & Responsible Engineering",
        description:
          "Explore privacy, security, hallucinations, misuse risks and human oversight in AI products.",
      },
      {
        number: 9,
        title: "Distributed AI Architecture",
        description:
          "Connect models, services, queues, databases and infrastructure into scalable intelligent systems.",
      },
      {
        number: 10,
        title: "Intelligent Systems Capstone",
        description:
          "Architect and build an end-to-end AI product that combines models, data, tools and software engineering.",
      },
    ],
    learn: [
      "LLMs & transformers",
      "Prompting & structured outputs",
      "RAG & vector search",
      "AI agents & tool use",
      "Evaluation & safety concepts",
      "Distributed AI architecture",
    ],
    build: [
      "RAG applications",
      "AI agents",
      "Knowledge assistants",
      "Multi-service AI platforms",
      "Intelligent workflow systems",
    ],
    skills: [
      "AI systems thinking",
      "Architecture",
      "Evaluation",
      "Integration",
    ],
    outcomes: [
      "Design end-to-end AI systems",
      "Connect models with data and tools",
      "Reason about reliability and scale",
      "Architect intelligent applications",
    ],
    next: "Your child’s next engineering chapter",
    nextSlug: "",
  },
];

export function getPhase(slug: string) {
  return phases.find((p) => p.slug === slug);
}
