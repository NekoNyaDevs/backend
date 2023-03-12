import { Router } from 'express';
const router = Router();
import * as jose from 'jose';
import * as config from '../../config';
import { Payload } from "../../utils/interfaces";

router.post('/', async (req, res) => {
    if(Object.keys(req.body).length > 1) return res.status(400).json({
        status: '400',
        error: 'Bad Request',
        message: 'Too many arguments'
    });

    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token || typeof token !== "string") return res.status(400).json({
        status: '400',
        error: 'Bad Request',
        message: 'No token provided'
    });
    const secret = new TextEncoder().encode(config.jwtSecret);
    const payload = jose.decodeJwt(token);
    if(!payload || !payload["secretPass"]) return res.status(400).json({
        status: '400',
        error: 'Bad Request',
        message: 'Token is invalid'
    });
    const condition1 = !((await jose.jwtVerify(token, secret).catch((err: Error) => {
        return err;
    })) instanceof Error);
    const condition2 = !payload["secretPass"] || payload["secretPass"] === config.secretPass;
    const verified = condition1 && condition2;
    if(!verified) return res.status(401).json({
        status: '401',
        error: 'Unauthorized',
        message: 'Token is invalid or has expired'
    });

    return res.status(200).json({
        status: '200',
        message: 'Token is valid'
    });
});

export default router;