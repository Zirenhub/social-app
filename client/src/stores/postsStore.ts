import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Post } from 'shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi } from '../api/postApi';
import { ApiError } from '../api/error';

type TPostsStore = {
  posts: Post[];
  addPost: (post: Post) => void;
};

const usePostsStore = create<TPostsStore>()(
  devtools((set) => ({
    posts: [],
    addPost: (post: Post) =>
      set((state) => ({ posts: [...state.posts, post] })),
  }))
);

export const useCreatePost = (close: () => void) => {
  const queryClient = useQueryClient();
  const addPost = usePostsStore((state) => state.addPost);

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      addPost(data);
      queryClient.setQueryData(['posts'], data);
      close();
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export default usePostsStore;
