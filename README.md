# Sudip Pandit Portfolio

A modern personal portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Prisma ORM
- PostgreSQL (Render-compatible)

## Features

- Responsive portfolio website with animated UI sections
- Admin dashboard modal for updating portfolio content
- Image upload endpoint for admin content updates
- PostgreSQL-backed portfolio state for persistent content updates

## Project Structure

- `app/` - Next.js app routes and API routes
- `components/` - Reusable UI and section components
- `context/` - Global portfolio state management
- `data/` - Portfolio content source files
- `public/` - Static files (images, resume, SEO files)

## Getting Started (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open http://localhost:3000

### 3. Production build test

```bash
npm run build
npm run start
```

## Admin Access

- Admin PIN is currently defined in `data/siteConfig.ts` as `adminPin`.
- For security, do not expose real PIN values in UI text/placeholder hints.
- In production (for example on Vercel), file writes are not persistent because the server file system is read-only/ephemeral.
- Image uploads are persistent in production when Cloudinary environment variables are configured.

## Environment Variables

Create a `.env.local` file in the project root:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
ADMIN_PIN=your_secure_admin_pin
```

How to get these values:

1. Create a PostgreSQL database (Render PostgreSQL is supported).
2. Copy the external PostgreSQL URL and set it as `DATABASE_URL`.
3. Create a free Cloudinary account.
4. Copy your cloud name from the Cloudinary dashboard.
5. Create an **unsigned upload preset** in Cloudinary Settings > Upload.
6. Add all values to `.env.local` for local development.
7. Add the same variables in Vercel Project Settings > Environment Variables.

## Database Setup (Prisma)

Generate Prisma client:

```bash
npm run prisma:generate
```

Create/apply local migrations:

```bash
npm run prisma:migrate -- --name init_portfolio_content
```

For production deployments, apply existing migrations:

```bash
npm run prisma:deploy
```

## Deployment

### Option A: Deploy on Vercel (Recommended)

1. Push project to GitHub.
2. Go to https://vercel.com and sign in.
3. Click **Add New Project** and import your repository.
4. Vercel should auto-detect Next.js settings.
5. Keep defaults:
   - Build Command: `npm run build`
   - Install Command: `npm install`
6. Click **Deploy**.

#### Notes for this project on Vercel

- `app/api/admin/save/route.ts` saves portfolio content to PostgreSQL via Prisma.
- `app/api/admin/upload/route.ts` uploads to Cloudinary if `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` are set.
- If Cloudinary is not configured on Vercel, the upload API returns an explicit error so missing setup is obvious.

### Render PostgreSQL + Vercel Deployment Flow

1. Create PostgreSQL database in Render.
2. Copy Render external database URL.
3. In Vercel, set `DATABASE_URL` to the Render URL (keep `sslmode=require`).
4. In Vercel, set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_UPLOAD_PRESET`, and `ADMIN_PIN`.
5. Redeploy in Vercel.
6. Ensure migrations are applied using `npm run prisma:deploy` during deployment pipeline.

### Option B: Deploy on your own Node server

1. Clone the repository on your server.
2. Install dependencies:

```bash
npm install
```

3. Build app:

```bash
npm run build
```

4. Start app:

```bash
npm run start
```

5. Put it behind a reverse proxy (Nginx/Caddy) and enable HTTPS.

## Important Production Security Improvements (Recommended)

1. Replace plain PIN check with hashed secret verification.
2. Add rate limiting to admin authentication endpoint.
3. Optionally move admin login to server-issued session tokens.

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - lint project
