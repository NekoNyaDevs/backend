import App from './structures/app';
import fs from 'fs';

const app = new App(3000);
app.listen();

if(!fs.existsSync('./config.ts')) {
    fs.copyFileSync('./config.example.ts', './config.ts');
}

if(!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
}

if(!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
