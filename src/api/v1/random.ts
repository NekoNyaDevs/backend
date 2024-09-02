import { Router } from 'express';
const router = Router();
import fs from 'fs';
import { getBaseURL } from "../../utils";

router.get("/", (req, res) => {
    res.redirect("/api/v1/random/neko");
});

router.get('/:type', (req, res) => {
    const type = req.params.type;

    const types = ['all', 'neko', 'kitsune', 'pat', 'kiss', 'hug', 'lewd', 'slap'];
    if(!types.includes(type)) return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Invalid type'
    });

    let files: string[] = [];

    if(type === 'all') {
        for (const type of types) {
            if(type === 'all') continue;
            const dirFiles = fs.readdirSync(`./images/${type}s`)
            files.push(...dirFiles);
        }
    }
    else files = fs.readdirSync(`./images/${type}s`);

    const image = files[Math.floor(Math.random() * files.length)];
    return res.status(200).json({
        "url": getBaseURL(req) + "/images/" + type + "s/" + image
    });
});

export default router;