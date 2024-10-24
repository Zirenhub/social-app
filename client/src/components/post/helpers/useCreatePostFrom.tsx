import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TPost } from '../../../types/post';
import { ZPost } from 'shared';
import { useCreatePost } from '../../../stores/postsStore';

type Props = {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
};

function useCreatePostForm({ onSuccess, onError }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TPost>({
    resolver: zodResolver(ZPost),
  });

  const { mutate: createPost } = useCreatePost({
    onSuccess,
    onError,
  });

  const onSubmit: SubmitHandler<TPost> = (data) => {
    createPost(data);
    reset();
  };

  return { register, submit: handleSubmit(onSubmit), formErrors: errors };
}

export default useCreatePostForm;
