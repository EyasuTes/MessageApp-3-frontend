/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.jsx",
    "./src/pages/*.jsx",
    "./src/components/*.jsx",
    "./src/smallComponents/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        light: "rgb(var(--light))",
        "light-alt": "rgb(var(--light-alt))",
        dark: "rgb(var(--dark))",
        "dark-alt": "rgb(var(--dark-alt))",
      },
    },
  },
  plugins: [],
};
