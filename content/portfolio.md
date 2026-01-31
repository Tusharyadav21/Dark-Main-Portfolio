---
metadata:
  title: "Tushar Yadav - Full Stack Developer & Problem Solver"
  titleTemplate: "%s | Tushar Yadav"
  description: "Full Stack Developer specializing in Next.js, Python, and AI applications. Building scalable web solutions with 3+ years of experience."
  basePath: "https://dark-main.netlify.app"
  keywords:
    - "Full Stack Developer"
    - "Next.js Developer"
    - "Python Developer"
    - "FastAPI"
    - "AI Developer"
    - "ReactJS"
  openGraph:
    title: "Tushar Yadav - Software Engineer"
    description: "Software Engineer with 3+ years of experience in Next.js, Python, and AI."
    image: "/portfolio_picture.png"
  twitter:
    card: "summary_large_image"
    title: "Tushar Yadav - Software Engineer"
    image: "/portfolio_picture.png"

profile:
  name: "Tushar Yadav"
  role: "Full Stack Software Engineer"
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
  subheading: "Full Stack Software Engineer & Problem Solver"
  stats:
    - label: "Years Experience"
      value: "3+"
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
  - company: "Suventure Services"
    role: "Software Engineer"
    years: "July 2022 — Present"
    location: "Bengaluru, India"
    companyLink: "https://suventure.in/"
    description: |
      - Built a multi-tenant CRM backend with workflow orchestration, backend-driven configuration, and secure OIDC-based authentication.
      - Designed scalable APIs for workflow execution, metadata management, and audit logging across CRM services.
      - Delivered multiple POCs with Next.js and Python to promote technology adoption across the organisation.
      - Developed a secure middleware solution integrating Razorpay with the Piano subscription platform.
      - Applied AI development kits, including VercelAI and LangChain, to enhance application capabilities and features.
      - Created a recommendation system for News Websites using Python FastAPI for scalable, AI-driven solutions.
      - Revamped Deccan Herald for 10M+ monthly users with performance-first architecture.
      - Mentored junior developers, elevating team coding standards and best practices.
      - Monitored software performance metrics, optimising processes to reduce efficiency bottlenecks.
  - company: "Apni Shiksha"
    role: "Frontend Developer Intern"
    years: "November 2021 — February 2022"
    location: "Remote"
    companyLink: "https://apnishiksha.com/"
    description: |
      - Built a modular CMS frontend with ReactJS and TailwindCSS for managing course content and real-time analytics.
      - Developed optimised pages using lazy loading, significantly improving load times and user engagement metrics.
      - Maintained code quality through thorough testing and linting, enhancing development efficiency and reducing bugs.

education:
  - institution: "Kalinga Institute of Industrial Technology (KIIT) University"
    degree: "Bachelor of Technology (B.Tech)"
    years: "July 2018 — May 2022"
    location: "Bhubneswar, Odisha, India"
    description: |
      - Major: Mechanical Engineering
      - Minor: Computer Science and Engineering
      - GPA: 7.94

technicalSkills:
  - category: "Frontend"
    skills:
      - name: "React.js"
        icon: "react"
      - name: "Next.js"
        icon: "nextjs"
      - name: "JavaScript"
        icon: "javascript"
      - name: "TypeScript"
        icon: "typescript"
      - name: "TailwindCSS"
        icon: "tailwind"
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
      - name: "Redis"
        icon: "redis"
  - category: "Databases"
    skills:
      - name: "MongoDB"
        icon: "mongodb"
      - name: "PostgreSQL"
        icon: "postgresql"
  - category: "DevOps & Tools"
    skills:
      - name: "Docker"
        icon: "docker"
      - name: "AWS"
        icon: "aws"
      - name: "Git"
        icon: "git"
      - name: "Keycloak"
        icon: "keycloak"
  - category: "Gen AI"
    skills:
      - name: "LangChain"
        icon: "langchain"
      - name: "Vercel AI SDK"
        icon: "vercel"

projects:
  - id: "1"
    title: "Articles"
    description: "Architected a scalable, block-based EditorJS pipeline with a pluggable JSON architecture, enabling modular plugin updates for better flexibility and performance. Implemented in-memory React caching with React's cache API to minimise server calls, achieving faster response times and smoother editor interactions."
    liveUrl: "https://articles.encaenia.co.in/"
    tags: ["Next.js", "React", "EditorJS", "TypeScript"]
    highlights:
      - "Pluggable JSON architecture for modular updates"
      - "In-memory React caching for optimized performance"
      - "Extensible, data-driven content workflows"
  - id: "2"
    title: "Chat API"
    description: "Python-based chat API integrating retrieval-augmented generation (RAG) with structured tool access for real-time data. Implemented conversation memory and semantic context retrieval pipelines to improve LLM accuracy in technical support and project assistance workflows."
    liveUrl: "https://github.com/Tusharyadav21/chat_api"
    githubUrl: "https://github.com/Tusharyadav21/chat_api"
    tags: ["Python", "FastAPI", "LangChain", "RAG"]
    highlights:
      - "RAG integration for real-time data access"
      - "Conversation memory & semantic context retrieval"
      - "Technical support workflow optimization"
  - id: "3"
    title: "OMDB Movie App"
    description: "Movie search application powered by the OMDB API with advanced filtering options, caching, and debounced search for optimal performance."
    liveUrl: "https://omdb-api-task.netlify.app/"
    githubUrl: "https://github.com/Tusharyadav21/OMDB-API-App"
    tags: ["React", "API", "Axios", "Caching"]
    highlights:
      - "OMDB API integration"
      - "Debounced search optimization"
      - "Advanced filtering options"
  - id: "4"
    title: "ToDo App"
    description: "Redux-powered task manager with persistence, enabling users to efficiently organize and track their tasks with a clean, intuitive interface."
    liveUrl: "https://react2do.netlify.app/"
    githubUrl: "https://github.com/Tusharyadav21/ToDo-App"
    tags: ["React", "Redux", "JavaScript"]
    highlights:
      - "Redux state management"
      - "Local storage persistence"
      - "Clean, intuitive UI"
  - id: "5"
    title: "URL Shortener"
    description: "A simple yet powerful URL shortening service built with modern web technologies for creating shareable, shortened links."
    githubUrl: "https://github.com/Tusharyadav21/url-shortner"
    tags: ["Node.js", "Express", "MongoDB"]
    highlights:
      - "Custom short URL generation"
      - "Link analytics tracking"
      - "RESTful API design"
  - id: "6"
    title: "React ShadCN Kit"
    description: "A comprehensive React component library built with ShadCN UI, providing reusable and customizable components for rapid development."
    githubUrl: "https://github.com/Tusharyadav21/react-shadcn-kit"
    tags: ["React", "ShadCN", "TypeScript", "TailwindCSS"]
    highlights:
      - "Reusable component library"
      - "ShadCN UI integration"
      - "TypeScript support"

achievements:
  - title: "Deccan Herald Performance Optimization"
    description: "Revamped the Deccan Herald website architecture to serve 10M+ monthly users with performance-first design principles."
    icon: "trophy"
  - title: "Multi-Tenant CRM System"
    description: "Led the development of a secure, multi-tenant CRM backend with workflow orchestration and OIDC-based authentication."
    icon: "briefcase"
  - title: "AI-Powered Recommendation System"
    description: "Created an intelligent recommendation system for news websites using Python FastAPI and machine learning algorithms."
    icon: "cpu"

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

Dynamic **Software Engineer** with over 3+ years of experience, driving advancements in **Next.js**, **Python**, and **AI applications**. I've led major projects including Bank CRM, Bank CMS, and high-traffic News websites, consistently boosting performance and user experience.

## Foundation & Journey

My journey began with a strong foundation in engineering at KIIT University, where I combined my mechanical engineering major with a computer science minor. This unique blend of disciplines shaped my approach to problem-solving — I think in systems, optimize for efficiency, and build for scale.

## Crafting Innovative Web Solutions

I specialize in architecting modular full-stack solutions, building reusable CMS frontends (ReactJS/TailwindCSS), and designing scalable, decoupled backends with FastAPI and Python, ensuring optimal and maintainable applications.

## What I Bring to the Table

- **Performance-First Architecture**: Revamped platforms serving 10M+ monthly users
- **AI Integration Expertise**: Applied LangChain and Vercel AI SDK to enhance application capabilities
- **Scalable Backend Design**: Built multi-tenant systems with workflow orchestration and secure authentication
- **Mentorship & Leadership**: Elevated team coding standards and best practices

## Philosophy

> "The goal isn't just to write code. It's to build experiences that scale and serve."

I believe in crafting solutions that are not just functional, but elegant, maintainable, and built to grow with the business.
