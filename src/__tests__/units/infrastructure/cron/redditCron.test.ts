import { Thread } from '../../../../infrastructure/database/models/thread';
import { fetchAndSaveThreads } from '../../../../infrastructure/cron/redditCron';
import { fetchHotThreads } from '../../../../services/redditService';

jest.mock('../../../../services/redditService');
jest.mock('../../../../infrastructure/database/models/thread');

describe('Reddit Cron', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch hot threads and save them to the database', async () => {
    const mockThreads = [
      {
        id: 'asjh1asas',
        title: 'Hot Thread',
        author: 'user1',
        created_utc: '2021-01-01T00:00:00Z',
        ups: 100,
        num_comments: 50,
      },
    ];

    (fetchHotThreads as jest.Mock).mockResolvedValue(mockThreads);
    const bulkWriteMock = jest
      .spyOn(Thread, 'bulkWrite')
      .mockResolvedValue({} as any);

    await fetchAndSaveThreads();

    expect(fetchHotThreads).toHaveBeenCalled();
    expect(bulkWriteMock).toHaveBeenCalledWith([
      {
        updateOne: {
          filter: { _id: mockThreads[0].id },
          update: { $set: mockThreads[0] },
          upsert: true,
        },
      },
    ]);
  });

  it('should log a message if no valid threads are found', async () => {
    (fetchHotThreads as jest.Mock).mockResolvedValue([]);

    const consoleLogSpy = jest.spyOn(console, 'log');
    await fetchAndSaveThreads();

    expect(fetchHotThreads).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Nenhum threads válido encontrado para salvar.'
    );
  });

  it('should log an error message if fetching threads fails', async () => {
    (fetchHotThreads as jest.Mock).mockRejectedValue(new Error('API Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');

    await fetchAndSaveThreads();

    expect(fetchHotThreads).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao salvar threads:',
      expect.any(Error)
    );
  });

  it('should handle bulkWrite errors gracefully', async () => {
    const mockThreads = [
      {
        id: 'asjh1asas',
        title: 'Hot Thread',
        author: 'user1',
        created_utc: '2021-01-01T00:00:00Z',
        ups: 100,
        num_comments: 50,
      },
    ];

    (fetchHotThreads as jest.Mock).mockResolvedValue(mockThreads);
    const bulkWriteMock = jest
      .spyOn(Thread, 'bulkWrite')
      .mockRejectedValue(new Error('Database Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');

    await fetchAndSaveThreads();

    expect(fetchHotThreads).toHaveBeenCalled();
    expect(bulkWriteMock).toHaveBeenCalledWith([
      {
        updateOne: {
          filter: { _id: mockThreads[0].id },
          update: { $set: mockThreads[0] },
          upsert: true,
        },
      },
    ]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao salvar threads:',
      expect.any(Error)
    );
  });
});
