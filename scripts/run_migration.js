const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Database configuration
const pool = mysql.createPool({
    host: 'savr-finance-tracker-savr-finance-tracker.i.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_Yu2PTg6va4gP6vZtew5',
    database: 'savr_db',
    port: 12147,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '../certs/ca.pem')),
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function runMigration() {
    try {
        // Read the migration file
        const migrationSQL = fs.readFileSync(
            path.join(__dirname, '../migrations/20241214_add_categories.sql'),
            'utf8'
        );

        // Get a connection from the pool
        const connection = await pool.getConnection();
        
        try {
            // Split the migration into individual statements
            const statements = migrationSQL
                .split(';')
                .filter(stmt => stmt.trim());

            // Execute each statement
            for (let statement of statements) {
                if (statement.trim()) {
                    try {
                        await connection.query(statement);
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
            
            console.log('Migration completed');
        } catch (error) {
            console.error('Error during migration:', error);
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
}

runMigration();
