import { Router } from 'express';
const router = Router();

router.get("/", (req, res) => {
    res.status(200).json([
        {
            "name": "random",
            "description": "Get random images",
            "path": "/random",
            "methods": ["GET"],
            "parameters": [
                {
                    "name": "type",
                    "description": "Type of image",
                    "required": true,
                    "type": "string",
                    "values": ["neko", "kitsune", "pat", "kisse", "hug", "lewd", "slap"]
                }
            ],
            "queries": [],
            "body": []
        },
        {
            "name": "8ball",
            "description": "Get a random 8ball response",
            "path": "/8ball",
            "methods": ["GET"],
            "parameters": [],
            "queries": [
                {
                    "name": "cute",
                    "description": "If you want the response to be cute",
                    "required": false,
                    "type": "boolean"
                }
            ],
            "body": []
        },
        {
            "name": "owoify",
            "description": "Owoify text (make it cute)",
            "path": "/owoify",
            "methods": ["GET", "POST"],
            "parameters": [],
            "queries": [
                {
                    "name": "text",
                    "description": "Text to owoify",
                    "required": true,
                    "type": "string"
                }
            ],
            "body": [
                {
                    "name": "text",
                    "description": "Text to owoify",
                    "required": true,
                    "type": "string",
                    "max_length": 2000,
                    "min_length": 1
                }
            ]
        }
    ]);
});

export default router;