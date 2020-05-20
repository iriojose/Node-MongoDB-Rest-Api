import { Application } from 'express';
import conceptos from './components/conceptos/route';
import usuario from './components/usuario/route';
import depositos from './components/depositos/route';
import grupos from './components/grupos/route';
import subgrupos from './components/subgrupos/route';

//all exportation routes
export const routes = (app: Application) => {
    app.use('/api/conceptos', conceptos);
    app.use('/api/usuario', usuario);
    app.use('/api/depositos', depositos);
    app.use('/api/grupos', grupos);
    app.use('/api/subgrupos', subgrupos);

    //if route is not recognized send 404
    app.use('*', async (req, res, next) => {
        res.status(404).json({ message: "Route not especified" });
    });
};