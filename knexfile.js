// Database Config

module.exports = {
    development: {
        client: 'pg',
        connection: {
            user: 'api',
            database: 'api',
            port: 5432,
            host: '192.168.50.10',
            password: 'server'
        },
        debug: false,
        pool: {
            min: 1,
            max: 10 
        }
    },
    production: {
        client: 'pg',
        connection: {
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            password: process.env.DATABASE_PASSWORD
        },
        debug: false,
        pool: {
            min: 1,
            max: 10 
        }
    }
}