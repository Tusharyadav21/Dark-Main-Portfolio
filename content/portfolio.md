---
metadata:
  title: "Tushar Yadav - AI Full Stack Software Engineer"
  titleTemplate: "%s | Tushar Yadav"
  description: "AI & Full-Stack Engineer with nearly 4 years of experience specializing in architecting scalable microservices and production-grade GenAI systems."
  basePath: "https://dark-main.netlify.app"
  keywords:
    - "AI Full Stack Software Engineer"
    - "LangGraph"
    - "RAG"
    - "Python Developer"
    - "Next.js Developer"
    - "FastAPI"
    - "Agentic Workflows"
  openGraph:
    title: "Tushar Yadav - AI Full Stack Software Engineer"
    description: "AI & Full-Stack Engineer specializing in scalable microservices and production-grade GenAI systems."
  twitter:
    card: "summary_large_image"
    title: "Tushar Yadav - AI Full Stack Software Engineer"

profile:
  name: "Tushar Yadav"
  role: "AI Full Stack Software Engineer"
  location: "Bengaluru, India"
  email: "tushary2382@gmail.com"
  phone: "+91-8114000069"
  linkedin: "tusharyadav21"
  github: "tusharyadav21"
  resumeLink: "https://docs.google.com/document/d/1uAcoVbCTgpUBXx5WS2_vPJB-EhVm8MYFV0oR4QVhHe4"

navigation:
  - title: "Home"
    url: "/"
    icon: "Home"
  - title: "Work & Education"
    url: "/career"
    icon: "BriefcaseBusiness"
  - title: "Projects"
    url: "/projects"
    icon: "Frame"
  - title: "Let's Connect"
    url: "/contact"
    icon: "PhoneCall"
  - title: "Chat with My AI"
    url: "/chat"
    icon: "AiAvatar"

home:
  greeting: "Hi, I'm Tushar"
  subheading: "AI Full Stack Software Engineer"
  stats:
    - label: "Years Experience"
      value: "4"
    - label: "Projects Completed"
      value: "10+"
    - label: "Tech Stack"
      value: "8+"
    - label: "Dedication"
      value: "100%"

contactInfo:
  - label: "Email"
    value: "tushary2382@gmail.com"
    href: "mailto:tushary2382@gmail.com"
    icon: "Mail"
  - label: "Phone"
    value: "+91-8114000069"
    href: "tel:+918114000069"
    icon: "Phone"
  - label: "Location"
    value: "Bengaluru, India"
    href: null
    icon: "MapPin"

socialLinks:
  - name: "GitHub"
    url: "https://github.com/Tusharyadav21"
    icon: "Github"
    color: "hover:text-black"
  - name: "LinkedIn"
    url: "https://linkedin.com/in/tusharyadav21"
    icon: "Linkedin"
    color: "hover:text-blue-600"

workExperience:
  - company: "Suventure Services Pvt."
    role: "Software Engineer"
    years: "July 2022 — Present"
    location: "Bengaluru, India"
    companyLink: "https://suventure.in/"
    description: |
      - **Real-Time Voice AI & Validation:** Architected a full-stack AI application delivering near real-time audio transcription across 6 Indic languages. Engineered an interactive post-call evaluation flow where the LLM summarizes the problem statement and proposed solution, prompting the user for validation to ensure high accuracy and mitigate hallucinations.
      - **Go-Based Event-Driven AI:** Developed a high-performance webhook service in Golang that integrates custom AI processing with Chatwoot (open-source email ticketing platform) to automate and augment customer support workflows.
      - **AI & Recommendation Systems:** Architected and deployed an AI-powered content recommendation engine for a digital news platform using FastAPI and ML/LLM pipelines, driving personalized user experiences at scale.
      - **Microservices Architecture:** Designed and decoupled core domain services (workflow orchestration, audit logging) into scalable microservices, significantly reducing cross-service coupling and enabling independent deployment lifecycles.
      - **Complex Auth & Security:** Implemented distributed authentication via Keycloak (OIDC), engineering a custom token-rotation-safe refresh deduplication mechanism to eliminate race conditions under heavy parallel request loads while enforcing strict RBAC.
      - **System Optimization & Observability:** Refactored synchronous legacy code to asynchronous patterns and applied aggressive query optimization/caching, substantially reducing system latency. Implemented structured logging and distributed tracing to accelerate incident resolution.
      - **Technical Leadership:** Mentored junior developers through pair programming and rigorous code reviews, establishing organizational standards for API contracts, error handling, and environment parity using Docker.
  - company: "Apni Shiksha"
    role: "Frontend Developer Intern"
    years: "November 2021 — February 2022"
    location: "Remote"
    companyLink: "https://apnishiksha.com/"
    description: |
      - Developed a modular Content Management System (CMS) using React and TailwindCSS for streamlined course management and analytics tracking.
      - Optimized client-side performance through component lazy loading, significantly improving Core Web Vitals and user engagement metrics.

education:
  - institution: "Kalinga Institute of Industrial Technology (KIIT) University"
    degree: "Bachelor of Technology (B.Tech)"
    years: "July 2018 — May 2022"
    location: "Bhubneswar, India"
    description: |
      - Major: Mechanical Engineering
      - Minor: Computer Science and Engineering
      - GPA: 7.94

technicalSkills:
  - category: "AI/LLM Engineering"
    skills:
      - name: "LangGraph"
        icon: "cpu"
      - name: "LangChain"
        icon: "langchain"
      - name: "RAG"
        icon: "database"
      - name: "Agentic Workflows"
        icon: "bot"
  - category: "Backend"
    skills:
      - name: "Python"
        icon: "python"
      - name: "FastAPI"
        icon: "fastapi"
      - name: "Node.js"
        icon: "nodejs"
      - name: "Express.js"
        icon: "express"
      - name: "Golang"
        icon: "terminal"
  - category: "Frontend"
    skills:
      - name: "Next.js"
        icon: "nextjs"
      - name: "React"
        icon: "react"
      - name: "TypeScript"
        icon: "typescript"
      - name: "JavaScript"
        icon: "javascript"
      - name: "Tailwind CSS"
        icon: "tailwind"
  - category: "Databases & Caching"
    skills:
      - name: "PostgreSQL"
        icon: "postgresql"
      - name: "Redis"
        icon: "redis"
      - name: "MongoDB"
        icon: "mongodb"
  - category: "DevOps & Tools"
    skills:
      - name: "Docker"
        icon: "docker"
      - name: "AWS"
        icon: "aws"
      - name: "Keycloak"
        icon: "keycloak"
      - name: "ARQ"
        icon: "terminal"
      - name: "Git"
        icon: "git"

projects:
  - id: "1"
    title: "Artha - Local-First RAG"
    description: "Architected a completely local, Retrieval-Augmented Generation (RAG) platform utilizing FastAPI and Next.js, ensuring zero external API dependencies for strict data privacy. Designed complex, resilient agentic workflows with LangGraph state machines, featuring automated quality gating, query rewriting, and HyDE fallback."
    githubUrl: "https://github.com/Tusharyadav21/artha"
    tags: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Redis", "Ollama"]
    highlights:
      - "Completely local RAG architecture for data privacy"
      - "Asynchronous document ingestion using Redis and ARQ"
      - "Advanced retrieval with Reciprocal Rank Fusion (RRF)"
      - "Resilient agentic workflows with LangGraph state machines"
  - id: "2"
    title: "Articles - AI-Assisted Publishing Platform"
    description: "Architected a schema-driven content publishing platform leveraging a ProseMirror-based rich text editor (Tiptap). Engineered a scalable JSON-based document data model to ensure content consistency and seamless cross-platform rendering."
    liveUrl: "https://articles.encaenia.co.in/"
    tags: ["Next.js", "React", "Tiptap", "TypeScript", "GenAI"]
    highlights:
      - "Schema-driven content publishing platform"
      - "Scalable JSON-based document data model"
      - "Custom editor extensions for AI-enhanced workflows"
      - "Advanced React caching strategies for frontend optimization"
  - id: "3"
    title: "Chat API"
    description: "Python-based chat API integrating retrieval-augmented generation (RAG) with structured tool access for real-time data. Implemented conversation memory and semantic context retrieval pipelines to improve LLM accuracy in technical support and project assistance workflows."
    githubUrl: "https://github.com/Tusharyadav21/chat_api"
    tags: ["Python", "FastAPI", "LangChain", "RAG"]
    highlights:
      - "RAG integration for real-time data access"
      - "Conversation memory & semantic context retrieval"
      - "Technical support workflow optimization"
  - id: "4"
    title: "OMDB Movie App"
    description: "Movie search application powered by the OMDB API with advanced filtering options, caching, and debounced search for optimal performance."
    liveUrl: "https://omdb-api-task.netlify.app/"
    githubUrl: "https://github.com/Tusharyadav21/OMDB-API-App"
    tags: ["React", "API", "Axios", "Caching"]
    highlights:
      - "OMDB API integration"
      - "Debounced search optimization"
      - "Advanced filtering options"
  - id: "5"
    title: "ToDo App"
    description: "Redux-powered task manager with persistence, enabling users to efficiently organize and track their tasks with a clean, intuitive interface."
    liveUrl: "https://react2do.netlify.app/"
    githubUrl: "https://github.com/Tusharyadav21/ToDo-App"
    tags: ["React", "Redux", "JavaScript"]
    highlights:
      - "Redux state management"
      - "Local storage persistence"
      - "Clean, intuitive UI"
  - id: "6"
    title: "URL Shortener"
    description: "A simple yet powerful URL shortening service built with modern web technologies for creating shareable, shortened links."
    githubUrl: "https://github.com/Tusharyadav21/url-shortner"
    tags: ["Node.js", "Express", "MongoDB"]
    highlights:
      - "Custom short URL generation"
      - "Link analytics tracking"
      - "RESTful API design"

achievements:
  - title: "Real-Time Voice AI Platform"
    description: "Architected a full-stack AI application delivering near real-time audio transcription across 6 Indic languages."
    icon: "mic"
  - title: "Event-Driven Support Workflows"
    description: "Developed a high-performance webhook service in Golang integrating custom AI processing with Chatwoot."
    icon: "cpu"
  - title: "AI-Powered Recommendation System"
    description: "Created an intelligent recommendation system for news websites using Python FastAPI and ML/LLM pipelines."
    icon: "star"

systemPrompts:
  general: |
    You are a professional support assistant for my projects. 
    Focus on helping me troubleshoot issues, provide technical guidance, and organize my tasks.
  technical: |
    You are my collaborative development partner. 
    We're building a full-stack web application together with RAG capabilities.
  taskManagement: |
    You are an efficient task management assistant. 
    Help me organize work, set priorities, and track progress on projects.
---

## About Me

**AI & Full-Stack Engineer** with nearly 4 years of experience specializing in architecting scalable microservices and production-grade GenAI systems. Deep expertise in designing robust Retrieval-Augmented Generation (RAG) pipelines, autonomous AI agents (LangGraph), and decoupled Python/Next.js architectures.

## Foundation & Journey

My journey began with a strong foundation in engineering at KIIT University, where I combined my mechanical engineering major with a computer science minor. This unique blend of disciplines shaped my approach to problem-solving — I think in systems, optimize for efficiency, and build for scale.

## Solving Complex Engineering Challenges

I am passionate about solving complex engineering challenges - from optimizing low-latency LLM streaming and hybrid search to building secure, event-driven infrastructure.

## What I Bring to the Table

- **AI/LLM Engineering**: LangGraph, LangChain, RAG (Hybrid Search, Reciprocal Rank Fusion, HyDE), Agentic Workflows
- **Performance-First Architecture**: Go-Based Event-Driven AI and highly optimized legacy codebase refactoring
- **Scalable Backend Design**: Designed scalable microservices and implemented complex distributed authentication via Keycloak (OIDC)
- **Mentorship & Leadership**: Establishing organizational standards for API contracts, error handling, and environment parity

## Philosophy

> "The goal isn't just to write code. It's to build experiences that scale and serve."

I believe in crafting solutions that are not just functional, but elegant, maintainable, and built to scale with advanced AI capabilities.
