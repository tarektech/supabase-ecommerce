# Vite React Shadcn Demo

Vite React Shadcn Demo is a React-based application built with Vite, TypeScript, ShadCN UI, Tailwind CSS, and Supabase for backend services.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/VoloBuilds/vite-react-shadcn-demo.git
   cd vite-react-shadcn-demo
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL="your-supabase-url"
   VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

## Supabase Integration

This project uses Supabase for:
- Authentication
- Database
- Storage

### Database Schema

The application uses the following tables:
- `profiles`: User profile information linked to auth.users
- `products`: Product catalog
- `categories`: Product categories with optional parent-child relationships
- `orders`: Order information
- `order_items`: Items in each order
- `addresses`: User addresses
- `reviews`: Product reviews by users

For more details, see the [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) file.

## Running the Application

To start the development server:

```
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` to view the application.

## Building for Production

To build the application for production:

```
npm run build
```

This will create a `dist` folder with the production-ready files.

## Additional Scripts

- `npm run lint`: Run ESLint to check for code quality and style issues.
- `npm run preview`: Preview the production build locally.

## Project Structure

The main application code is located in the `src` directory:

- `src/App.tsx`: The main application component
- `src/components/`: Reusable React components
- `src/context/`: React context providers for auth and application state
- `src/lib/`: Utility functions and helpers
- `src/services/`: Service layer for API interactions
- `src/utils/`: Utility functions including Supabase client setup
- `src/pages/`: Application pages and routes
- `src/index.css`: Global styles and Tailwind CSS imports

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Supabase (Auth, Database, Storage)

## Configuration Files

- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `vite.config.ts`: Vite configuration
- `eslint.config.js`: ESLint configuration
- `components.json`: shadcn/ui configuration

For more details on the project setup and configuration, refer to the respective configuration files in the project root.

If starting a project from scratch, see this guide on how to use shadcn/ui with vite here: https://ui.shadcn.com/docs/installation/vite

Also see the Cursor tutorial relating to this project here:
https://youtu.be/PlQPSkIUdIk