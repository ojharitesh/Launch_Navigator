# LaunchNavigator

A full-stack SaaS platform that helps entrepreneurs start and operate small businesses by guiding them through legal setup, compliance requirements, operational tools, and ongoing regulatory monitoring.

## Features

- **Smart Checklists**: Personalized task lists based on state, industry, and business type
- **Compliance Tracking**: Track licenses and permits with automatic expiration reminders
- **Inspection Scheduling**: Keep track of upcoming inspections and deadlines
- **POS Comparison**: Compare different POS systems for your business
- **Progress Tracking**: Visual progress tracking with milestone celebrations
- **Multi-Industry Support**: Works with restaurants, retail, construction, healthcare, technology, and more

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor
   - Copy `.env.example` to `.env.local` and add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Project Structure

```
launch-navigator/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── roadmap/page.tsx
│   │   ├── compliance/page.tsx
│   │   ├── inspections/page.tsx
│   │   ├── pos-comparison/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/callback/route.ts
│   │   ├── tasks/route.ts
│   │   ├── user-tasks/route.ts
│   │   ├── licenses/route.ts
│   │   └── inspections/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── onboarding/page.tsx
├── components/
│   ├── ui/ (Button, Card, Input, etc.)
│   ├── dashboard/ (StatsCard, ProgressCard, AlertCard)
│   ├── roadmap/ (TaskCard)
│   └── layout/ (Sidebar)
├── lib/
│   ├── supabase.ts (client)
│   ├── supabase-server.ts (server)
│   └── utils.ts
├── types/
│   └── index.ts
├── hooks/
│   ├── useAuth.ts
│   └── useTasks.ts
└── data/
    └── seed-tasks.ts (task templates)
```

## Database Schema

The app uses the following tables in Supabase:

- **profiles**: User profiles with business info
- **tasks**: Template tasks by state and business type
- **user_tasks**: User's assigned tasks with completion status
- **licenses**: User's licenses and permits
- **inspections**: User's inspection schedules

## License

MIT
