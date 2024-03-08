/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "text":"var(--text)",
        "text-heading":"var(--text-heading)",
        "checks":"var(--checks)",
        "primary-background":"var(--primary-background)",
        "secondary-background":"var(--secondary-background)",
      }
    },
  },
  plugins: [],
}

