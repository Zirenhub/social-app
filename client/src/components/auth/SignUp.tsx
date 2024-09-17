import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import User from './SignUpUserSchema';

type TFormInput = z.infer<typeof User>;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function SignUp() {
  const [page, setPage] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<TFormInput>({
    resolver: zodResolver(User),
    defaultValues: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  });

  const selectedMonth = watch('month');
  const selectedYear = watch('year');

  useEffect(() => {
    const errorMessages = Object.values(errors)
      .map((error) => error?.message)
      .filter(Boolean) as string[];

    errorMessages.forEach((message) => toast.error(message));
  }, [errors]);

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log('Form submitted', data);
    toast.success('Sign up successful!');
  };

  const nextPage = async () => {
    const isValid = await trigger();
    if (isValid) {
      setPage(2);
    }
  };

  const prevPage = () => {
    const values = getValues();
    Object.entries(values).forEach(([key, value]) => {
      setValue(key as keyof TFormInput, value);
    });
    setPage(1);
  };

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  const getDayOptions = () => {
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const selectedDay = getValues('day');
    if (selectedDay > totalDays) {
      // if currently selected day is bigger than the avalible days in newly selected month
      // reset the day to total days
      setValue('day', totalDays);
    }
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  };

  const firstPage = () => (
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
      <div className="flex">
        <div className="flex flex-col">
          <label>Day</label>
          <select
            {...register('day', {
              setValueAs(value) {
                return Number(value);
              },
            })}
            className="text-gray-500 input-auth"
          >
            {getDayOptions().map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Month</label>
          <select
            {...register('month', {
              setValueAs(value) {
                return Number(value);
              },
            })}
            className="text-gray-500 input-auth"
          >
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Year</label>
          <select
            {...register('year', {
              setValueAs(value) {
                return Number(value);
              },
            })}
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
      <button type="button" onClick={nextPage} className="btn-auth">
        Next
      </button>
    </>
  );

  const secondPage = () => (
    <>
      <button type="button" onClick={prevPage} className="btn-auth">
        Back
      </button>
      <input type="submit" className="btn-auth" />
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-3 px-5">
      {page === 1 ? firstPage() : secondPage()}
    </form>
  );
}

export default SignUp;
