# CI/CD Deployment Guide

## GitHub Actions Workflows

### 1. Main CI/CD Pipeline (`deploy.yml`)
Automatically runs on push to main branch:
- Builds and tests backend
- Builds and tests frontend
- Deploys to GitHub Pages

### 2. Vercel Deployment (`vercel-deploy.yml`)
Alternative deployment to Vercel platform.

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
- `VITE_API_URL` - Your backend API URL

### Vercel (if using):
- `VERCEL_TOKEN` - Get from Vercel account settings
- `VERCEL_ORG_ID` - From Vercel project settings
- `VERCEL_PROJECT_ID` - From Vercel project settings

## Setup Instructions

1. Enable GitHub Pages in repository settings
2. Set source to "gh-pages" branch
3. Add required secrets
4. Push to main branch to trigger deployment

## Disable Unused Workflow

If using GitHub Pages, disable Vercel workflow:
- Go to Actions tab
- Select workflow
- Click "..." → Disable workflow
