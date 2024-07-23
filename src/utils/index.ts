import chalk from 'chalk';
import { Request } from 'express';
import * as  config from '../config';

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

export const getBaseURL = (req: Request): string => {
    return req.protocol + '://' + req.hostname + (process.env.NODE_ENV === 'production' ? '' : (':' + config.port));
};

export * from "./validators";