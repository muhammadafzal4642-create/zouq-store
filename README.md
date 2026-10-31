<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ce7fbb14-fb6c-4527-bc93-c4771c1aa99f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

Import the repository into Vercel. The included `vercel.json` builds the Vite frontend and serves it from `dist`; API requests are handled by the Express function in `api/[...path].ts`.

Add these environment variables in the Vercel project settings before deploying:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` (use a long, random value)

Set the same variables in a local `.env` file to use the admin portal during development. Do not commit `.env` or use the example values from `.env.example` in production.

The current store data is persisted to `data/store.json`. Vercel Functions have ephemeral, read-only application files, so product and order changes are not durable across deployments or function instances. Connect a hosted database before relying on persistent store data in production; this deployment setup does not change the existing storage model.
