/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#F5F5FF",
          100: "#E0E0FF",
          200: "#D1D1FF",
          300: "#BCBCFF",
          400: "#AFAFFF",
          500: "#9B9BFF",
          600: "#8C8CF7",
          700: "#6B6BDA",
          800: "#4F4F98",
          900: "#1E1E47",
        },
        // gray: {
        //   100: "#EEEEEE",
        //   200: "#CACCCC",
        //   300: "#A1A5A4",
        //   500: "#585E5B",
        //   900: "#141414",
        // },
        gray: {
          200: "#CACCCC",
          300: "#A1A5A4",
          400: "#585E5B",
        },
        black: "#00170D",
      },
      backgroundImage: {
        "bg-img-1": "url('/bg-values.png')",
        
        // "bg-img-2": "url('/img-2.png')",
        // "feature-bg": "url('/feature-bg.png')",
        // pattern: "url('/pattern.png')",
        // "pattern-2": "url('/pattern-bg.png')",
      },
      screens: {
        xs: { max: "480px" },
        md: { min: "481px", max: "1024px" },
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
    },
  },
  plugins: [],
};
