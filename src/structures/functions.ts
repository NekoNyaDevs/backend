import chalk from 'chalk';
import fetch from 'node-fetch';
import * as config from '../config';
import { Request } from 'express';
import * as jose from "jose";
import { IsValidTokenRes } from '../utils/types';

export const isGoodStatus = (code: number): boolean => {
    return code >= 200 && code < 400;
}

export const getMs = (start: [number, number]): string => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return ((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toLocaleString();
};

export const timingColor = (ms: number | string): string => {
    let msnum: number;
    if(typeof ms === "string") msnum = parseInt(ms);
    else msnum = ms;

    if(msnum < 100) return chalk.green(ms + "ms");
    else if(msnum < 500) return chalk.yellow(ms + "ms");
    else return chalk.red(ms + "ms");
};

const isConstructorProxyHandler = {
    construct() {
        return Object.prototype;
    }
};

export function isConstructor(func: any, _class: any): boolean {
    try {
        new new Proxy(func, isConstructorProxyHandler)();
        if (!_class) return true;
        return func.prototype instanceof _class;
    } catch (err) {
        return false;
    }
}

export async function isValidToken(req: Request): Promise<IsValidTokenRes> {
    if (Object.keys(req.body).length > 0) return {
        status: 400,
        error: 'Bad Request',
        message: 'Too many arguments'
    };

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || typeof token !== "string") return {
        status: 400,
        error: 'Bad Request',
        message: 'No token provided'
    };
    const secret = new TextEncoder().encode(config.jwtSecret);
    const payload = jose.decodeJwt(token);
    if (!payload || !payload["secretPass"]) return {
        status: 400,
        error: 'Bad Request',
        message: 'Token is invalid'
    };
    const condition1 = !((await jose.jwtVerify(token, secret).catch((err: Error) => {
        return err;
    })) instanceof Error);
    const condition2 = !payload["secretPass"] || payload["secretPass"] === config.secretPass;
    const verified = condition1 && condition2;
    if (!verified) return {
        status: 401,
        error: 'Unauthorized',
        message: 'Token is invalid or has expired'
    };

    return {
        status: 200,
        message: 'Token is valid'
    };
}

