import { query } from 'express-validator';
import { strigRequiredValidator } from "../valitadorsUtils";

export const getThreadsSchema = [
  strigRequiredValidator('initialDate'),
  strigRequiredValidator('finalDate')
];

export const getThreadsOrderBySchema = [
  strigRequiredValidator('initialDate'),
  strigRequiredValidator('finalDate'),
  query('orderBy')
    .optional()
    .isIn(['comments', 'ups'])
    .withMessage('orderBy must be either "comments" or "ups"'),
];
