/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#085f89",
          primary: "#038fd2",
          hover: "#0277b0",
          tint: "#edf9ff",
          surface: "#ffffff",
          text: "#1e293b",
          muted: "#64748b",
          border: "#e2e8f0",
          borderHover: "#cbd5e1",
          subtle: "#f8fafc",
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
