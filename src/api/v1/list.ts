import { Router } from 'express';
const router = Router();
import fs from 'fs';
import {ImageInfo} from '../../utils/interfaces';

router.get('/:type', (req, res) => {
    const type = req.params.type;

    const types = ['all', 'nekos', 'kitsunes', 'pats', 'kisses', 'hugs', 'lewds', 'slaps'];
    if(!types.includes(type)) return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Invalid type'
    });

    let files: (ImageInfo | string)[] = [];

    if(type === 'all') {
        for (const type of types) {
            if(type === 'all') continue;
            const dirFiles = fs.readdirSync(`./images/${type}`)
            const toPush: ImageInfo = {
                type: type,
                count: dirFiles.length,
                files: dirFiles
            };
            files.push(toPush);
        }
    }
    else files = fs.readdirSync(`./images/${type}`);

    return res.status(200).json({
        status: 200,
        message: 'OK',
        data: {
            type: type,
            count: files.length,
            files: files
        }
    });
});

export default router;