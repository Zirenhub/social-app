import { UseFormReturn } from 'react-hook-form';
import { TSignUpData } from '../../../types/user';

type Props = {
  formMethods: UseFormReturn<TSignUpData>;
};

function PageTwo({ formMethods }: Props) {
  const { register } = formMethods;

  return (
    <div className="flex flex-col">
      <label>Username</label>
      <p className="text-sm text-gray-500 font-thin whitespace-nowrap">
        Think hard! You can&apos;t change this!
      </p>
      <input
        {...register('username')}
        type="text"
        className="input-auth"
      ></input>
      <label>Bio</label>
      <p className="text-sm text-gray-500 font-thin whitespace-nowrap">
        Tell us something about yourself!
      </p>
      <textarea
        {...register('bio')}
        className="border-2 h-[150px] px-2 py-1 rounded-sm text-sm text-gray-500 placeholder:font-thin placeholder:text-gray-300"
        placeholder="You don't have to."
        maxLength={160}
      />
    </div>
  );
}

export default PageTwo;
