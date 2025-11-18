/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        volkhov: ['Volkhov', 'serif'],
      },
      colors: {
        brand: "#243B64",
        brand2: "#2E63D9",
        brandSoft: "#6F96D1",
        bg: "#F9FBFF",
        bgSoft: "#EEF3FB",
        text: "#1A1D27",
        muted: "#677189",
        border: "#E4E9F2",
        warning: "#F9B23B",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(0,0,0,.08)",
        card: "0 8px 14px rgba(0,0,0,.18)",
        pill: "0 3px 8px rgba(0,0,0,.12)",
      },
      backgroundImage: {
        softRadial:
          "radial-gradient(900px 500px at 15% 10%, rgba(111,150,209,.28), transparent 60%), radial-gradient(800px 400px at 95% 0%, rgba(111,150,209,.18), transparent 50%), #EEF3FB",
        pageRadial:
          "radial-gradient(1200px 600px at 20% -10%, rgba(111,150,209,.20), transparent 60%), #F9FBFF",
      },
    },
  },
  plugins: [],
};
