import { Thread } from '../../../../infrastructure/database/models/thread';
import { threadService } from '../../../../services/threads/threadService';

jest.mock('../../../../infrastructure/database/models/thread');

describe('threadService.getThreads', () => {
  const mockThreads = [
    { id: 1, title: 'Thread 1', created_utc: '2023-01-01', num_comments: 10 },
    { id: 2, title: 'Thread 2', created_utc: '2023-01-02', num_comments: 20 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle missing orderBy parameter gracefully', async () => {
    (Thread.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockThreads),
    });

    const result = await threadService.getThreads({
      initialDate: '2023-01-01',
      finalDate: '2023-12-31',
      orderBy: undefined,
      page: 1,
      limit: 10,
    });

    expect(Thread.find).toHaveBeenCalledWith({
      created_utc: {
        $gte: '2023-01-01',
        $lte: '2023-12-31',
      },
    });
    expect(Thread.find().sort).toHaveBeenCalledWith(undefined);
    expect(Thread.find().skip).toHaveBeenCalledWith(0);
    expect(Thread.find().limit).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockThreads);
  });

  it('should handle pagination correctly', async () => {
    (Thread.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockThreads),
    });

    const result = await threadService.getThreads({
      initialDate: '2023-01-01',
      finalDate: '2023-12-31',
      orderBy: 'comments',
      page: 2,
      limit: 5,
    });

    expect(Thread.find).toHaveBeenCalledWith({
      created_utc: {
        $gte: '2023-01-01',
        $lte: '2023-12-31',
      },
    });
    expect(Thread.find().sort).toHaveBeenCalledWith({ num_comments: -1 });
    expect(Thread.find().skip).toHaveBeenCalledWith(5);
    expect(Thread.find().limit).toHaveBeenCalledWith(5);
    expect(result).toEqual(mockThreads);
  });

  it('should fetch threads with correct query parameters', async () => {
    (Thread.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockThreads),
    });

    const result = await threadService.getThreads({
      initialDate: '2023-01-01',
      finalDate: '2023-12-31',
      orderBy: undefined,
      page: 1,
      limit: 10,
    });

    expect(Thread.find).toHaveBeenCalledWith({
      created_utc: {
        $gte: '2023-01-01',
        $lte: '2023-12-31',
      },
    });
    expect(Thread.find().sort).toHaveBeenCalledWith(undefined);
    expect(Thread.find().skip).toHaveBeenCalledWith(0);
    expect(Thread.find().limit).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockThreads);
  });
});
