# Companies Directory — Modern React (Vite + Tailwind)

This project is a modern, responsive Companies Directory built with React + Vite + Tailwind CSS.
It includes infinite scroll, filtering, sorting, accessible controls, and a company details modal.

## Run locally
1. Extract the ZIP.
2. `cd companies-directory-v2`
3. `npm install`
4. `npm run dev`
5. Open http://localhost:5173

## Features
- Responsive card grid and table-ready structure
- Infinite scroll (IntersectionObserver)
- Search & filters (location, industry)
- Sorting (name, employees)
- Loading, error, and empty states
- Company details modal
- Accessible controls and semantic HTML

## Tech
React 18, Vite, Tailwind CSS, Context API

## Files
- `public/companies.json` — mock API dataset
- `src/context/companyContext.jsx` — main state & filtering logic
- `src/components/*` — UI components
- `PROMPT.md` — original prompt used to generate the project

## Notes
The project uses a static JSON in `public/` so no backend is required. It is ready to deploy to Netlify/Vercel.
