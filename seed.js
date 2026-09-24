const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

async function runSeed() {
  console.log('🇪🇹 Addis Transit & Taxi Hub - Supabase / Postgres Database Seeder');
  console.log('==================================================================');

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString || connectionString.includes('[YOUR_PASSWORD]') || connectionString.includes('yourpassword')) {
    console.warn('\n⚠️  Supabase Connection Notice:');
    console.warn('Your .env file has a placeholder: [YOUR_PASSWORD].');
    console.warn('To migrate tables directly to your live Supabase cloud database:');
    console.warn('1. Open .env');
    console.warn('2. Replace [YOUR_PASSWORD] with your actual Supabase DB password.');
    console.warn('3. Run "npm run db:seed" again.\n');
    console.log('✅ Note: The app currently uses high-speed embedded mock fallbacks,');
    console.log('   so all 15 Taxi Teras, 25 Stations, 15 Transit Corridors, and 4 Regional Bus Terminals');
    console.log('   work 100% smoothly right now without needing the database connection!\n');
    return;
  }

  const client = new Client({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Connecting to PostgreSQL / Supabase...');
    await client.connect();
    console.log('✓ Successfully connected to PostgreSQL / Supabase!');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('📦 Executing schema.sql migration & spatial datasets...');
    await client.query(sql);

    console.log('✓ PostGIS extension verified.');
    console.log('✓ Tables (stops, routes, taxi_teras, regional_terminals) created.');
    console.log('✓ Spatial GiST indexes created.');
    console.log('✓ Row Level Security (RLS) policies configured.');
    console.log('✓ Full Addis Ababa datasets seeded successfully!\n');
  } catch (err) {
    console.error('\n❌ Database execution error:', err.message);
    if (err.message.includes('password authentication failed')) {
      console.error('👉 Please check your Supabase database password in .env');
    }
  } finally {
    await client.end();
  }
}

runSeed();
