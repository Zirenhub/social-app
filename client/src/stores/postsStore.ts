import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TPostApi } from 'shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPostApi, getAllPostsApi } from '../api/postApi';
import { ApiError } from '../api/error';

type TPostsStore = {
  posts: TPostApi[];
  addPost: (post: TPostApi) => void;
  initPosts: (posts: TPostApi[]) => void;
};

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

const usePostsStore = create<TPostsStore>()(
  devtools((set) => ({
    posts: [],
    addPost: (post: TPostApi) =>
      set((state) => ({ posts: [correctDate(post), ...state.posts] })),
    initPosts: (posts: TPostApi[]) =>
      set({ posts: correctDateArr(posts).reverse() }), // reverse so the newest posts are on top
  }))
);

export const useGetAllPostsQuery = () => {
  return useQuery<TPostApi[], ApiError>({
    queryKey: ['posts'],
    queryFn: getAllPostsApi,
    retry: false,
  });
};

export const useCreatePost = (success: () => void) => {
  const addPost = usePostsStore((state) => state.addPost);

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      addPost(data);
      // queryClient.setQueryData(['posts'], data);
      success();
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export default usePostsStore;
