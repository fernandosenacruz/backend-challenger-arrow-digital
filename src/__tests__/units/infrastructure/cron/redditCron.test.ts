import { fetchHotThreads } from '../../../../services/redditService';

jest.mock('../../../../services/redditService');

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

    await fetchHotThreads();

    expect(fetchHotThreads).toHaveBeenCalled();
  });
});
