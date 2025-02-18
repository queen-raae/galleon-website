import colors from "tailwindcss/colors";
import starlightPlugin from "@astrojs/starlight-tailwind";

// Generated color palettes
const accent = {
  200: colors.orange[200],
  600: colors.orange[600],
  900: colors.orange[900],
  950: colors.orange[950],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent },
      fontFamily: {
        // Your preferred code font. Starlight uses system monospace fonts by default.
        brand: ['"Moul"'],
      },
    },
  },
  plugins: [starlightPlugin()],
};
