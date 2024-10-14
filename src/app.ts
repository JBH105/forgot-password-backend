import express, { Express } from 'express';
import { ExamCareStudentServer } from './setup/server';
import { PostgreSQL } from './libs/database/db';
import dotenv from 'dotenv';
dotenv.config();

class Application {
    public initialize(): void {
        console.log('Initializing application...');
        this._initSetup();
        const app: Express = express();
        const server: ExamCareStudentServer = new ExamCareStudentServer(app);
        server.start();
    }

    private _initSetup() {
        this._connectDB();
    }

    private async _connectDB() {
        await new PostgreSQL().connect();
    }
}

const application: Application = new Application();
application.initialize();
