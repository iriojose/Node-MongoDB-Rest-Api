import express, { Application } from 'express';
import path from 'path';
import { routes } from './routes';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import  { DB }  from'./Database';
dotenv.config();

export class App {
    public app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.argv[2] || process.env.API_PORT || 81);
    }

    private connection() {
        const db = new DB();
        db.listen();
    }
    private middlewares() {
        this.app.use(cors({ exposedHeaders: 'Authorization' }));
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/api/images/',express.static(path.resolve('public/images')));
        this.connection();
    }

    private routes() {
        routes(this.app);
    }

    public listen() {
        this.app.listen(this.app.get('port'));
        console.log(`running on port ${this.app.get('port')}`);
    }
}