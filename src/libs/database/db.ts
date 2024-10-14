import PostgresInit from '@root/seeds/db-init/postgres-init';
import { Sequelize } from 'sequelize';
import winston from 'winston';

export class PostgreSQL {
    private _sequelize!: Sequelize;
    
    get connection(): Sequelize {
        return this._sequelize;
    }

    async connect(): Promise<void> {
        try {
            this._sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DATABASE_HOST_NAME,
                port: +process.env.DATABASE_PORT!,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                logging: winston.debug
            });

            PostgresInit.prototype.init(this._sequelize);
            // sync all models with the database
            await this._sequelize.sync();

            console.log('Connected to PostgreSQL database')
        } catch (error) {
            console.log('Failed to connect to PostgreSQL database')
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this._sequelize.close();
            console.log('Disconnected from PostgreSQL database')
        } catch (error) {
            console.log('Error disconnecting from PostgreSQL database:')
            throw error;
        }
    }
}
