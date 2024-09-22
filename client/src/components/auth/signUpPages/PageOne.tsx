import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { MONTHS } from '../../../constants/formConstants';
import User from '@shared/validation/userSchema';

type TFormInput = z.infer<typeof User>;

type Props = {
  formMethods: UseFormReturn<TFormInput>;
  getDayOptions: () => number[];
  getYearOptions: () => number[];
};

function PageOne({ formMethods, getDayOptions, getYearOptions }: Props) {
  const { register } = formMethods;

  return (
    <>
      <label>First Name</label>
      <input {...register('firstName')} className="input-auth" />
      <label>Last Name</label>
      <input {...register('lastName')} className="input-auth" />
      <label>Email</label>
      <input {...register('email')} className="input-auth" />
      <label>Password</label>
      <input {...register('password')} className="input-auth" type="password" />
      <label>Confirm Password</label>
      <input
        {...register('confirmPassword')}
        className="input-auth"
        type="password"
      />
      <label>Gender</label>
      <select {...register('gender')} className="input-auth">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <label>Day</label>
          <select
            {...register('day', { setValueAs: (value) => Number(value) })}
            className="text-gray-500 input-auth"
          >
            {getDayOptions().map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label>Month</label>
          <select
            {...register('month', { setValueAs: (value) => Number(value) })}
            className="text-gray-500 input-auth"
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label>Year</label>
          <select
            {...register('year', { setValueAs: (value) => Number(value) })}
            className="text-gray-500 input-auth"
          >
            {getYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default PageOne;
