# Punch Card 2.0 - Full-Stack Boxing Scorecard App

Built with Next.js, prisma, Neon Postgres, and NextAuth

Punch Card 2.0 is a fully rebuilt version of my boxing scorecard application, upgraded from a Vite/React frontend into a modern full-stack platform. This version introduces secure authentication, a cloud-hosted database, SSR-powered pages, and a scalable architecture for future expansion.

What's New in Version 2.0
* Migrated to full-stack Next.js (App Router)
* Cloud-backed database using Neon Postgres
* Prisma ORM with migrations & data modeling
* NextAuth Authentication
* Improved UI, search behavior, and state management
* Mobile-friendly scorekeeping interface
* Cleaner code structure and long-term maintainability

# Features
Authentication
* Secure email/password account creation
* Protected routes for user-specific scorecard history

Scorecards
* Create new fights with dynamic round scoring
* Save and review previous fights tied to your account
* Search for fights by fighter names
* Championship tagging and metadata for quick visual scan

Database & API
* Prisma models for Users, Fights, and Rounds
* Automatic migrations for schema updates
* Full API routes for creating, retrieving, and listing scorecards

Persistence
* Fight history stored in Neon Postgres

# Live Demo
👉 Score and record fights [here](https://punch-card-next.vercel.app)
