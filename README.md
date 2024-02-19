## UI showing PM2.5 monitoring projects 

Using: https://pm25.lass-net.org/

## Decisions

- SWR (Stale-While-Revalidate), a React Hooks library, to efficiently handle GET requests to the API and enable me to cache and automatically refetch data based on a set frequency
- React testing library to unit test components
- Tailwindcss and daisyUI for styling

## With more time I would:

- Make better use of white space, i.e. fill screen with content
- Validate response from backend using types using something like zod
- Improve accessibility i.e. use of aria roles, testing keyboard navigation etc.
- Make component to improve design for scenario where there are no feed entries
- Test edge-cases for empty states and boundaries i.e. when feeds is less than 10

## Assumptions

- Top ten is the top of the list returned in response from API, as opposed to based on time entry
- "Infrequently" and "very infrequently" have been interpreted as one day and half a day respectively as the frequency for fetching projects and project details

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
