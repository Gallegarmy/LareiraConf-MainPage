module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // Asegúrate de incluir Astro y otros formatos relevantes.
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Square"],
        title: ['"Nine-By-Five"'],
        body: ['"system-ui"'],
      },
      colors: {
        accent: "#e95c3c",
      },
    },
  },
  plugins: [],
};
