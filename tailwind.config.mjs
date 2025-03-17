/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Moul", "serif"],
        sans: ["system-ui", "sans-serif"],
        mono: ["monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
