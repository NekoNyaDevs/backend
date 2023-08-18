import { Router } from 'express';
const router = Router();
import * as jose from 'jose';
import * as config from '../../config';

router.post('/', async (req, res) => {
    const body = req.body;
    if(!body.username || !body.password) return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'No username or password provided'
    });

    if(body.username === config.username && body.password === config.secretPass) {
        const secret = new TextEncoder().encode(config.jwtSecret);
        const token = await new jose.SignJWT({
            "secretPass": config.secretPass,
        }).setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT'
        }).sign(secret);
        return res.status(200).json({
            status: '200',
            token: token
        });
    }

    return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'Invalid username or password'
    });
});

export default router;