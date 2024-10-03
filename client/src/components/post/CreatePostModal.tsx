import { SubmitHandler, useForm } from 'react-hook-form';
import { scaleVariants } from '../../constants/constants';
import ProfilePicture from '../profile/ProfilePicture';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { ZPost, postContentMaxLength } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '../../stores/postsStore';
import { useEffect } from 'react';
import toastFormErrors from '../../utils/toastFormErrors';
import { toast } from 'react-toastify';

type Props = {
  close: () => void;
};
type TFormInput = z.infer<typeof ZPost>;

function CreatePostModal({ close }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: zodResolver(ZPost),
  });

  const { mutate: createPost, error } = useCreatePost(close);

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    createPost(data);
  };

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    toastFormErrors(errors);
  }, [errors]);

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10" />
      <motion.div
        variants={scaleVariants}
        key="post-modal"
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-30 flex items-center justify-center"
      >
        <div className="relative z-40 p-4 bg-primary rounded-xl shadow-xl text-secondary w-[500px] max-w-full">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={close}
              className="text-lg text-fourth hover:text-secondary transition-colors"
            >
              X
            </button>
            <p className="font-semibold text-lg">Create a New Post!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3 items-start">
              <ProfilePicture styles="h-14 w-14 border-2 border-primary shadow-sm" />
              <textarea
                {...register('content')}
                className="flex-1 bg-secondary/20 h-36 text-third placeholder-third/60 rounded-lg px-4 py-2 outline-none text-md resize-none shadow-inner"
                placeholder="What is happening?"
                maxLength={postContentMaxLength}
              />
            </div>
            <div className="flex items-center mt-4">
              <select
                {...register('visibility')}
                className="bg-transparent font-semibold"
              >
                <option value={'EVERYONE'}>Everyone</option>
                <option value={'FRIENDS'}>Friends</option>
              </select>
              <span>can view this post.</span>
              <button
                type="submit"
                className="ml-auto font-bold text-primary py-1 px-3 bg-secondary rounded-md hover:bg-secondary/40 hover:underline underline-offset-4 transition-all"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default CreatePostModal;
