---
entries:
  - id: "1"
    slug: "artha"
    title: "Artha"
    subtitle: "Local-First RAG Platform"
    description: "Architected a completely local, Retrieval-Augmented Generation (RAG) platform utilizing FastAPI and Next.js, ensuring zero external API dependencies for strict data privacy."
    githubUrl: "https://github.com/Tusharyadav21/artha"
    tags: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Redis", "Ollama"]
    role: "Full Stack Developer"
    duration: "3 months"
    teamSize: "Solo"
    highlights:
      - "Completely local RAG architecture for data privacy"
      - "Asynchronous document ingestion using Redis and ARQ"
      - "Advanced retrieval with Reciprocal Rank Fusion (RRF)"
      - "Resilient agentic workflows with LangGraph state machines"
    architecture: |
      Artha uses a microservices architecture with FastAPI handling the API layer and Next.js providing the frontend. The RAG pipeline consists of:

      1. **Document Ingestion**: Documents are parsed, chunked, and embedded using local Ollama models. Chunks are stored in PostgreSQL with pgvector for semantic search.

      2. **Query Processing**: User queries go through a multi-step pipeline: query rewriting, HyDE (Hypothetical Document Embeddings) fallback, and hybrid search combining semantic and keyword matching.

      3. **Retrieval**: Results are ranked using Reciprocal Rank Fusion (RRF) combining multiple retrieval strategies. A quality gate validates results before passing to the LLM.

      4. **Generation**: The context-augmented prompt is sent to a local Ollama model for response generation with source citations.
    challenges:
      - "Handling document versioning and updates without re-indexing everything"
      - "Optimizing local model performance without GPU acceleration"
      - "Designing fault-tolerant agentic workflows with LangGraph"
      - "Implementing effective quality gates for retrieval results"
    learnings:
      - "Local-first architecture requires careful resource management"
      - "LangGraph state machines excel at complex workflow orchestration"
      - "Reciprocal Rank Fusion significantly improves retrieval quality"
      - "Async processing with Redis queues is essential for document ingestion"
    futureWork:
      - "Multi-modal document support (images, tables)"
      - "Collaborative knowledge base with real-time sync"
      - "Advanced analytics dashboard for query patterns"
  - id: "2"
    slug: "articles"
    title: "Articles"
    subtitle: "AI-Assisted Publishing Platform"
    description: "Architected a schema-driven content publishing platform leveraging a ProseMirror-based rich text editor (Tiptap). Engineered a scalable JSON-based document data model to ensure content consistency and seamless cross-platform rendering."
    liveUrl: "https://articles.encaenia.co.in/"
    tags: ["Next.js", "React", "Tiptap", "TypeScript", "GenAI"]
    role: "Full Stack Developer"
    duration: "2 months"
    teamSize: "Solo"
    highlights:
      - "Schema-driven content publishing platform"
      - "Scalable JSON-based document data model"
      - "Custom editor extensions for AI-enhanced workflows"
      - "Advanced React caching strategies for frontend optimization"
    architecture: |
      Articles uses a schema-first approach where content structure is defined in JSON Schema, enabling:

      1. **Editor Layer**: Tiptap-based rich text editor with custom extensions for AI assistance, content validation, and real-time preview.

      2. **Data Model**: JSON-based document format that separates content from presentation, enabling cross-platform rendering.

      3. **AI Integration**: Custom extensions that leverage GenAI for content suggestions, SEO optimization, and readability analysis.

      4. **Publishing Pipeline**: Automated content validation, image optimization, and deployment to multiple channels.
    challenges:
      - "Designing a flexible schema system that supports diverse content types"
      - "Implementing real-time collaboration without conflicts"
      - "Optimizing editor performance with large documents"
      - "Building AI extensions that enhance rather than disrupt the writing flow"
    learnings:
      - "Schema-driven approaches significantly improve content consistency"
      - "Tiptap's extension system is powerful but requires careful performance tuning"
      - "JSON-based content models enable excellent cross-platform compatibility"
      - "AI assistance works best when it's opt-in and context-aware"
    futureWork:
      - "Real-time collaborative editing"
      - "Multi-language content support"
      - "Advanced analytics for content performance"
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
