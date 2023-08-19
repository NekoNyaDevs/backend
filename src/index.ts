import App from './structures/app';
import fs from 'fs';
import * as config from './config';

if(!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
}

if(!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

const app = new App(config.port);
app.listen();