import * as validator from "express-validator";

export const owoifyGetValidator = [
    validator.query('text', "text query is required").isString().withMessage('text query must be a string').trim().isLength({ min: 1, max: 2000 }).withMessage("text query must be between 1 and 2000 chars").escape()
];

export const owoifyPostValidator = [
    validator.body('text', "text body is required").isString().withMessage('text body must be a string').trim().isLength({ min: 1, max: 2000 }).withMessage("text body must be between 1 and 2000 chars").escape()
];