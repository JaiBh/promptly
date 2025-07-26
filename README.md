# 💡 Promptly

Promptly is an AI-powered web app that lets you generate simple websites from natural language prompts. Enter a description—Promptly creates a functional, ready-to-edit Next.js app for you in seconds.

> 🔗 **Live Demo**: [jaibh-promptly.vercel.app](https://jaibh-promptly.vercel.app/)  
> 🧠 **GitHub Repo**: [github.com/JaiBh/promptly](https://github.com/JaiBh/promptly)

# Project origins:

Promptly is based on this [tutorial by Coding with Antonio](https://www.youtube.com/watch?v=xs8mWnbMcmc), which covers building an AI-powered site generator in Next.js.

My contributions include:

– Adding a gallery page to showcase generated sites
– Making the UI fully responsive for mobile and tablet
– Implementing the ability to delete AI-generated projects

---

## 🧰 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Frontend**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Type Safety**: TypeScript
- **Authentication**: [Clerk](https://clerk.com/)
- **Billing**: [Clerk Billing](https://clerk.com/billing)
- **AI Generation**: [OpenAI API](https://openai.com/)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **Sandboxed Code Execution**: [E2B](https://e2b.dev/)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## ⚙️ Features

- 🔐 User Authentication (via Clerk)
- 🤖 AI Website Generation from natural language prompts (via OpenAI)
- 💡 Suggested Prompts for instant inspiration
- 🖼️ Example Gallery showcasing real generated sites
- 👀 Live Preview & Code Viewer for generated sites
- 💳 Billing & Plan Management (via Clerk Billing)
- ⚡ Background Job Processing (via Inngest)
- 🛡️ Sandboxed Code Execution (via E2B)

---

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/JaiBh/promptly.git
cd promptly
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**
   Create a `.env` file using `.env.example` and fill in the required values (Clerk keys, database URL, etc).

4. **Run the dev server:**

```bash
npm run dev
```

---

## 📁 Project Structure

```
/
├── prisma/                # Prisma database schema and migrations
├── public/                # Static assets (images, icons, etc.)
├── sandbox-templates/     # Code templates for E2B sandboxes
├── src/
│   ├── app/               # Next.js App Router (routes, pages, layouts, API)
│   │   ├── (home)/        # Main site pages (e.g. pricing, sign-in)
│   │   ├── api/           # API route handlers (incl. inngest, trpc)
│   │   ├── gallery/       # Gallery page routes
│   │   └── projects/      # Project-specific routes
│   ├── components/        # Reusable React UI components
│   │   └── ui/            # UI primitives (buttons, inputs, etc. from ShadCN)
│   ├── generated/         # Auto-generated code (e.g. Prisma types)
│   ├── hooks/             # Custom React hooks
│   ├── inngest/           # Inngest event/workflow handlers
│   ├── lib/               # Utilities and helper functions
│   ├── modules/           # Feature modules (home, messages, projects, usage)
│   └── trpc/              # tRPC routers and API structure
├── .env.example           # Example environment variables
├── next.config.js         # Next.js config
├── package.json           # Project metadata and dependencies
├── README.md              # This file
└── tsconfig.json          # TypeScript config
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory and include:

```
DATABASE_URL=...
NEXT_PUBLIC_APP_URL=...

# openai
OPENAI_API_KEY=..

# e2b
E2B_API_KEY=...

# clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

```

---

## 🧑‍💻 Author

Built by [**Jai Bhullar**](https://jaibh-portfolio.vercel.app/) – aspiring front-end/full-stack developer based near London.

- 📫 Email: jaibhullar.developer@outlook.com
- 🔗 **LinkedIn:** [linkedin.com/in/jai-bhullar-dev](https://www.linkedin.com/in/jai-bhullar-dev)
- 📄 [View My CV](https://drive.google.com/drive/folders/11INqiG1lzqst5JbgNXueFMdqKZr6JfP9?usp=sharing)

---

## 📝 License

MIT License. Feel free to use, modify, or contribute!
