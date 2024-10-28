import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { postService } from '../services/posts/postService';

const postController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { initialDate, finalDate, page = 1, limit = 10 } = request.query;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const posts = await postService.getPosts({
      initialDate: initialDate as string,
      finalDate: finalDate as string,
      page: +page,
      limit: +limit,
    });

    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

export default postController;
