// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://galleon.tools",
  integrations: [
    starlight({
      title: "Galleon",
      favicon: "/favicon.svg",
      customCss: [
        "./src/tailwind.css",
        // Fontsource files for to regular and semi-bold font weights.
        "@fontsource/moul/400.css",
      ],
      head: [
        {
          tag: "script",
          content: `
            var o_options = {
              domain: 'galleon.outseta.com',
              load: 'emailList',
            };
          `,
        },
        {
          tag: "script",
          attrs: {
            src: "https://cdn.outseta.com/outseta.min.js",
            "data-options": "o_options",
          },
        },
      ],
      social: {
        github: "https://github.com/queen-raae/galleon-website/",
        "x.com": "https://x.com/raae",
        youtube: "https://www.youtube.com/@QueenRaae/shorts",
        email: "mailto:raae@lillylabs.no",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/queen-raae/galleon-website/edit/main/docs/",
      },
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
