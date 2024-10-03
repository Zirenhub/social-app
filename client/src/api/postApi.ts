import { z } from 'zod';
import { ApiResponse, Post, ZPost } from 'shared';
import api from '../app/axios';
import { errorHandler } from './errorHandler';

type TPostData = z.infer<typeof ZPost>;

const createPostBase = (data: TPostData) =>
  api.post<ApiResponse<Post>>('post', data);

const createPostApi = errorHandler(createPostBase);

export { createPostApi };
