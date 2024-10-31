import request from 'supertest';
import { app } from '../..';
import { Server } from 'http';
import { scheduleTask } from '../../infrastructure/cron/redditCron';
import { threadService } from '../../services/threads/threadService';

jest.mock('../../services/threads/threadService', () => ({
  threadService: {
    getThreads: jest.fn(),
  },
}));

let server: Server;
const mockThread = {
  __v: 0,
  _id: '1gdderl',
  author: 'MetaKnowing',
  created_utc: '2024-10-27T15:24:03.000Z',
  num_comments: 26,
  title:
    'Weird... in the middle of a response, Claude suddenly notices it might be hallucinating',
  ups: 44,
};

beforeAll((done) => {
  server = app.listen(3001, () => {
    done();
  });
});

beforeEach(() => {
  (threadService.getThreads as jest.Mock).mockResolvedValue([mockThread]);
});

afterAll((done) => {
  scheduleTask.stop();
  server.close(done);
  jest.clearAllMocks();
});

describe('Get Threads subreddit Artificial', () => {
  it('should return hot threads from subreddit Artificial', async () => {
    const query =
      'initialDate=2024-10-27T15:24:03&finalDate=2024-10-28T00:00:00.000Z&page=1&limit=1';
    const response = await request(app)
      .get('/api/threads?' + query)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockThread]);
  });

  it('should return hot threads from subreddit Artificial with sorted', async () => {
    const query =
      'initialDate=2024-10-27T15:24:03&finalDate=2024-10-28T00:00:00.000Z&orderBy=comments&page=1&limit=1';
    const response = await request(app)
      .get('/api/threads?' + query)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockThread]);
  });

  it('should return 400 if validation fails', async () => {
    const query = 'initialDate=ximira&finalDate=2024-10-28T00:00:00.000Z';
    const response = await request(app)
      .get('/api/threads?' + query)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          location: 'query',
          msg: 'initialDate must be a valid date in ISO 8601 format',
          path: 'initialDate',
          type: 'field',
          value: 'ximira',
        },
      ],
    });
  });
});

describe('threadOrderController - Erros', () => {
  it('Should return 500 if threadService throws an error', async () => {
    (threadService.getThreads as jest.Mock).mockRejectedValueOnce(
      new Error('Internal Server Error')
    );

    const query =
      'initialDate=2024-10-27T15:24:03&finalDate=2024-10-28T00:00:00.000Z&page=1&limit=1';
    const response = await request(app).get('/api/threads?' + query);
    expect(response.status).toBe(500);
  });
});
