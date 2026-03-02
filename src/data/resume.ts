export const personalInfo = {
  name: "Piyush Mittal",
  role: "Software Engineer (Backend)",
  company: "Edra Labs",
  location: "Mumbai, Maharashtra, India",
  email: "20piyushmittal@gmail.com",
  phone: "+91 8571086607",
  linkedin: "https://www.linkedin.com/in/piyush-mittal-9a71121b6/",
  github: "https://github.com/qubitts",
  twitter: "https://x.com/qubitts",
  instagram: "https://www.instagram.com/piyushxmital/",
};

export const summary = `Software Engineer with experience across startups and product teams, working on backend systems, automation, and platform development. I've contributed to projects involving data workflows, cloud infrastructure, and LLM-driven features, along with earlier experience in DevOps and full-stack engineering.

My work spans building reliable services, improving internal tooling, and supporting products end-to-end. Across different roles, I've gained a practical understanding of how systems are designed, deployed, and scaled, and I bring a steady approach to problem-solving and execution.

Comfortable working with modern backend stacks, cloud platforms, and distributed systems, with a focus on clarity, maintainability, and ownership. Still learning, still improving, and committed to building things that are useful and durable.`;

export const experience = [
  {
    company: "Edra Labs",
    role: "Software Engineer (Backend)",
    period: "April 2024 - Present",
    location: "Mumbai, India",
    highlights: [
      "Built a machines and luxury watches content platform from scratch using NodeJS, Flask, and NextJS — owning backend architecture and core system design.",
      "Designed reusable database packages and templated admin dashboards to eliminate engineering redundancy.",
      "Built a structured graph-based knowledge system from unstructured raw data using LLMs, ANN-based retrieval, and RAG techniques.",
      "Worked with agentic LLM frameworks including Skyvern, Computer Use, and Kura to build an auto-commenter bot and automated backlink posting workflows.",
      "Developed a scalable data extraction pipeline for videos, images, articles, blogs, and PDFs using hybrid vector search, RAG, and LLM-based processing.",
      "Implemented full scraping workflows, LLM-based chunking, semantic tagging, keyword-aware retrieval, and large-scale vector store management.",
      "Built LLM pipelines for summarization, content tagging, data generation, and image deduplication using vector embeddings.",
      "Deployed production systems using Docker and AWS ECS with background task orchestration via Celery, monitoring using Flower and SigNoz.",
    ],
    tech: "Python, Flask, FastAPI, NodeJS, Redis, RAG, LLMs, Agentic Frameworks, Vector DBs, PostgreSQL, Celery, AWS, ReactJS, MongoDB",
  },
  {
    company: "CutShort",
    role: "Software Engineer (Backend)",
    period: "Nov 2022 - Mar 2024",
    location: "Pune, India",
    highlights: [
      "Developed new features, APIs, and automated tasks/microservices on the backend.",
      "Implemented automated workflows to streamline recruiter processes, enhancing efficiency.",
      "Built AI-powered job recommendation emails and automated APIs to optimize candidate acquisition.",
      "Created serverless microservices for bulk email handling, messaging, and platform event tracking.",
    ],
    tech: "Python, Flask, NodeJS, AWS, TypeScript, MongoDB, Git, Firebase, Elastic, MailModo, BigQuery, Algolia, APM",
  },
  {
    company: "DronaPay",
    role: "DevOps Intern",
    period: "April 2022 - Aug 2022",
    location: "Mumbai, India",
    highlights: [
      "Designed and deployed complete product infrastructure on AWS from scratch using EKS, Helm, ArgoCD, Terraform, and GitLab Runners.",
      "Set up end-to-end monitoring and observability dashboards to streamline log analysis and infrastructure management.",
    ],
    tech: "AWS, Docker, Helm, ArgoCD, Kubernetes, Terraform, Prometheus",
  },
  {
    company: "VAYUZ Technologies",
    role: "Full-stack Developer Intern",
    period: "Jan 2021 - March 2022",
    location: "Noida, India",
    highlights: [
      "Developed a customized Admin Dashboard using Node.js and React for efficient management of websites and applications.",
      "Implemented video compression, payment gateway integration, authentication, web scraping, custom eBook creation, image compression, and more.",
    ],
    tech: "JavaScript, ReactJS, ExpressJS, MongoDB, Bootstrap, Nginx, Redux, AWS, ffmpeg",
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Golang", "C++"],
  frameworks: [
    "NodeJS",
    "ExpressJS",
    "Flask",
    "FastAPI",
    "ReactJS",
    "NextJS",
  ],
  databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "VectorDB"],
  ai_ml: ["LLMs", "RAG", "Agentic Frameworks", "Vector Search", "Embeddings", "Prompt Engineering", "LLM Evals"],
  cloud_devops: [
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "ECS",
    "EKS",
    "Lambda",
  ],
  tools: [
    "Git",
    "Celery",
    "OTEL",
    "SigNoz",
    "Typesense",
    "Firebase",
    "Metabase",
    "PagerDuty",
    "Prefect",
  ],
};

export const education = {
  institution: "Maharaja Agrasen Institute of Technology (GGSIPU)",
  degree: "Bachelor of Technology - Information Technology",
  gpa: "9.05",
  period: "Aug 2019 - May 2023",
  location: "New Delhi, India",
  courses: [
    "Operating Systems",
    "Data Structures",
    "Analysis of Algorithms",
    "Object Oriented Programming in C++",
  ],
};

export const certifications = [
  {
    name: "AWS Certified Solutions Architect Associate",
    platform: "Udemy",
    year: "2022",
    description:
      "Comprehensive cloud architecture certification covering AWS services, designing resilient architectures, high-performing systems, and secure applications.",
  },
  {
    name: "MERN Stack Development",
    platform: "Udemy",
    description:
      "Full-stack web development with MongoDB, Express.js, React, and Node.js — building complete web applications from front to back.",
  },
  {
    name: "Node.js Course",
    platform: "Udemy",
    description:
      "In-depth Node.js development covering server-side JavaScript, REST APIs, authentication, and production deployment.",
  },
];

export const achievements = [
  {
    title: "Open Source Contribution — Skyvern",
    description:
      "Contributed to the Skyvern open-source AI web automation framework, working on code improvements and feature enhancements.",
    link: "https://github.com/Skyvern-AI/skyvern",
  },
];
