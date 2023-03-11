import express from 'express';
import {Logger} from "@classycrafter/super-logger";
import {IInfos} from "../utils/types";

export default abstract class Route {
    public router: express.Router;
    public path: string;

    protected constructor(logger: Logger, infos: IInfos) {
        this.router = express.Router();
        this.path = infos.path;

        this.loadRoutes();
    };

    abstract initializeRoutes(): void;

    public loadRoutes() {
        this.initializeRoutes();
    }
}