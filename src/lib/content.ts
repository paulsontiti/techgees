export const WEBSITE = "https://globalgenius.community";
export const YOUTUBE = "https://www.youtube.com/@codingsimplifier";
export const WHATSAPP = "2349167704504";
export const PHONE_ONE = "+2349167704504";
export const PHONE_TWO = "+2348132658045";
export const whatsappLink = (
  message = "Hello The Global Genius! I would like to learn more about your classes.",
) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

export type Pathway = {
  range: string;
  title: string;
  subtitle: string;
  note: string;
  skills: string[];
  accent: string;
  symbol: string;
  courseLink: string;
};
export const pathways: Pathway[] = [
  {
    range: "AGES 5–7",
    title: "Scratch Explorers",
    subtitle: "Play. Imagine. Create.",
    note: "A playful first step into logic, animated stories and digital confidence.",
    skills: ["Visual coding", "Interactive stories", "Simple games"],
    accent: "yellow",
    symbol: "01",
    courseLink: "/courses/single/b0148742-237b-4944-9f97-62e40fe35ad1",
  },
  {
    range: "AGES 8–10",
    title: "Scratch Creators",
    subtitle: "Think. Build. Experiment.",
    note: "Turn creative ideas into games, animations and increasingly complex projects.",
    skills: ["Variables & loops", "Game design", "Problem-solving"],
    accent: "purple",
    symbol: "02",
    courseLink: "/courses/single/c998d316-77f1-45cf-afd8-d784c0792535",
  },
  {
    range: "AGES 11–14 without laptops",
    title: "Scratch Developers",
    subtitle: "Imagine. Code. Create.",
    note: "Build programming foundations with Scratch on a phone or tablet through interactive games, animations and problem-solving.",
    skills: [
      "Scratch programming",
      "Games & animations",
      "Logic & problem-solving",
    ],
    accent: "blue",
    symbol: "03",
    courseLink: "/courses/single/c9fa23e5-579b-4e68-bb1f-ec8807635de7",
  },
  {
    range: "AGES 11–14 with laptops",
    title: "Future Engineers",
    subtitle: "Code. Solve. Discover.",
    note: "Build foundations in Python, computer science, algorithms and applied AI.",
    skills: ["Python programming", "Web fundamentals", "Maths & algorithms"],
    accent: "blue",
    symbol: "04",
    courseLink: "/software-ai-engineering",
  },
  {
    range: "AGES 15+ & ADULTS",
    title: "Software & AI Academy",
    subtitle: "Engineer. Launch. Grow.",
    note: "A comprehensive route from programming fundamentals to advanced intelligent systems.",
    skills: [
      "Software engineering",
      "Machine learning",
      "Cloud & architecture",
    ],
    accent: "mint",
    symbol: "05",
    courseLink: "/software-ai-engineering",
  },
];

export type Phase = {
  number: string;
  title: string;
  short: string;
  modules: string;
  topics: string;
  why: string;
  build: string;
  outcome: string;
};
export const phases: Phase[] = [
  {
    number: "01",
    title: "Computer Foundations & Python",
    short: "Your journey starts under the hood.",
    modules: "Modules 1–10",
    topics: "Computer architecture · Linux · Networks · Python · CLI",
    why: "Understand how hardware, operating systems and code work together before mastering advanced frameworks.",
    build: "Command-line utilities, automation tools and a log analyzer.",
    outcome: "Confident foundations for software and systems development.",
  },
  {
    number: "02",
    title: "Maths, Data Structures & Algorithms",
    short: "Learn to think like an engineer.",
    modules: "Modules 11–20",
    topics: "Mathematics · Algorithms · Data structures · Complexity",
    why: "Strong software and AI are built on rigorous thinking, problem-solving and efficient algorithms.",
    build: "A pathfinding game engine and an in-memory data index.",
    outcome: "Clearer reasoning and practical algorithm design.",
  },
  {
    number: "03",
    title: "Professional Software Engineering",
    short: "Build software that lasts.",
    modules: "Modules 21–30",
    topics: "OOP · Testing · Design patterns · Architecture",
    why: "Go beyond code that works to code that is maintainable, testable and collaborative.",
    build: "A modular payment-processing engine and reusable libraries.",
    outcome: "A professional mindset for reliable software.",
  },
  {
    number: "04",
    title: "Data Engineering & Machine Learning",
    short: "Turn information into intelligence.",
    modules: "Modules 31–40",
    topics: "Data pipelines · Statistics · Probability · Classical ML",
    why: "Useful AI starts with the quality of the data and the decisions behind the model.",
    build: "A predictive analytics or fraud-detection prototype.",
    outcome: "Foundations for data science and ML engineering.",
  },
  {
    number: "05",
    title: "Full-Stack Web & AI Applications",
    short: "Ship things people can use.",
    modules: "Modules 41–50",
    topics: "HTML · CSS · React · APIs · Backend · Security",
    why: "Bring powerful backend systems into intuitive, accessible products for real users.",
    build: "A secure full-stack app with a streaming AI interface.",
    outcome: "From interface design to deployed applications.",
  },
  {
    number: "06",
    title: "Deep Learning & Neural Networks",
    short: "Understand how modern AI learns.",
    modules: "Modules 51–60",
    topics: "Neural networks · PyTorch · Computer vision · Training",
    why: "Move from simply calling AI tools to understanding model architectures and learning processes.",
    build: "An image-recognition or object-detection system.",
    outcome: "Skills for deep learning experimentation.",
  },
  {
    number: "07",
    title: "Mobile, Games & Edge AI",
    short: "Take technology beyond the browser.",
    modules: "Modules 61–70",
    topics: "Mobile apps · Graphics · Game engines · On-device AI",
    why: "Software should work across devices, experiences and environments—including offline.",
    build: "A mobile application, interactive game or on-device AI prototype.",
    outcome: "Creative and portable engineering skills.",
  },
  {
    number: "08",
    title: "Cloud, Databases & MLOps",
    short: "Build for the real world.",
    modules: "Modules 71–80",
    topics: "SQL · Cloud · CI/CD · Containers · Kubernetes · MLOps",
    why: "Production systems need availability, monitoring, deployment and thoughtful scaling.",
    build:
      "A cloud-deployed application and automated infrastructure workflow.",
    outcome: "Infrastructure and production readiness.",
  },
  {
    number: "09",
    title: "Systems Programming & Compilers",
    short: "Understand the machine deeply.",
    modules: "Modules 81–90",
    topics: "C · C++ · Rust · Memory · Operating systems · Compilers",
    why: "Learn the lower layers that power high-level languages and performant applications.",
    build: "A small interpreter, systems utility or runtime component.",
    outcome: "Deep knowledge of performance and systems design.",
  },
  {
    number: "10",
    title: "Generative AI & Systems Architecture",
    short: "Bring everything together.",
    modules: "Modules 91–100",
    topics: "LLMs · RAG · Agents · Distributed systems · Architecture",
    why: "Modern intelligent products combine language models, reliable infrastructure, data and software architecture.",
    build: "A retrieval-augmented AI application and an agent-based system.",
    outcome: "A capstone experience integrating software and AI.",
  },
];

export const capstones = [
  {
    title: "AI Knowledge Search",
    tag: "GENERATIVE AI",
    description:
      "Search and chat with documents using retrieval-augmented generation.",
    icon: "brain",
  },
  {
    title: "Smart Fintech Wallet",
    tag: "MOBILE & SYSTEMS",
    description: "Prototype an offline-first wallet with secure data handling.",
    icon: "wallet",
  },
  {
    title: "High-Performance API",
    tag: "BACKEND",
    description:
      "Design an e-commerce API with authentication, caching and databases.",
    icon: "code",
  },
  {
    title: "Build a Game",
    tag: "CREATIVE CODING",
    description: "Progress from Scratch games to interactive game mechanics.",
    icon: "game",
  },
  {
    title: "Computer Vision App",
    tag: "DEEP LEARNING",
    description: "Train a model to recognize patterns in images.",
    icon: "eye",
  },
  {
    title: "Cloud Platform",
    tag: "CLOUD & MLOPS",
    description: "Explore deployment, monitoring and scalable infrastructure.",
    icon: "cloud",
  },
];

export const faq = [
  {
    q: "Can my child really start at age 5?",
    a: "Yes. Younger learners start with age-appropriate Scratch activities focused on stories, animation, games and computational thinking. They progress at their own pace rather than jumping straight into advanced engineering.",
  },
  {
    q: "Does my child need previous coding experience?",
    a: "No. The pathways start from the basics. Older students and adult beginners can start with Python and computer science fundamentals.",
  },
  {
    q: "Can students learn with a phone or tablet?",
    a: "Students can access learning on a phone, tablet or laptop. For serious coding projects, a laptop or desktop offers the most practical experience; some activities and tools require one.",
  },
  {
    q: "What does the one-week free trial include?",
    a: "The trial is an opportunity to explore the learning environment before committing. Contact the academy for current trial access, supported courses and scheduling details.",
  },
  {
    q: "Is the entire 100-module academy suitable for a young child?",
    a: "The full pathway is progressive, not a course a five-year-old is expected to complete immediately. Younger children begin with Scratch and advance to more demanding material as their skills and readiness develop.",
  },
  {
    q: "Are live lessons the only way to learn?",
    a: "No. The learning model combines self-paced recorded content with scheduled interactive classes, projects, challenges and guided support.",
  },
  {
    q: "Will learners receive jobs or certifications?",
    a: "We focus on real understanding and project portfolios. The pathway introduces subjects relevant to technology careers and may help learners prepare for external certifications, but jobs, salaries and third-party certificates are not guaranteed.",
  },
  {
    q: "Can schools partner with The Global Genius?",
    a: "Yes. We offer a school-facing online technology education partnership model, including a proposed 20% revenue share. Contact us for current partnership terms and a tailored proposal.",
  },
];

// Names are taken from the academy's publicly indexed course catalog (October 2026).
// Course availability should be checked with admissions; these cards do not claim an active seat.
export type CatalogCategory =
  | "Kids & Scratch"
  | "Python"
  | "Web development" | "Frontend Development" | "Backend Development" | "Computer Science"
  | "AI & foundations" | "IT & Software";
export const courseCatalog: {
  title: string;
  category: CatalogCategory;
  courseLink: string;
  audience: string;
  takeaway: string;
  icon: "game" | "code" | "brain" | "terminal" | "workflow" | "monitorcog" | "shieldcheck";
}[] = [
  {
    title: "Scratch Explorers",
    category: "Kids & Scratch",
    audience: "Young beginners",
    takeaway: "Stories, animation and visual coding",
    icon: "game",
    courseLink: "/courses/single/b0148742-237b-4944-9f97-62e40fe35ad1",
  },
  {
    title: "Scratch Creators",
    category: "Kids & Scratch",
    audience: "Ages 8–10",
    takeaway: "Interactive games, logic and events",
    icon: "game",
    courseLink: "/courses/single/c998d316-77f1-45cf-afd8-d784c0792535",
  },
  {
    title: "Scratch Developers",
    category: "Kids & Scratch",
    audience: "Ages 11–14",
    takeaway: "Complex projects and a bridge to Python",
    icon: "game",
    courseLink: "/courses/single/c9fa23e5-579b-4e68-bb1f-ec8807635de7",
  },
  {
     title: "Inside the Computer", category: "Computer Science", audience: "Computer Science students", takeaway: "Understand how hardware, software, memory, and the CPU work together to execute Python programs.", icon: "workflow",courseLink:"/courses/single/b38b64de-c12e-45a5-9b8e-2bc41297fd08" },
     {
     title: "IT Fundamentals for Beginners", category: "IT & Software", audience: "Computer users", takeaway: "Learn how computers and networks work, protect your accounts and files, and troubleshoot everyday IT problems.", icon: "monitorcog",courseLink:"/courses/single/ae32703a-422b-4ac4-a1be-dce812575cbb" },
     {
     title: "Cybersecurity & Ethical Hacking Foundations", category: "IT & Software", audience: "Hackers", takeaway: "Learn to protect accounts, devices, networks, and websites through practical beginner projects.", icon: "shieldcheck",courseLink:"/courses/single/0fe608ed-f1bb-4c25-adfe-dfa4041a0834" },
     {
     title: "AI Tools & Workflow Automation", category: "AI & foundations", audience: "AI tools users", takeaway: "Use AI for everyday work and build automated workflows without writing code.", icon: "brain",courseLink:"/courses/single/1f7ca7c4-bc52-4a9f-8c4f-992153db9a0c" },
  {
    title: "Python Programming Foundation(Phone-Friendly)",
    category: "Python",
    audience: "Beginners",
    takeaway: "Structured practice from your device",
    icon: "terminal",
    courseLink: "/courses/single/426e46db-c777-4ca0-bf7b-5d628af51ddf",
  },
  {
    title: "HTML Foundations",
    category: "Web development",
    audience: "Beginners",
    takeaway: "Build webpages with headings, links, images, forms and semantic HTML",
    icon: "code",
    courseLink: "/courses/single/876f1b44-4ce9-4547-a03d-19188d2a88d8", 
  },
  {
    title: "CSS Foundations",
    category: "Web development",
    audience: "Beginners",
    takeaway: "Style responsive webpages with colours, typography, Flexbox and Grid",
    icon: "code",
    courseLink: "/courses/single/71aec3c2-5701-4ee3-a2db-ca6d2660b377", // Add CSS course link
  },
  {
    title: "JavaScript Foundations",
    category: "Web development",
    audience: "Beginners",
    takeaway: "Learn programming fundamentals and build interactive webpages",
    icon: "code",
    courseLink: "/courses/single/bdb33dab-944f-4043-8d22-a6a23a6680b6", 
  },

  {
    title: "100 Days of Web Development For Beginners",
    category: "Web development",
    audience: "Beginners",
    takeaway: "HTML, CSS and JavaScript fundamentals",
    icon: "code",
    courseLink: "/courses/single/6d5385f7-dfe3-4023-8d7c-26a776d055d7",
  },
  { title: "100 Days Accelerated Frontend", category: "Frontend Development", audience: "Developing frontend engineers", takeaway: "Frontend projects and modern web workflows", icon: "code",courseLink:"/courses/single/0a4b041e-b0cf-4f9e-920a-f30e6121b503" },
  { title: "100 Days Accelerated Backend with Node.js", category: "Backend Development", audience: "Developing backend engineers", takeaway: "APIs and server-side applications", icon: "code",courseLink:"/courses/single/08b5afbf-a64c-408b-9ace-eec3e76d1457" },
  // { title: "Full-Stack Web Development", category: "Web development", audience: "Aspiring app builders", takeaway: "React and Node.js from UI to API", icon: "code", courseLink:"" },
  // { title: "AI & Machine Learning with Python", category: "AI & foundations", audience: "Aspiring AI engineers", takeaway: "Data, models and hands-on ML", icon: "brain",courseLink:"" },
  // { title: "Computer Science Foundations", category: "Computer Science", audience: "Curious problem solvers", takeaway: "Computers, systems and how software works", icon: "brain",courseLink:""},
];

// Feedback is paraphrased from testimonials displayed on The Global Genius's website.
export const studentVoices = [
  {
    name: "Chuku Paula",
    initials: "CP",
    focus: "Encouragement & consistency",
    feedback:
      "Appreciated the course explanations and encouragement to keep progressing, even when balancing distractions.",
  },
  {
    name: "Opeyemi Ahmed",
    initials: "OA",
    focus: "Simple explanations",
    feedback:
      "Highlighted the approachable teaching style, flexible pace and follow-up support from instructors.",
  },
  {
    name: "Joseph Ekpe",
    initials: "JE",
    focus: "Confidence to learn",
    feedback:
      "Found the lessons structured and the instructors helpful when coursework became challenging.",
  },
  {
    name: "Adebayo Toheeb",
    initials: "AT",
    focus: "Project-focused community",
    feedback:
      "Valued the practical lessons, approachable mentors and a supportive learning community.",
  },
];
