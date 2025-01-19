module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
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
      boxShadow: {
        lg: "16px 16px 0px 0px var(--secondary)",
        sm: "8px 8px 0px 0px var(--secondary)",
      },
      fontSize: {
        xxs: "0.65rem",
      },
    },
  },
  plugins: [],
};
