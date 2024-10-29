import { NextFunction, Request, Response, Router } from 'express';
import threadController from '../controllers/threadController';
import threadOrderController from '../controllers/threadOrderController';
import {
  getThreadsOrderBySchema,
  getThreadsSchema,
} from '../validators/threads/threadValidator';

const router: Router = Router();

router.get(
  '/threads',
  getThreadsSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await threadController(req, res, next);
  }
);

router.get(
  '/threads/sorted',
  getThreadsOrderBySchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await threadOrderController(req, res, next);
  }
);

export default router;
