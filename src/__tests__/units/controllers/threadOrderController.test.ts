import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import threadOrderController from '../../../controllers/threadOrderController';
import { threadService } from '../../../services/threads/threadService';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

jest.mock('../../../services/threads/threadService');

describe('Thread Order Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      query: {
        initialDate: '2023-01-01',
        finalDate: '2023-12-31',
        orderBy: 'comments',
        page: '1',
        limit: '10',
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();

    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn(),
    });
  });

  it('should return threads when request is valid', async () => {
    const mockThreads = [{ id: 1, title: 'Thread 1' }];
    (threadService.getThreads as jest.Mock).mockResolvedValue(mockThreads);

    await threadOrderController(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockThreads);
  });

  it('should return 400 if validation fails', async () => {
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([{ msg: 'Invalid data' }]),
    });

    await threadOrderController(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: [{ msg: 'Invalid data' }],
    });
  });

  it('should call next with an error if an exception occurs', async () => {
    const error = new Error('Database error');
    (threadService.getThreads as jest.Mock).mockRejectedValue(error);

    await threadOrderController(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
