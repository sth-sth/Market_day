# Market_day

Run with a configurable port:

```bash
PORT=5173 node server.js
```

Then open:

```text
http://localhost:5173
```

If PORT is not provided, the server defaults to `3000`.

## Deploy To Vercel

This project is a static web app. Vercel can deploy it directly from the repository root.

### Option 1: Deploy with Vercel Dashboard (recommended)

1. Push this repository to GitHub.
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import the `Market_day` repository.
4. In project settings:
	- Framework Preset: `Other`
	- Build Command: leave empty
	- Output Directory: leave empty
5. Click **Deploy**.

After deployment, Vercel gives you a production URL like:

```text
https://your-project-name.vercel.app
```

### Option 2: Deploy with Vercel CLI

Install CLI:

```bash
npm i -g vercel
```

From project root, run:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

### Notes

- `server.js` is for local development only.
- Vercel serves the static files (`index.html`, `app.js`, `data.js`, `styles.css`) directly.
- If you previously deployed with a Node/server preset, redeploy after this config update so Vercel uses static output instead of a serverless function.