import { Router } from 'express';
import postController from '../controllers/postController';
import postOrderController from '../controllers/postOrderController';

const router: Router = Router();

router.get('/posts', async (req, res, next) => {
  await postController(req, res, next);
});

router.get('/posts/sorted', async (req, res, next) => {
  await postOrderController(req, res, next);
});

export default router;
