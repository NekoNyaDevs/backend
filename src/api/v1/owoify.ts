import { NextFunction, Router } from 'express';
const router = Router();
import { APIRouteInfos, owoifyGetValidator, owoifyPostValidator } from "../../utils";
import { Request, Response } from 'express';
import { matchedData, validationResult } from "express-validator";
import { BadRequestError, ValidationError } from "../../structures/errors";

async function middleware(req: Request, res: Response, next: NextFunction) {
    const results = validationResult(req);
    if(!results.isEmpty()) throw new ValidationError(results.array());

    const text: string | undefined = matchedData(req).text as string | undefined;
    if(!text) throw new BadRequestError("Missing text");

    const owoified = text.replace(/(?:r|l)/g, "w")
        .replace(/(?:R|L)/g, "W")
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])/g, 'Ny$1')
        .replace(/N([AEIOU])/g, 'Ny$1')
        .replace(/ove/g, "uv")
        .replace(/!+/g, " " + "owo");

    res.status(200).json({
        result: owoified
    });
}

router.get('/', owoifyGetValidator,  middleware);
router.post('/', owoifyPostValidator,  middleware);

export default router;
export const infos: APIRouteInfos = {
    name: "owoify",
    description: "Make your text cute",
    path: "/owoify",
    methods: ["GET"],
    parameters: [],
    queries: [
        {
            name: "text",
            description: "The text you want to make cute",
            required: false,
            type: "string"
        }
    ],
    body: [
        {
            name: "text",
            description: "The text you want to make cute",
            required: false,
            type: "string"
        }
    ]
};