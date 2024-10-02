import { Router } from 'express';
const router = Router();
import fs from 'fs/promises';
import { APIRouteInfos, formatType, getBaseURL } from "../../utils";
import { BadRequestError } from "../../structures/errors";

router.get("/", (req, res) => {
    res.redirect("/api/v1/random/neko");
});

router.get('/:type', async (req, res, next) => {
    const type = req.params.type;
    const types = ['neko', 'kitsune', 'pat', 'kiss', 'hug', 'lewd', 'slap'];
    if (!types.includes(type)) throw new BadRequestError("Invalid Type");

    const scanType = formatType(type);
    let files: string[] = await fs.readdir(`./images/${scanType}`);
    const image = files[Math.floor(Math.random() * files.length)];

    return res.status(200).json({
        url: getBaseURL(req) + "/images/" + scanType + "/" + image
    });
});

export default router;
export const infos: APIRouteInfos = {
    name: "random",
    description: "Get a random image",
    path: "/random",
    methods: ["GET"],
    parameters: [
        {
            name: "type",
            description: "The type of image",
            required: true,
            type: "string",
            values: ["neko", "kitsune", "pat", "kiss", "hug", "lewd", "slap"]
        }
    ],
    queries: [],
    body: []
};