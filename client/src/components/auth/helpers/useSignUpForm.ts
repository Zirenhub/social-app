import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import User from '../SignUpUserSchema';
import { z } from 'zod';

type TFormInput = z.infer<typeof User>;

export const useSignUpForm = () => {
  const formMethods = useForm<TFormInput>({
    resolver: zodResolver(User),
    defaultValues: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  });

  const {
    formState: { errors },
    watch,
  } = formMethods;

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

  function daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  const getDayOptions = () => {
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const selectedDay = formMethods.getValues('day');
    if (selectedDay > totalDays) {
      formMethods.setValue('day', totalDays);
    }
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  };

  return {
    formMethods,
    onSubmit,
    getDayOptions,
    getYearOptions,
  };
};
