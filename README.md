This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

# TODO App

A simple and intuitive TODO application to help you manage your tasks and stay organized. This app allows you to add, edit, mark as complete, and delete tasks, making it easy to keep track of what you need to do.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/todo-app.git
   ```
2. Navigate to the client directory:
   ```bash
   cd todo-list/client
   ```
3. Install dependencies:
   ```bash
   yarn install or npm install
   ```
    
4. Start the development server:
   ```bash
   yarn start
   ```

5. Open `http://localhost:3000` in your browser.

## Code structure
   ```
   │ ├── .next/ # Next.js build output
   │ ├── .yarn/ # Yarn dependencies
   │ ├── node_modules/ # Node.js modules
   │ ├── public/ # Static assets
   │ │ ├── illustration_dashboard.png
   │ │ └── illustration_login.png
   │ ├── src/ # Source code
   │ │ ├── app/ # Application routes and pages
   │ │ │ ├── (auth)/ # Authentication-related routes
   │ │ │ └── (dashboard)/ # Dashboard-related routes
   │ │ ├── app/ui/ # UI components
   │ │ ├── app/utils/ # Utility functions
   │ │ ├── app/favicon.ico # Favicon
   │ │ ├── app/globals.css # Global styles
   │ │ ├── app/layout.tsx # Layout component
   │ │ └── app/page.tsx # Main page
   │ ├── .env # Environment variables
   │ ├── .eslintrc.json # ESLint configuration
   │ ├── .gitignore # Git ignore file
   │ ├── .prettierignore # Prettier ignore file
   │ ├── .prettierrc # Prettier configuration
   │ ├── .yarnrc.yml # Yarn configuration
   │ ├── config.ts # Configuration file
   │ ├── next-env.d.ts # TypeScript environment definitions
   │ ├── next.config.mjs # Next.js configuration
   │ ├── package-lock.json # npm package lock file
   │ ├── package.json # npm package file
   │ ├── postcss.config.mjs # PostCSS configuration
   │ ├── README.md # Project README
   │ ├── tailwind.config.ts # Tailwind CSS configuration
   │ ├── tsconfig.json # TypeScript configuration
   │ └── yarn.lock # Yarn lock file
```
