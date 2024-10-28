import { QueryPost } from './../../interfaces/QueryPost';
import { Post } from '../../models/Post';

export const postService = {
  async getPosts({
    initialDate,
    finalDate,
    orderBy,
    page = 1,
    limit = 10,
  }: QueryPost) {
    const skip = (page - 1) * limit;
    const dbOrderBy = orderBy === 'comments' ? 'num_comments' : orderBy;

    return await Post.find({
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
