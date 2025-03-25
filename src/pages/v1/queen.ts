import type { APIRoute } from 'astro'

const headers = {
  "Content-Type": "application/json",
};

export const GET: APIRoute = () => {
  
  // Respond
  return new Response(
    JSON.stringify({
        name: 'Queen Raae',
        bio: 'Adipisicing officia commodo est id do voluptate minim Lorem sunt ullamco consectetur Lorem. Duis dolor laboris mollit. Aliquip laboris veniam pariatur aute. Cillum nisi sint amet sit aute. Velit in pariatur et. Laboris adipisicing commodo dolore ullamco in nulla nostrud aliquip velit tempor aliqua dolor nulla ullamco.',
        avatar: {
            url: 'https://avatars.githubusercontent.com/u/90453561?v=4',
            alt: '',
        },
        socials: [
            { url: 'http://twitter.com/raae', label: 'Twitter' },
            { url: 'http://github.com/raae', label: 'GitHub' }
        ]   
    }),
    {
      headers,
    },
  )
}

