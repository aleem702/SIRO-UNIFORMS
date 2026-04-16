# 🚀 SIRO Uniforms — Hosting Cheatsheet

This guide will get your platform live on **Vercel** (Frontend), **Render** (Backend), and **Supabase** (Database) for free.

---

## 1. 🗄️ Database (Supabase)
1.  Go to [supabase.com](https://supabase.com/) and create a new project.
2.  Go to **Project Settings -> Database**.
3.  Copy the **URI** connection string. It looks like:
    `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres`

---

## 2. 🐍 Backend (Render)
1.  Go to [render.com](https://render.com/) and create a new **Web Service**.
2.  Connect your GitHub repository.
3.  Set **Root Directory** to `backend`.
4.  Set **Build Command** to `./build.sh`.
5.  Set **Start Command** to `gunicorn fabricos.wsgi:application`.
6.  Go to the **Environment** tab and add these variables:
    | Key | Value |
    | :--- | :--- |
    | `DATABASE_URL` | *Your Supabase URI string* |
    | `SECRET_KEY` | *Generate a random long string* |
    | `DEBUG` | `False` |
    | `ALLOWED_HOSTS` | `*` (or your Render URL) |

---

## 3. 🚀 Frontend (Vercel)
1.  Go to [vercel.com](https://vercel.com/) and create a new project.
2.  Connect your GitHub repository.
3.  Set **Root Directory** to `frontend`.
4.  Astro will be auto-detected. Keep the default build settings.
5.  **Environment Variables**: Add `PUBLIC_API_URL` and set it to your **Render Web Service URL** (e.g., `https://siro-backend.onrender.com`).
6.  Click **Deploy**.

---

## 💡 Pro Tips for Demos
- **Wake Up the Backend**: Render's free tier "sleeps" after 15 minutes. Always open the site 5 minutes before your demo to ensure it's awake.
- **Media Files**: Since Render's free tier has no persistent storage, images uploaded via the Admin panel will disappear on redeploy. Use the built-in catalog data for your primary demo.
