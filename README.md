# Sudip Pandit Portfolio

A modern personal portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Features

- Responsive portfolio website with animated UI sections
- Admin dashboard modal for updating portfolio content
- Image upload endpoint for admin content updates
- Local save API for writing updates into files during development

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
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

How to get these values:

1. Create a free Cloudinary account.
2. Copy your cloud name from the Cloudinary dashboard.
3. Create an **unsigned upload preset** in Cloudinary Settings > Upload.
4. Add both values to `.env.local` for local development.
5. Add the same variables in Vercel Project Settings > Environment Variables.

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

- `app/api/admin/save/route.ts` already checks `process.env.VERCEL` and avoids disk writes in production.
- `app/api/admin/upload/route.ts` uploads to Cloudinary if `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` are set.
- If Cloudinary is not configured on Vercel, the upload API returns an explicit error so missing setup is obvious.

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

1. Move admin PIN to environment variables (server-only), not client-exposed config.
2. Replace plain PIN check with hashed secret verification.
3. Add rate limiting to admin authentication endpoint.
4. Use persistent object storage for uploaded images.

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - lint project
