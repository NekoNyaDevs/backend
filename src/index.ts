import App from './structures/app';
import fs from 'fs';
import * as config from './config';

const app = new App(config.port);
app.listen();

if(!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
}

if(!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
