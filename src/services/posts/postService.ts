import { QueryPost } from './../../interfaces/QueryPost';
import { Post } from '../../models/Post';

export const postService = {
  async getPosts({ initialDate, finalDate, orderBy }: QueryPost) {
    if (orderBy) {
      const dbOrderBy = orderBy === 'comments' ? 'num_comments' : orderBy;

      return await Post.find({
        created_utc: {
          $gte: initialDate,
          $lte: finalDate,
        },
      }).sort(dbOrderBy ? { [dbOrderBy]: -1 } : undefined);
    }
    return await Post.find({
      created_utc: {
        $gte: initialDate,
        $lte: finalDate,
      },
    });
  },
};
