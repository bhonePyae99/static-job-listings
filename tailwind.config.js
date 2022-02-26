module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        lightGrayishCyanBg: "hsl(180, 52%, 96%)",
        lightGrayishCyanFt: "hsl(180, 31%, 95%)",
        darkGrayishCyan: "hsl(180, 8%, 52%)",
        veryDarkGrayishCyan: "hsl(180, 14%, 20%)",
      },
    },
  },
  plugins: [],
};
