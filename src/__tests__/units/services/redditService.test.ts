import axios from 'axios';
import toISODate from '../../../utils/toISODate';
import { fetchHotThreads } from '../../../services/redditService';

jest.mock('axios');
jest.mock('../../../utils/toISODate');

describe('Fetch Hot Threads', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and transform hot threads data from Reddit API', async () => {
    const mockResponse = {
      data: {
        data: {
          children: [
            {
              data: {
                id: 'asjh1asas',
                title: 'Hot Thread',
                author: 'user1',
                created_utc: 1609459200,
                ups: 100,
                num_comments: 50,
              },
            },
          ],
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);
    (toISODate as jest.Mock).mockReturnValue('2021-01-01T00:00:00Z');

    const result = await fetchHotThreads();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.reddit.com/r/artificial/hot'
    );
    expect(toISODate).toHaveBeenCalledWith(1609459200);
    expect(result).toEqual([
      {
        id: 'asjh1asas',
        title: 'Hot Thread',
        author: 'user1',
        created_utc: '2021-01-01T00:00:00Z',
        ups: 100,
        num_comments: 50,
      },
    ]);
  });

  it('should throw an error if the API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(fetchHotThreads()).rejects.toThrow('API error');
  });
});
