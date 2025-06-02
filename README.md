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
