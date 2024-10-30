import { query } from 'express-validator';

export const strigRequiredValidator = (key: string) => {
  return query(key)
    .isISO8601()
    .withMessage(`${key} must be a valid date in ISO 8601 format`)
    .notEmpty()
    .withMessage(`${key} is required`);
};
