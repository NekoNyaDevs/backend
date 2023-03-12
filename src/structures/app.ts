import express, {NextFunction, Response, Request} from 'express';
import * as sl from '@classycrafter/super-logger';
import * as config from '../config';
import fs from 'fs';
import * as utils from './functions';
import Route from './route';
import path from 'path';
import Api from '../api/index';
import cors from 'cors';

export default class App {

    public app: express.Application;
    public port: number;
    public logger: sl.Logger;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.logger = new sl.Logger({
            name: config.name,
            colored: true,
            enablecustom: false,
            tzformat: 24,
            timezone: 'Europe/Paris',
            writelogs: true,
            dirpath: './logs',
        });

        this.initializeMiddlewares();
        this.initializeRoutes(this.loadRoutes());
        this.initializeErrorHandling();
    };

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('view engine', 'ejs');
        this.app.use('/static', express.static('static'));
        this.app.use('/images', express.static('images'));
        this.app.set('host', config.host);
        this.app.use((req, res, next) => {
            next();
            const ms = utils.getMs(process.hrtime());
            if(!utils.isGoodStatus(res.statusCode)) return this.logger.warn(`${req.method} @${req.url} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
            this.logger.info(`${req.method} @${req.url} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
        });
        const api = Api(this.logger);
        this.app.use('/api', api);
    };

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    };

    public listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`App listening on the port ${this.port}`, "App");
        });
    };

    private loadRoutes(): Route[] {
        const routes: Route[] = [];
        const routeFiles = fs.readdirSync(path.join(__dirname, '..', 'routes')).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
        for (const file of routeFiles) {
            const { default: route } = require(`../routes/${file}`);
            if(!utils.isConstructor(route, Route)) {
                this.logger.error(`Controller ${file} is not a valid controller!`, "App");
                continue;
            }
            const cRoute = new route(this.logger);
            routes.push(cRoute);
            this.logger.info(`Loaded route ${cRoute.path}`, "App");
        }

        return routes;
    };

    private initializeErrorHandling() {
        this.app.use((req, res, next) => {
            const error = new Error('Not found');
            res.status(404);
            next(error);
        });

        this.app.get('*', (req, res) => {
            res.status(404).render('404', { title: 'Not Found', err: new Error('Not Found'), status: 404 });
        });

        this.app.use((error: any, req: express.Request, res: express.Response, next: NextFunction) => {
            if (res.statusCode !== 404) this.logger.error(error.stack, "App");
            res.status(res.statusCode || 500);
            if(!error.message) error.message = "Internal Server Error";
            res.render('error', { title: 'Oops! Error!', err: error, status: res.statusCode });
        });
    }
}