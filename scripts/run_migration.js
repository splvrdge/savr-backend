import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration
const pool = mysql.createPool({
    host: 'savr-finance-tracker-savr-finance-tracker.i.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_Yu2PTg6va4gP6vZtew5',
    database: 'savr_db',
    port: 12147,
    ssl: {
        ca: await fs.readFile(path.join(__dirname, '../certs/ca.pem')),
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function runMigration() {
    try {
        // Get a connection from the pool
        let connection = await pool.getConnection();
        
        try {
            // List of migrations to run in order
            const migrations = [
                '20241215_update_is_completed.sql'
            ];

            // Run each migration
            for (const migrationFile of migrations) {
                console.log(`Running migration: ${migrationFile}`);
                
                // Read the migration file
                const migrationSQL = await fs.readFile(
                    path.join(__dirname, '../migrations', migrationFile),
                    'utf8'
                );

                // Split the migration into individual statements
                const statements = migrationSQL
                    .split(';')
                    .filter(stmt => stmt.trim());

                // Execute each statement
                for (let statement of statements) {
                    if (statement.trim()) {
                        try {
                            await connection.execute(statement);
                            console.log('Executed statement successfully');
                        } catch (err) {
                            if (err.code === 'ER_DUP_KEYNAME') {
                                console.log('Index already exists, skipping...');
                            } else {
                                console.error('Error executing statement:', err.message);
                                console.log('Statement:', statement);
                            }
                        }
                    }
                }
                
                console.log(`Completed migration: ${migrationFile}`);
            }

            console.log('All migrations completed successfully');
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runMigration();
