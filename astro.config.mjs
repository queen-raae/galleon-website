// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Galleon',
			
			social: {
				github: 'https://github.com/queen-raae/galleon-website/',
				'x.com': 'https://x.com/raae',
    			youtube: 'https://www.youtube.com/@QueenRaae/shorts',
				'email': 'mailto:raae@lillylabs.no',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: ['./src/tailwind.css'],
			editLink: {
				baseUrl: 'https://github.com/queen-raae/galleon-website/edit/main/docs/',
			  },
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
