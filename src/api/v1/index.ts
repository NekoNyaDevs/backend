import fs from 'fs';
import path from 'path';
import {Router} from 'express';
import {isValidToken} from "../../structures/functions";

// Load every file here in this directory except this file, then load the returned route inside a router object which is then exported
const router = Router();
router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'OK',
        version: 'v1'
    });
});

router.use(async (req, res, next) => {
    if(req.path === '/token') return next();

    await isValidToken(req).then((result) => {
        if (result.status !== 200) {
            return res.status(result.status).json({
                status: result.status,
                error: result.error,
                message: result.message
            });
        }

        next();
    }).catch((err: Error) => {
        next(err);
    });
});

const files = fs.readdirSync(__dirname).filter(file => file !== path.basename(__filename) && file.endsWith('.js'));
for (const file of files) {
    const route = require('./' + file).default;
    const fileName = file.replace('.js', '');
    router.use(`/${fileName}`, route);
}

export default router;