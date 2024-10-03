import { UseFormReturn } from 'react-hook-form';
import { MONTHS } from '../../../constants/constants';
import { TSignUpData } from '../../../types/user';

type Props = {
  formMethods: UseFormReturn<TSignUpData>;
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
      <input
        {...register('password')}
        // without this autocomplete, if password gets filled
        // zod validations on password wont work
        autoComplete="new-password"
        className="input-auth"
        type="password"
      />
      <label>Confirm Password</label>
      <input
        {...register('confirmPassword')}
        autoComplete="new-password"
        className="input-auth"
        type="password"
      />
      <label>Gender</label>
      <select {...register('gender')} className="input-auth">
        <option value="FEMALE">Female</option>
        <option value="MALE">Male</option>
        <option value="OTHER">Other</option>
      </select>
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <label>Day</label>
          <select
            {...register('day', { setValueAs: (value) => Number(value) })}
            className="text-gray-500 input-auth w-3/4 self-center text-center"
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
            className="text-gray-500 input-auth w-3/4 self-center text-center"
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
            className="text-gray-500 input-auth w-3/4 self-center text-center"
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
