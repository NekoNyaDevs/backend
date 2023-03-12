import App from './structures/app';
import fs from 'fs';

const app = new App(3000);
app.listen();

if(!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
}

if(!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
