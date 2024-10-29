import { QueryThread } from '../../interfaces/QueryThread';
import { Thread } from '../../models/thread';

export const threadService = {
  async getThreads({
    initialDate,
    finalDate,
    orderBy,
    page = 1,
    limit = 10,
  }: QueryThread) {
    const skip = (page - 1) * limit;
    const dbOrderBy = orderBy === 'comments' ? 'num_comments' : orderBy;

    return await Thread.find({
      created_utc: {
        $gte: initialDate,
        $lte: finalDate,
      },
    })
      .sort(dbOrderBy ? { [dbOrderBy]: -1 } : undefined)
      .skip(skip)
      .limit(limit);
  },
};
