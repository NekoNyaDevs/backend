import { Router } from 'express';
const router = Router();
import { APIRouteInfos } from "../../utils";
import fs from "fs";
import path from "path";

const routeInfos: APIRouteInfos[] = [];
const files = fs.readdirSync(__dirname).filter(file => file !== path.basename(__filename) && file !== "index.ts" && file !== "index.js");
for (const file of files) {
    const infos = require('./' + file).infos;
    routeInfos.push(infos);
}

router.get("/", (req, res) => {
    res.status(200).json(routeInfos);
});

export default router;
export const infos: APIRouteInfos = {
    name: "endpoints",
    description: "Get all available endpoints",
    path: "/endpoints",
    methods: ["GET"],
    parameters: [],
    queries: [],
    body: []
};