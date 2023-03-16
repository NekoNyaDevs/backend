import chalk from 'chalk';
import fetch from 'node-fetch';
import * as config from '../config';

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

export async function isValidToken(token: string): Promise<boolean> {
    const res = await fetch(`http://${config.host}:${config.port}/api/v1/valid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((res) => res.json());

    return res.status === "200";
}