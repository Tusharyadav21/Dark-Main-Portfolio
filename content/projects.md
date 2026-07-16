---
entries:
  - id: "1"
    slug: "artha"
    title: "Artha"
    subtitle: "Local-First RAG Platform"
    description: "Architected a local-first RAG platform with FastAPI and Next.js, designed to run without external model APIs for privacy-sensitive document search."
    githubUrl: "https://github.com/Tusharyadav21/artha"
    tags: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Redis", "Ollama"]
    role: "Full Stack Developer"
    duration: "3 months"
    teamSize: "Solo"
    highlights:
      - "Local-first RAG architecture for privacy-sensitive document search"
      - "Asynchronous ingestion pipeline with Redis and Celery"
      - "Hybrid retrieval with vector search, trigram matching, RRF, and reranking"
      - "LangGraph workflows with query rewriting, quality gates, and HyDE fallback"
    architecture: |
      Artha uses a local-first architecture with FastAPI handling the API layer and Next.js providing the frontend. The RAG pipeline consists of:
      1. **Document Ingestion**: Documents are parsed, hierarchically chunked, embedded, and processed asynchronously using Redis and Celery to avoid blocking user workflows.
      2. **Query Processing**: User queries pass through query rewriting, retrieval quality checks, and HyDE fallback paths when confidence is low.
      3. **Retrieval**: Hybrid retrieval combines vector similarity, trigram search, Reciprocal Rank Fusion (RRF), and reranking to improve recall and precision on technical documents.
      4. **Generation**: Context is passed to local Ollama models for grounded response generation, with GraphRAG-inspired relationship-aware retrieval patterns explored to improve context selection.
    challenges:
      - "Handling document versioning and updates without re-indexing entire corpora"
      - "Optimizing local model performance and retrieval quality on technical documents"
      - "Designing fault-tolerant LangGraph workflows with quality gates and fallbacks"
      - "Balancing retrieval recall, precision, and latency in a hybrid search pipeline"
    learnings:
      - "Local-first systems require careful orchestration of compute, storage, and queueing"
      - "Hybrid retrieval significantly improves robustness over single-strategy search"
      - "LangGraph works well for resilient retrieval and decision workflows"
      - "Asynchronous ingestion is essential for scalable document processing"
    futureWork:
      - "Multi-modal document support for images, tables, and diagrams"
      - "Collaborative knowledge base features with fine-grained access control"
      - "Advanced retrieval evaluation and observability dashboards"

  - id: "2"
    slug: "articles"
    title: "Articles"
    subtitle: "AI-Assisted Publishing Platform"
    description: "Architected a decoupled content publishing platform with a Next.js frontend and Go backend, using a schema-driven ProseMirror JSON document model for structured storage, deterministic rendering, and scalable multi-client evolution."
    liveUrl: "https://articles.encaenia.co.in/"
    tags: ["Go", "Next.js", "React", "TypeScript", "Better Auth", "PostgreSQL", "GenAI"]
    role: "Full Stack Developer"
    duration: "2 months"
    teamSize: "Solo"
    highlights:
      - "Decoupled Next.js frontend and Go backend for independent scalability"
      - "Schema-driven ProseMirror JSON document model"
      - "React Server Components, request deduplication, and caching optimizations"
      - "AI-powered editing workflows for generation, rewriting, and contextual assistance"
    architecture: |
      Articles uses a decoupled architecture with a Next.js frontend and Go backend to support maintainability and future multi-client expansion:
      1. **Frontend Layer**: Next.js 16 with React and TypeScript powers the authoring and publishing experience using modern rendering patterns.
      2. **Document Model**: A schema-driven ProseMirror JSON model stores structured content for deterministic rendering and extensible editor capabilities.
      3. **Backend Services**: Go services handle content workflows, persistence, authentication integration, and publishing operations independently of the frontend.
      4. **Performance & AI**: React Server Components, request deduplication, and caching reduce redundant network work, while AI-assisted editing features support drafting, rewriting, and contextual suggestions.
    challenges:
      - "Designing a document model flexible enough for rich editorial workflows"
      - "Keeping editor interactions fast while supporting structured content and AI features"
      - "Maintaining clean boundaries between frontend rendering and backend content services"
      - "Reducing redundant requests and improving rendering efficiency across the app"
    learnings:
      - "Decoupled systems improve maintainability and enable independent scaling"
      - "Schema-driven content models make rendering more predictable and extensible"
      - "React Server Components and caching can significantly improve perceived performance"
      - "AI assistance is most useful when embedded directly into the authoring workflow"
    futureWork:
      - "Multi-tenant support for multiple publications and clients"
      - "Collaborative editing and editorial review workflows"
      - "Analytics for content performance and author productivity"

  - id: "3"
    slug: "chat-api"
    title: "Chat API"
    subtitle: "RAG-Powered Conversational AI"
    description: "Python-based chat API integrating retrieval-augmented generation (RAG) with structured tool access for real-time data. Implemented conversation memory and semantic context retrieval pipelines to improve LLM accuracy in technical support and project assistance workflows."
    githubUrl: "https://github.com/Tusharyadav21/chat_api"
    tags: ["Python", "FastAPI", "LangChain", "RAG"]
    role: "Backend Developer"
    duration: "1 month"
    teamSize: "Solo"
    highlights:
      - "RAG integration for real-time data access"
      - "Conversation memory & semantic context retrieval"
      - "Technical support workflow optimization"
    architecture: |
      Chat API implements a modular architecture with clear separation of concerns:
      1. **Conversation Manager**: Handles session state, message history, and context windowing for multi-turn conversations.
      2. **RAG Pipeline**: Retrieves relevant documents using semantic search and formats them as context for the LLM.
      3. **Tool Integration**: Structured tool access allows the LLM to query databases, APIs, and external services.
      4. **Response Generator**: Combines conversation history, retrieved context, and tool results to generate accurate responses.
    challenges:
      - "Managing context window limits while preserving conversation flow"
      - "Implementing effective tool discovery and invocation"
      - "Handling concurrent conversations without resource contention"
      - "Balancing response quality with latency requirements"
    learnings:
      - "Structured tool access significantly improves LLM capabilities"
      - "Conversation memory management is critical for multi-turn interactions"
      - "RAG pipelines need careful tuning for domain-specific content"
      - "FastAPI's async capabilities are essential for real-time chat"
    futureWork:
      - "Streaming response support"
      - "Multi-modal input (images, files)"
      - "Advanced tool orchestration"

  - id: "4"
    slug: "omdb-movie-app"
    title: "OMDB Movie App"
    subtitle: "Movie Search & Discovery"
    description: "Movie search application powered by the OMDB API with advanced filtering options, caching, and debounced search for optimal performance."
    liveUrl: "https://omdb-api-task.netlify.app/"
    githubUrl: "https://github.com/Tusharyadav21/OMDB-API-App"
    tags: ["React", "API", "Axios", "Caching"]
    role: "Frontend Developer"
    duration: "1 week"
    teamSize: "Solo"
    highlights:
      - "OMDB API integration"
      - "Debounced search optimization"
      - "Advanced filtering options"
    architecture: |
      A clean React application with:
      1. **Search Layer**: Debounced input with instant feedback and search history.
      2. **Filter System**: Genre, year, and rating filters with URL-based state management.
      3. **Caching Layer**: Client-side caching to minimize API calls and improve performance.
      4. **Detail Views**: Movie details with trailers, cast, and similar recommendations.
    challenges:
      - "Implementing efficient debouncing without lag"
      - "Managing complex filter states across navigation"
      - "Optimizing API calls with caching strategies"
      - "Handling loading states and error boundaries"
    learnings:
      - "Debouncing is essential for API-backed search features"
      - "Client-side caching dramatically improves user experience"
      - "URL-based state management enables shareable searches"
      - "Error boundaries prevent cascading failures"
    futureWork:
      - "User watchlist and favorites"
      - "Social features (reviews, ratings)"
      - "Offline support with service workers"

  - id: "5"
    slug: "todo-app"
    title: "ToDo App"
    subtitle: "Task Management"
    description: "Redux-powered task manager with persistence, enabling users to efficiently organize and track their tasks with a clean, intuitive interface."
    liveUrl: "https://react2do.netlify.app/"
    githubUrl: "https://github.com/Tusharyadav21/ToDo-App"
    tags: ["React", "Redux", "JavaScript"]
    role: "Frontend Developer"
    duration: "3 days"
    teamSize: "Solo"
    highlights:
      - "Redux state management"
      - "Local storage persistence"
      - "Clean, intuitive UI"
    architecture: |
      Simple yet effective Redux architecture:
      1. **Store**: Centralized state with Redux for predictable updates.
      2. **Actions**: Clear action types for CRUD operations.
      3. **Reducers**: Pure functions for state transformations.
      4. **Persistence**: LocalStorage integration for data survival across sessions.
    challenges:
      - "Designing intuitive drag-and-drop interactions"
      - "Implementing efficient localStorage serialization"
      - "Handling optimistic updates with Redux"
      - "Creating accessible keyboard navigation"
    learnings:
      - "Redux provides excellent state predictability"
      - "LocalStorage is sufficient for simple persistence needs"
      - "Clean UI design requires careful attention to spacing and typography"
      - "Accessibility should be built in from the start"
    futureWork:
      - "Collaborative task boards"
      - "Due dates and reminders"
      - "File attachments"

  - id: "6"
    slug: "url-shortener"
    title: "URL Shortener"
    subtitle: "Link Management Service"
    description: "A simple yet powerful URL shortening service built with modern web technologies for creating shareable, shortened links."
    githubUrl: "https://github.com/Tusharyadav21/url-shortner"
    tags: ["Node.js", "Express", "MongoDB"]
    role: "Backend Developer"
    duration: "1 week"
    teamSize: "Solo"
    highlights:
      - "Custom short URL generation"
      - "Link analytics tracking"
      - "RESTful API design"
    architecture: |
      A RESTful service with:
      1. **URL Service**: Handles URL validation, shortening, and redirection.
      2. **Analytics Engine**: Tracks clicks, referrers, and geographic data.
      3. **Storage Layer**: MongoDB for flexible document storage.
      4. **API Layer**: Express-based REST API with rate limiting and authentication.
    challenges:
      - "Designing collision-resistant short URL generation"
      - "Implementing efficient analytics aggregation"
      - "Handling high-traffic redirects with minimal latency"
      - "Ensuring data consistency across distributed systems"
    learnings:
      - "MongoDB's flexible schema works well for analytics data"
      - "Rate limiting is essential for public APIs"
      - "Proper indexing dramatically improves query performance"
      - "RESTful design principles simplify API consumption"
    futureWork:
      - "Custom aliases and branded links"
      - "QR code generation"
      - "Advanced analytics dashboard"
---