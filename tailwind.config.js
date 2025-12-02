/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cream: "hsl(var(--cream))",
        charcoal: "hsl(var(--charcoal))",
        stone: "hsl(var(--stone))",
        accent: "hsl(var(--accent))",
        "green-primary": "hsl(var(--green-primary))",
        "green-light": "hsl(var(--green-light))",
        "dark-bg": "hsl(var(--dark-bg))",
        "dark-section": "hsl(var(--dark-section))",
        "orange-accent": "hsl(var(--orange-accent))",
        "yellow-accent": "hsl(var(--yellow-accent))",
        "gold-accent": "hsl(var(--gold-accent))",
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

