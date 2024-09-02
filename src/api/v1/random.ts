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
    const scanType = type === 'kiss' ? 'kisses' : type + 's';

    if(type === 'all') {
        for (const type of types) {
            if(type === 'all') continue;
            const scanType = type === 'kiss' ? 'kisses' : type + 's';
            const dirFiles = fs.readdirSync(`./images/${scanType}`);
            files.push(...dirFiles);
        }
    }
    else files = fs.readdirSync(`./images/${scanType}`);

    const image = files[Math.floor(Math.random() * files.length)];
    return res.status(200).json({
        "url": getBaseURL(req) + "/images/" + scanType + "/" + image
    });
});

export default router;