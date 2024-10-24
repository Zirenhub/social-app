import { toast } from 'react-toastify';
import useCreatePostForm from './helpers/useCreatePostFrom';
import { useEffect } from 'react';
import toastFormErrors from '../../utils/toastFormErrors';
import ProfilePicture from '../profile/ProfilePicture';
import { postContentMaxLength } from 'shared';

type Props = {
  onSuccessSideEffect?: () => void;
};

function CreatePost({ onSuccessSideEffect }: Props) {
  const postCreated = () => {
    if (onSuccessSideEffect) {
      onSuccessSideEffect();
    }
    toast.success('Successfully created post!');
  };

  const { register, submit, formErrors } = useCreatePostForm({
    onSuccess: postCreated,
    onError: (errMsg) => toast.error(errMsg),
  });

  useEffect(() => {
    toastFormErrors(formErrors);
  }, [formErrors]);

  return (
    <form onSubmit={submit}>
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
  );
}

export default CreatePost;
