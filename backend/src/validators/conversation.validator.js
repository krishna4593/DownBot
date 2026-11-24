import {body} from 'express-validator';

export const sendMessageValidator= [
    body('content')
        .exists()
        .withMessage('Content is required').bail()
        .isString()
        .withMessage('Content must be a string').bail()
        .custom((value)=> value.trim().length>0)
        .withMessage('Content cannot be empty').bail(),

    body('conversation')
        .optional({values:'null'})
        .isMongoId().withMessage('Conversation must be a valid Mongo ID').bail()
       
]