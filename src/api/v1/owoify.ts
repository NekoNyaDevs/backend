import { Router } from 'express';
const router = Router();
import { owoifyGetValidator, owoifyPostValidator } from "../../utils";
import { Request, Response } from 'express';
import { matchedData, validationResult } from "express-validator";

router.get('/', owoifyGetValidator, (req: Request, res: Response) => {
    const results = validationResult(req);
    if(!results.isEmpty()) return res.status(400).json({
        message: 'Validation failed',
        errors: results.array()
    });

    const text: string | undefined = matchedData(req).text as string | undefined;
    if(!text) return res.status(400).json({
        error: {
            status: 400,
            message: 'Missing text'
        }
    });

    const owoified = text.replace(/(?:r|l)/g, "w")
        .replace(/(?:R|L)/g, "W")
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])/g, 'Ny$1')
        .replace(/N([AEIOU])/g, 'Ny$1')
        .replace(/ove/g, "uv")
        .replace(/!+/g, " " + "owo");

    res.status(200).json({
        "result": owoified
    });
});

router.post('/', owoifyPostValidator, (req: Request, res: Response) => {
    const results = validationResult(req);
    if(!results.isEmpty()) return res.status(400).json({
        message: 'Validation failed',
        errors: results.array()
    });

    const text: string | undefined = matchedData(req).text as string | undefined;
    if(!text) return res.status(400).json({
        error: {
            status: 400,
            message: 'Missing text'
        }
    });

    const owoified = text.replace(/(?:r|l)/g, "w")
        .replace(/(?:R|L)/g, "W")
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])/g, 'Ny$1')
        .replace(/N([AEIOU])/g, 'Ny$1')
        .replace(/ove/g, "uv")
        .replace(/!+/g, " " + "owo");

    res.status(200).json({
        "result": owoified
    });
});

export default router;