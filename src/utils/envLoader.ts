import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  PORT: string | number;
  BASE_URL?: string;
  MONGO_URL?: string;
}

export const loadVariables = (): Environment => {
  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT ?? 3000;
  // eslint-disable-next-line no-undef
  const MONGO_URL = process.env.MONGO_URL;
  // eslint-disable-next-line no-undef
  const BASE_URL = process.env.BASE_URL;

  return {
    PORT,
    MONGO_URL,
    BASE_URL,
  };
};
