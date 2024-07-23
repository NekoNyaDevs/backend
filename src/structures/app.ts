import express, {NextFunction} from 'express';
import * as sl from '@classycrafter/super-logger';
import * as config from '../config';
import * as utils from '../utils';
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
        this.initializeErrorHandling();
    };

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('static'));
        this.app.use('/images', express.static('images'));
        this.app.set('host', config.host);
        this.app.use((req, res, next) => {
            next();
            const ms = utils.getMs(process.hrtime());
            if(!utils.isGoodStatus(res.statusCode)) return this.logger.warn(`${req.method} @${req.originalUrl} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
            this.logger.info(`${req.method} @${req.originalUrl} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
        });
        const api = Api(this.logger);
        this.app.use('/api', api);
    };

    public listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`App listening on the port ${this.port}`, "App");
        });
    };

    private initializeErrorHandling() {
        this.app.use((req, res, next) => {
            const error = new Error('Not found');
            res.status(404);
            next(error);
        });

        this.app.use((error: any, req: express.Request, res: express.Response, next: NextFunction) => {
            if (res.headersSent) {
                return next(error);
            }
            if (res.statusCode === 200) res.status(500);
            if (res.statusCode !== 404) this.logger.error(error.stack, "App");
            res.json({
                error: {
                    message: error.message,
                    status: res.statusCode
                }
            });
        });
    }
}