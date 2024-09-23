import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { z } from 'zod';
import UserSignUp from '@shared/validation/userSchemas';

type TFormInput = z.infer<typeof UserSignUp>;

export const useSignUpForm = () => {
  const formMethods = useForm<TFormInput>({
    resolver: zodResolver(UserSignUp),
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

  const displayErrors = useCallback(() => {
    const errorMessages = Object.values(errors).map((error) => error?.message);
    errorMessages.forEach((message) => {
      if (message) toast.error(message, { toastId: message });
    });
  }, [errors]);

  useEffect(() => {
    displayErrors();
  }, [errors, displayErrors]);

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
    displayErrors,
    getYearOptions,
  };
};
