import { query } from 'express-validator';
import { strigRequiredValidator } from "../valitadorsUtils";

export const getpostsSchema = [
  strigRequiredValidator('initialDate'),
  strigRequiredValidator('finalDate')
];

export const getPostsOrderBySchema = [
  strigRequiredValidator('initialDate'),
  strigRequiredValidator('finalDate'),
  query('orderBy')
    .optional()
    .isIn(['comments', 'ups'])
    .withMessage('orderBy must be either "comments" or "ups"'),
];
