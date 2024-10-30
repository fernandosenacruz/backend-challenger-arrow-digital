import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { threadService } from '../services/threads/threadService';

const threadOrderController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      initialDate,
      finalDate,
      orderBy,
      page = 1,
      limit = 10,
    } = request.query;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const threads = await threadService.getThreads({
      initialDate: initialDate as string,
      finalDate: finalDate as string,
      orderBy: orderBy as 'comments' | 'ups',
      page: +page,
      limit: +limit,
    });

    return response.status(200).json(threads);
  } catch (error) {
    return next(error);
  }
};

export default threadOrderController;
