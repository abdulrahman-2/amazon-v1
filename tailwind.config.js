/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        full: "0 0 100%",
      },
      colors: {
        amazon_blue: "#131921",
        amazon_light: "#232f3e",
        amazon_lightText: "#ccc",
        amazon_footer: "#23f3e1",
        amazon_footerBottom: "#23f3e1",
        amazon_yellow: "#fcd814",
        amazon_yellowDark: "#f7c614",
        amazon_orange: "#fba41c",
        amazon_orangeDark: "#fa8900",
        amazon_green: "#7fda69",
      },
    },
  },
  plugins: [],
};
