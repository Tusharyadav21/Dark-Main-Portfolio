# 🚀 Tushar Yadav's Portfolio Documentation

## 🧭 Overview

Welcome to **Tushar Yadav’s full-stack portfolio**, built with a modern tech stack — **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Node.js**.  
This portfolio highlights Tushar’s expertise in scalable front-end and back-end development, featuring multiple pages, API routes, reusable UI components, and strong performance optimizations.

---

## ⚙️ Setup & Installation

1. **Clone or download** the project:
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**

   Create a .env.local file and configure your required keys (see .env.example).

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🧩 Core Dependencies

    ⚡ Next.js 16

    ⚛️ React 19

    🧠 TypeScript

    🎨 Tailwind CSS

    ✉️ Resend API – for email functionality

    🧬 Vercel AI SDK

    🧰 Various utility and icon libraries

## 🗂️ Project Structure

```bash
app/
  api/
    chat/
      route.ts          # Chat API logic
    contact/
      route.ts          # Contact form API logic
  pages/                # Traditional pages
  components/           # Reusable UI components
    ui/                 # Buttons, forms, cards, tooltips, etc.
    app-sidebar.tsx     # Sidebar component
    message.tsx         # Chat messages display
    top-bar.tsx         # Top navigation bar
  layout.tsx            # Main layout (sidebar + header)
  page.tsx              # Home page
  projects/page.tsx     # Projects showcase
  contact/page.tsx      # Contact page
  chat/page.tsx         # Chat interface
  _not-found.tsx        # Custom 404 page

lib/
  utils.ts              # Utility functions

public/
  file.svg, globe.svg, ... # Static assets

.env.example            # Environment variable template
package.json            # Dependencies & scripts
next.config.ts          # Next.js configuration
README.md               # Project overview
```

## 🌟 Features & Best Practices

🖥️ **Responsive Design** : Built with Tailwind CSS, ensuring a clean, mobile-first responsive layout.

🔍 **SEO & Metadata** : Optimized meta tags, Open Graph data, Twitter Cards, and sitemap integration.

⚡ **Performance Optimization** : Leverages Next.js image optimization, lazy loading, caching, and static generation.

♿ **Accessibility** : Semantic HTML, ARIA labels, and visible focus indicators for inclusive UX.

🔒 **Security** : Input validation with Zod, proper CORS policies, and API rate limiting.

🚨 **Error Handling** : Custom error pages and structured API responses for better debugging.

📈 **Monitoring & Analytics** : Integrated Sentry, Google Tag Manager, and Web Vitals tracking.

🧼 **Code Quality** : Maintained with ESLint, Prettier, and clean modular architecture.

## 🚢 Deployment & CI/CD

    Automated deployments via Vercel
    GitHub Actions for testing and build pipelines
    Lighthouse audits for performance and accessibility
    Dependabot for dependency updates and monitoring

## 🔮 Future Enhancements

1. 📱 PWA Integration for offline capability
2. 📝 Blog Section for tutorials and articles
3. 📄 Resume Download option
4. 💬 Testimonials & case studies
5. 🔎 Structured Data for enhanced SEO
6. ♿ Continued Accessibility Improvements

## **🧑‍💻 Author**

### Tushar Yadav

#### Full-Stack Developer • Passionate about clean UI, scalable systems, and developer experience.
