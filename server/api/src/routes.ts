import { Application } from 'express';
import conceptos from './components/conceptos/route';
import usuario from './components/usuario/route';

export const routes = (app: Application) => {
    app.use('/api/conceptos', conceptos);
    app.use('/api/usuario', usuario);

    app.use('*', async (req, res, next) => {
        res.status(404).json({ message: "Route not especified" });
    });
};