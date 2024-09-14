import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import User from './SignUpUserSchema';

type TFormInput = z.infer<typeof User>;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: zodResolver(User),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log('Form submitted');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-3 px-5">
      <label>First Name</label>
      <input
        {...register('firstName')}
        className="border-2 rounded-sm px-2 py-1"
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <label>Last Name</label>
      <input
        {...register('lastName')}
        className="border-2 rounded-sm px-2 py-1"
      />
      {errors.lastName && <span>{errors.lastName.message}</span>}
      <label>Email</label>
      <input {...register('email')} className="border-2 rounded-sm px-2 py-1" />
      {errors.email && <span>{errors.email.message}</span>}
      <label>Password</label>
      <input
        {...register('password')}
        className="border-2 rounded-sm px-2 py-1"
        type="password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      <label>Gender</label>
      <select {...register('gender')} className="border-2 rounded-sm px-2 py-1">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <span>{errors.gender.message}</span>}
      <input
        type="submit"
        className="self-end border-2 w-fit text-lg mt-3 px-3 py-1 border-gray-400 rounded-sm mb-2 hover:cursor-pointer hover:rounded-lg hover:bg-green-200 transition-all"
      />
    </form>
  );
}

export default SignUp;
