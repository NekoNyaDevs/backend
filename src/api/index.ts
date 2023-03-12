import fs from 'fs';
import path from 'path';
import {Router} from 'express';
import {Logger} from "@classycrafter/super-logger";

export default (logger: Logger) => {
    const router = Router();

    router.get('/', (req, res) => {
        res.status(200).json({
            status: 'OK',
            latest: '/v1'
        });
    });

    fs.readdirSync(__dirname).forEach(dir => {
        if(dir === 'index.ts' || dir === "index.js") return;
        const route = require('./' + dir).default;
        router.use(`/${dir}/`, route);
        logger.info(`Loaded API version ${dir}`, "API");
    });

    return router;
};