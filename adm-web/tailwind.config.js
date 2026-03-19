/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        card: "#1E293B",
        primary: "#F59E0B",
        secondary: "#8B5CF6",
        success: "#22C55E",
        danger: "#EF4444",
        text: "#E2E8F0",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
}