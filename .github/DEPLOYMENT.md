# CI/CD Deployment Guide

## GitHub Actions Workflows

### 1. Main CI/CD Pipeline (`deploy.yml`)
Automatically runs on push to main branch:
- Builds and tests backend
- Builds and tests frontend
- Deploys frontend to GitHub Pages

### 2. Render Backend Deployment (`render-deploy.yml`)
Automatically deploys backend to Render when backend files change.

## Required GitHub Secrets

Add these secrets in: Repository Settings → Secrets and variables → Actions

### Firebase Configuration:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### API Configuration:
- `VITE_API_URL` - Your Render backend URL (e.g., https://your-app.onrender.com/api/auth)

### Render Configuration:
- `RENDER_DEPLOY_HOOK_URL` - Get from Render dashboard → Settings → Deploy Hook

## Setup Instructions

### Backend (Render):
1. Create a Web Service on Render
2. Connect your GitHub repo
3. Set Root Directory: `backend`
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add all environment variables from backend/.env
7. Copy the Deploy Hook URL
8. Add it as `RENDER_DEPLOY_HOOK_URL` secret in GitHub

### Frontend (GitHub Pages):
1. Enable GitHub Pages in repository settings
2. Set source to "gh-pages" branch
3. Add all required secrets
4. Push to main branch to trigger deployment
