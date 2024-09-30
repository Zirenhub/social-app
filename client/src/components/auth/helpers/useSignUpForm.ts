import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { UserSignUp } from 'shared';
import { useSignUp } from '../../../stores/authStore';

type TFormInput = z.infer<typeof UserSignUp>;
type TUniqueFields = 'email' | 'username';
type TConflict = { field: TUniqueFields; value: string };

export const useSignUpForm = () => {
  const formMethods = useForm<TFormInput>({
    resolver: zodResolver(UserSignUp),
    defaultValues: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  });
  // tried adopting this custom conflict to formMethods, could not do it, a bunc of sync mess, maybe in the future
  const [conflict, setConflict] = useState<TConflict | null>(null);

  const {
    formState: { errors },
    watch,
    handleSubmit,
    getValues,
  } = formMethods;

  const selectedMonth = watch('month');
  const selectedYear = watch('year');

  const { mutate: signUp, error } = useSignUp();

  const isConflictResolved = () => {
    if (conflict) {
      const currentFieldVal = formMethods.getValues(conflict.field);
      if (currentFieldVal !== conflict.value) {
        setConflict(null);
        // setState is asynchronous thus cant use conflict in below submit, lazy fix
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const registerConflict = (conflictField: TUniqueFields) => {
      const fieldVal = getValues(conflictField);
      setConflict({
        field: conflictField,
        value: fieldVal,
      });
      alreadyExistsAlert(conflictField);
    };

    if (error) {
      if (error.status === 409 && error.details?.field) {
        // conflict error, field will point to the filed that is conflicting
        registerConflict(error.details.field[0] as TUniqueFields);
      } else {
        toast.error(error.message);
      }
    }
  }, [error, getValues]);

  const onSubmit: SubmitHandler<TFormInput> = async (formData) => {
    if (!conflict) {
      signUp(formData);
    } else {
      const isResolved = isConflictResolved();
      if (isResolved) {
        signUp(formData);
      } else {
        alreadyExistsAlert(conflict.field);
      }
    }
  };

  const submit = handleSubmit(onSubmit);

  const alreadyExistsAlert = (field: string) => {
    toast.error(`${field} already exists.`, { autoClose: 10000 });
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
    getDayOptions,
    submit,
    getYearOptions,
    formErrors: errors,
  };
};
