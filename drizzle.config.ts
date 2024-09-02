import { defineConfig } from 'drizzle-kit'
import 'dotenv/config';


export default defineConfig({
  schema: "./utils/schema.tsx", // Path to your schema file
  dialect: 'postgresql', // Use PostgreSQL
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!, // Ensure DB_URL is correctly set in your environment
  },
  verbose: true, // Enable verbose logging for debugging
  strict: true, // Enforce strict mode for stricter type checking
})
