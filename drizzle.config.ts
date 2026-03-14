import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

/* CHANGE THIS */
const DATABASE_URL = process.env.DATABASE_URL!

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: { url: DATABASE_URL },
})
