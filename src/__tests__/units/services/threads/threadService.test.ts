import { Thread } from '../../../../infrastructure/database/models/thread';
import { threadService } from '../../../../services/threads/threadService';

jest.mock('../../../../infrastructure/database/models/thread');

describe('Thread Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return threads with correct filters and sorting', async () => {
    const mockThreads = [{ id: 1, title: 'Thread 1' }];
    const findMock = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockThreads),
    };

    (Thread.find as jest.Mock).mockReturnValue(findMock);

    const result = await threadService.getThreads({
      initialDate: '2023-01-01',
      finalDate: '2023-12-31',
      orderBy: 'comments',
      page: 1,
      limit: 10,
    });

    expect(Thread.find).toHaveBeenCalledWith({
      created_utc: {
        $gte: '2023-01-01',
        $lte: '2023-12-31',
      },
    });
    expect(findMock.sort).toHaveBeenCalledWith({ num_comments: -1 });
    expect(findMock.skip).toHaveBeenCalledWith(0);
    expect(findMock.limit).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockThreads);
  });

  it('should default to page 1 and limit 10 if not provided', async () => {
    const findMock = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    };

    (Thread.find as jest.Mock).mockReturnValue(findMock);

    await threadService.getThreads({
      initialDate: '2023-01-01',
      finalDate: '2023-12-31',
    });

    expect(findMock.skip).toHaveBeenCalledWith(0);
    expect(findMock.limit).toHaveBeenCalledWith(10);
  });
});
