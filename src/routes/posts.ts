import { NextFunction, Request, Response, Router } from 'express';
import postController from '../controllers/postController';
import postOrderController from '../controllers/postOrderController';
import {
  getPostsOrderBySchema,
  getpostsSchema,
} from '../validators/posts/postValidator';

const router: Router = Router();

router.get(
  '/posts',
  getpostsSchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await postController(req, res, next);
  }
);

router.get(
  '/posts/sorted',
  getPostsOrderBySchema,
  async (req: Request, res: Response, next: NextFunction) => {
    await postOrderController(req, res, next);
  }
);

export default router;
