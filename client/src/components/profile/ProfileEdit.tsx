import { SubmitHandler, useForm } from 'react-hook-form';
import useAuthStore from '../../stores/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUpdate } from '../../types/user';
import { ZUpdate } from 'shared';
import ProfilePicture from './ProfilePicture';
import { useUpdateProfileMutation } from '../../stores/profileStore';
import { useEffect } from 'react';
import toastFormErrors from '../../utils/toastFormErrors';
import { toast } from 'react-toastify';

function ProfileEdit() {
  const { user } = useAuthStore();
  const { mutate } = useUpdateProfileMutation();

  const formMethods = useForm<TUpdate>({
    resolver: zodResolver(ZUpdate),
    defaultValues: { ...user?.profile, bio: user?.profile.bio || undefined },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const onSubmit: SubmitHandler<TUpdate> = (data) => {
    mutate(data, {
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  useEffect(() => {
    toastFormErrors(errors);
  }, [errors]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex bg-white/60 p-3 rounded-lg shadow-inner">
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            {...register('firstName')}
            className="bg-primary outline-none border-2 border-third/50 text-secondary py-1 px-3 rounded-lg shadow-lg"
          />
          <label>Last Name</label>
          <input
            {...register('lastName')}
            className="bg-primary outline-none border-2 border-third/50 text-secondary py-1 px-3 rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col mx-3 items-center justify-end gap-2">
          <ProfilePicture styles="grow w-full shrink-0 border-2 border-third/50" />
          <button
            type="button"
            className="bg-secondary text-primary rounded-md px-3 transition-all hover:text-secondary hover:bg-primary"
          >
            Change
          </button>
        </div>
        <div className="flex flex-col text-center">
          <label>Bio</label>
          <textarea
            {...register('bio')}
            className="outline-none border-2 resize-none border-third/50 bg-primary text-secondary py-1 px-3 rounded-lg shadow-lg h-full"
            maxLength={160}
          />
        </div>
      </div>
      <button
        type="submit"
        className="ml-auto px-3 py-1 bg-green-400/80 rounded-lg transition-all hover:bg-blue-400 text-primary mt-3"
      >
        Save Changes
      </button>
    </form>
  );
}

export default ProfileEdit;
