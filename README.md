# 🚀 Git Grasp

**Git Grasp** is an AI-powered web-app that transforms any GitHub repository into a personalized, structured learning journey—complete with quizzes, level-based syllabuses, and grasp tracking.

> 💡 Designed to reduce ramp-up time for engineers joining new teams, projects, or open source communities.

---

## 🔍 What It Does

- 🔗 **Connect a GitHub Repo**  
  Securely authorize access to a repository to get started.

- 🧠 **Auto-Generate a Syllabus**  
  An AI agent analyzes the codebase and breaks it down into 10 learning levels based on complexity and depth.

- ❓ **Take Personalized Quizzes**  
  Each quiz is tailored to your current level and helps reinforce understanding of the project.

- 📊 **Track Your Grasp Score (0–10)**  
  Your grasp score evolves based on your quiz performance, recency of activity, and self-assessments.

- 📈 **Visualize Progress**  
  Get insights through progress charts for each project.

---

## 🛠️ Step-by-Step Setup

Follow these steps to set up **Git Grasp** quickly and effortlessly on your local machine.

### Clone and Install

```bash
git clone https://github.com/anoopkarnik/git-grasp.git
cd git-grasp
npm install
```

### Start Postgresql and n8n using Docker Compose

```bash
docker-compose -f docker-compose-tools.yml up -d // To start a local postgres instance and n8n instance
```

### Setup Environment Files

```bash
chmod +777 ./scripts/copy-env-files.sh
./scripts/copy-env-files.sh
```

Next, navigate to the environment configuration files located at:
    - apps/nextjs-app/.env
    - apps/nextjs-app/.env.local

Carefully review each file and fill in all necessary environment variables. Refer to the inline comments for detailed explanations of each required setting.

### Run Database Migrations and Dev Server

```bash
npm run db:migrate
npm run dev
```

### 🔑 n8n & OpenAI Configuration

1. Register on n8n
    - Visit http://localhost:5678 and sign up.

2. Add OpenAI Credentials
    - Navigate to Credentials → Add Credential → OpenAI.
    - Enter your OpenAI API key and verify the connection.

3. Add PostgreSQL Credentials
    - Navigate to Credentials → Add Credential → Postgres.
    - Configure with these settings:
          host: local-db
          database: postgres
          user: postgres
          password: password
          port: 5432


### 🤖 n8n Workflows Setup

You'll need two workflows:

1) Create Syllabus Workflow: 
    - Go to n8n and import the workflow file from: docker/Generate_Syllabus.json
    - Fix any node errors (red-highlighted) by refreshing credeStart exploring personalized syllabus and quizzes tailored directly from your GitHub repositories.ntials.
    - Copy the webhook ID from the trigger node's production URL (the string after the last /).
    - Add it to your GENERATE_SYLLABUS_N8N_WEBHOOK_URL environment variable in .env.local like 
       GENERATE_SYLLABUS_N8N_WEBHOOK_URL=http://localhost:5678/webhook/{webhook_id_here}

2) Create Quiz Workflow
    - Go to n8n and import the workflow file from: docker/Create_Quiz.json
    - Fix any node errors (red-highlighted) by refreshing credentials.
    - Copy the webhook ID from the trigger node's production URL (the string after the last /).
    - Add it to your CREATE_QUIZ_N8N_WEBHOOK_URL environment variable in .env.local like 
       CREATE_QUIZ_WEBHOOK_URL=http://localhost:5678/webhook/{webhook_id_here}

✅ Setup Complete!

Git Grasp is now ready locally.

---

## 👥 Who It's For

- **Startups** onboarding new engineers
- **Freelancers/Consultants** jumping into client projects
- **Open-source contributors** exploring new repos
- **Teams** focused on internal knowledge sharing

---

## 🧪 MVP Scope

✅ GitHub OAuth authentication  
✅ Repo-to-project linking (1:1)  
✅ Level-based syllabus generation (via n8n AI workflow)  
✅ MCQ and subjective quizzes (LLM auto-graded)  
✅ Grasp Score calculation  
✅ Dashboard, quizzes, and progress tabs  
✅ Encrypted user-supplied OpenAI API keys  

---

## 🛠 Tech Stack

- Next.js + Tailwind + ShadCN UI  
- PostgreSQL (via Supabase)  
- GitHub OAuth  
- n8n for AI agent workflows  
- OpenAI (user-provided API key) for content generation and feedback  
- Recharts for progress visualization  

---

## 🚧 Roadmap (Post-MVP)

- 🧑‍🏫 Team roles & permissions  
- 🧪 Code execution quizzes  
- 📦 Multi-repo project support  
- 🔔 Email/Slack reminders for score drops  
- 🤝 Human-in-the-loop reviews  
- 🔍 Team analytics & dashboards  

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
