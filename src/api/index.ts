import fs from 'fs';
import {Router} from 'express';
import {Logger} from "@classycrafter/super-logger";

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
        if(dir === 'index.ts') return;
        const route = require('./' + dir).default(logger);
        router.use(`/${dir}/`, route);
        logger.info(`Loaded API version ${dir}`, "API");
    });

    return router;
};