import { Router } from 'express';

const router: Router = Router();

router.get('/swagger', (_req, res) => {
  // eslint-disable-next-line no-undef
  return res.sendFile(process.cwd() + '/swagger.json');
});

export default router;
