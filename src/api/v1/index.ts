import fs from 'fs';
import path from 'path';
import {Router} from 'express';
import {isValidToken} from "../../structures/functions";

// Load every file here in this directory except this file, then load the returned route inside a router object which is then exported
const router = Router();
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        version: 'v1'
    });
});

router.get('*' , async (req, res, next) => {
    if(req.path === '/token') return next();
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({
        status: '401',
        error: 'Unauthorized',
        message: 'No token provided'
    });

    await isValidToken(token).then((valid: boolean) => {
        if(!valid) return res.status(401).json({
            status: '401',
            error: 'Unauthorized',
            message: 'Invalid token'
        });
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