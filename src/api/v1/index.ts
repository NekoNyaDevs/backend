import fs from 'fs';
import path from 'path';
import {Router} from 'express';
import {Logger} from "@classycrafter/super-logger";

const router = Router();
router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'OK',
        version: 'v1',
        endpoints: '/endpoints'
    });
});

export default (logger: Logger) => {
    const files = fs.readdirSync(__dirname).filter(file => file !== path.basename(__filename));
    for (const file of files) {
        const route = require('./' + file).default;
        const fileName = file.replace('.ts', '');
        router.use(`/${fileName}`, route);
        logger.info(`Loaded route /api/v1/${fileName}`, "API");
    }

    return router;
};