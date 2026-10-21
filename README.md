# Kavya Labs

Kavya Labs is an AI startup web application built as a three-week client simulator project for the Full-Stack Development with AI Program.

## Project Overview

The project was delivered incrementally across three weekly briefs:

### Week 1 — Landing Page

- Responsive Kavya Labs landing page
- Hero section
- Features section
- Product interface preview
- Footer
- Responsive design

### Week 2 — Authentication

- Google OAuth authentication using Auth.js / NextAuth
- Persistent JWT sessions
- Protected dashboard
- Sign in and sign out functionality
- Authenticated user profile display



### Week 3 — Task Management Dashboard

- Authenticated user task dashboard at `/dashboard`

- Create persistent tasks

- View personal tasks

- Mark tasks as completed or pending

- Delete tasks

- Task statistics for total, completed, and pending tasks

- Per-user task isolation using the authenticated user identity

- Supabase-backed task persistence

- Task changes persist across page refreshes

- Server-side ownership checks for update and delete operations



### Week 3 — Admin Dashboard

- Admin-only protected `/admin` route
- Supabase-backed persistent user data
- Platform analytics
- User management table
- Search and sortable columns
- Active/Inactive filtering
- Enable and disable user accounts
- Persistent management actions
- Recent activity/audit log
- CSV user export
- Loading and error states
- Responsive admin interface



## Tech Stack

- Next.js
- React
- Tailwind CSS
- Auth.js / NextAuth
- Google OAuth
- Supabase
- Vercel



## Admin Access

The admin dashboard is available at:

`/admin`

Access is restricted to an authenticated Google account whose email matches the server-side `ADMIN_EMAIL` environment variable.

Unauthenticated visitors are redirected to the home page. Authenticated non-admin users are redirected to the standard dashboard.

## Environment Variables

The application requires the following environment variables:

```text

AUTH_SECRET=

AUTH_GOOGLE_ID=

AUTH_GOOGLE_SECRET=

SUPABASE_URL=

SUPABASE_SECRET_KEY=

ADMIN_EMAIL=

```

Secret values must be configured locally or through the deployment platform and must not be committed to Git.

## Local Development

Install dependencies:

```bash

npm install

```

Start the development server:

```bash

npm run dev

```

Then open:

`http://localhost:3000`

## Quality Checks

Run ESLint:

```bash

npm run lint

```

Create a production build:

```bash

npm run build

```



## Deployment

The application is deployed using Vercel. Production environment variables must be configured in Vercel before deployment.