import fs from 'fs';
import {Router} from 'express';
import {Logger} from "@classycrafter/super-logger";
import { basename } from 'path';

export default (logger: Logger) => {
    const router = Router();

    router.get('/', (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'OK',
            latest: '/v1'
        });
    });

    fs.readdirSync(__dirname).forEach(dir => {
        if(dir === basename(__filename)) return;
        const route = require('./' + dir).default(logger);
        router.use(`/${dir}/`, route);
        logger.info(`Loaded API version ${dir}`, "API");
    });

    return router;
};