import {Router, Request, Response, NextFunction} from 'express';
const router = Router();
import { APIRouteInfos, eightballValidator } from "../../utils";
import { matchedData, validationResult } from "express-validator";
import { ValidationError } from "../../structures/errors";

const eightballAnswers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",

    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",

    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",

    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

const cuteEightballAnswers = [
    "Yes!!",
    "Of Cwurse!",
    "Yes, definitelwy nya!",
    "Without any doubts nya!",
    "My tail says yess!",

    "Mhh.. I think so!",
    "Most likely!",
    "Outwook good!",
    "Yesh!",
    "Signs point to yes!",

    "I don't know nya..",
    "Ask again later, nya!",
    "Better not twell you now!",
    "Cannot predict now..",
    "Concentrate and ask again! :3",

    "Don't count on it! >:c",
    ">-< My reply is nyo!",
    "My sources say nyo!",
    "Outlook nyot so good! :c",
    "Very doubtfwul!"
];

router.get('/', eightballValidator,  async (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    if(!results.isEmpty()) throw new ValidationError(results.array());

    const data = matchedData(req);
    const cute = data.cute || false;
    const answers = cute ? cuteEightballAnswers : eightballAnswers;
    const answer = answers[Math.floor(Math.random() * answers.length)];

    res.status(200).json({
        answer: answer
    });
});

export default router;
export const infos: APIRouteInfos = {
    name: "8ball",
    description: "Get a random 8ball response",
    path: "/8ball",
    methods: ["GET"],
    parameters: [],
    queries: [
        {
            name: "cute",
            description: "If you want the response to be cute",
            required: false,
            type: "boolean"
        }
    ],
    body: []
};