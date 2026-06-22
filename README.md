# 🚀 Full-Stack Enterprise Task Board Manager

A production-ready, full-stack Todo application built using a decoupled architecture. It features a robust, multi-layered RESTful API on the backend and a modern, high-performance web client on the frontend.

## 🛠️ Tech Stack & Architecture

### Backend API
- **Runtime:** Node.js (v24+) with native **ES Modules** (`"type": "module"`)
- **Framework:** Express.js 
- **Database:** MongoDB with Mongoose ODM
- **Validation Layer:** `express-validator` for declarative input verification
- **Architecture:** Controller-Service-Model Separation of Concerns (SoC)

### Frontend Client
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Type Safety)
- **Styling:** Tailwind CSS (Mobile-first, Responsive Design)
- **State Management:** Custom React Hooks with built-in debounced lookup engines

---

## 📁 Repository Structure

```text
todo-application/
├── todo-api/                 # Backend RESTful API Layer
│   ├── config/               # Database Connection Engines
│   ├── controllers/          # Network Request Controllers
│   ├── middleware/           # Centralized Validation & Error Pipelines
│   ├── models/               # Mongoose Schemas & Database Indexes
│   ├── routes/               # Express Routing Interfaces
│   ├── services/             # Core Business Logic Layer
│   └── validators/           # express-validator Rules
│
└── todo-frontend/            # Next.js App Router Client
    ├── app/                  # Route Layouts & Pages
    ├── components/           # Atomic UI Layout Elements (Skeletons, Forms, Items)
    ├── hooks/                # useTodos Global State Orchestrator
    ├── lib/                  # Fetch API Wrapper Clients
    └── types/                # Shared TypeScript Type Modules


    