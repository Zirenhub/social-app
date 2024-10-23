import { TPostApi } from 'shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPostApi,
  createPostLikeApi,
  getAllPostsApi,
  getPostApi,
} from '../api/postApi';
import { ApiError } from '../api/error';
import queryKeys from '../constants/queryKeys';

const correctDate = (post: TPostApi) => {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  };
};

const correctDateArr = (posts: TPostApi[]) => {
  return posts.map((post) => correctDate(post));
};

export const useGetAllPostsQuery = () => {
  return useQuery<TPostApi[], ApiError>({
    queryKey: queryKeys.posts,
    queryFn: getAllPostsApi,
    retry: false,
    select(data) {
      return correctDateArr(data);
    },
  });
};

export const useGetPostQuery = (username: string, postId: string) => {
  return useQuery<TPostApi, ApiError>({
    queryKey: queryKeys.post(Number(postId)),
    queryFn: () => getPostApi({ username, postId }),
    retry: false,
    select(data) {
      return correctDate(data);
    },
  });
};

type TCreatePost = {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
};

export const useCreatePost = ({ onSuccess, onError }: TCreatePost) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      // two can be made shorter
      // add this post to the home page posts,
      queryClient.setQueryData(queryKeys.posts, (oldData: TPostApi[] = []) => {
        return [correctDate(data), ...oldData];
      });
      // add this post to my profile's posts.
      queryClient.setQueryData(
        queryKeys.profilePosts(data.profile.username),
        (oldData: TPostApi[] = []) => {
          return [correctDate(data), ...oldData];
        }
      );
      onSuccess();
    },
    onError: (err: ApiError) => {
      console.log(err);
      onError(err.message);
    },
  });
};

export const usePostLike = () => {
  const queryClient = useQueryClient();

  // get context where like was fired from!
  return useMutation({
    mutationFn: createPostLikeApi,
    onSuccess: (data) => {
      // add this post to the home page posts,
      queryClient.setQueryData(queryKeys.posts, (oldData: TPostApi[] = []) => {
        return oldData.map((post) => (post.id === data.id ? data : post));
      });
      queryClient.setQueryData(queryKeys.post(data.id), data);
      // add this post to my profile's posts.
      queryClient.setQueryData(
        queryKeys.profilePosts(data.profile.username),
        (oldData: TPostApi[] = []) => {
          return oldData.map((post) => (post.id === data.id ? data : post));
        }
      );
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};
