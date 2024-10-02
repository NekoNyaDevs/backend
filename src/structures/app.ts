import express, {NextFunction} from 'express';
import * as sl from '@classycrafter/super-logger';
import * as config from '../config';
import * as utils from '../utils';
import Api from '../api/index';
import cors from 'cors';
import { APIError, NotFoundError } from "./errors";
import 'express-async-errors';
import onFinished from 'on-finished';
import onHeaders from 'on-headers';

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
        this.app.disable('x-powered-by');
        this.app.set('trust proxy', 1);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('host', config.host);
        this.app.use((req, res, next) => {
            let startTime: [number, number];
            let ms;
            onHeaders(res, () => {
                startTime = process.hrtime();
            });
            onFinished(res, (err, res) => {
                if(err) return this.logger.error(err.stack as string, "App");
                ms = utils.getMs(startTime);
                if(utils.isInternalServerError(res.statusCode)) return this.logger.error(`${req.method} @${req.originalUrl} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
                if(!utils.isGoodStatus(res.statusCode)) return this.logger.warn(`${req.method} @${req.originalUrl} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
                this.logger.info(`${req.method} @${req.originalUrl} - ${res.statusCode} (${utils.timingColor(ms)})`, "App");
            });
            next();
        });
        const api = Api(this.logger);
        this.app.use("/api", api);
    };

    public listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`App listening on the port ${this.port}`, "App");
        });
    };

    private initializeErrorHandling() {
        this.app.use((req, res, next) => {
            next(new NotFoundError("Route not found"));
        });

        this.app.use((error: APIError, req: express.Request, res: express.Response, next: NextFunction) => {
            if (res.headersSent) {
                return next(error);
            }
            // If there isn't the type property, it is a fallback error
            if (!error.type) error = APIError.fromError(error);
            res.status(error.code || 500);
            res.json({
                error: {
                    message: error.message,
                    code: error.code,
                    type: error.type
                },
                errors: error.isValidationError() ? error.errors : undefined
            });
            if (error.code >= 500) this.logger.error(error.stack as string, "App");
        });
    }
}