import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../../stores/authStore';
import { toast } from 'react-toastify';
import { TLogInData } from '../../../types/user';
import { ZUserLogIn } from 'shared';
import { useState, useEffect } from 'react';

export const useLogInForm = () => {
  const formMethods = useForm<TLogInData>({
    resolver: zodResolver(ZUserLogIn),
  });

  const [previousEmail, setPreviousEmail] = useState<string | null>(null);
  const {
    formState: { errors },
    handleSubmit,
    watch,
    resetField,
  } = formMethods;

  const { mutate: logIn, error } = useLogin();
  const currentEmail = watch('email');

  useEffect(() => {
    if (previousEmail && currentEmail !== previousEmail) {
      // If email changes after conflict, allow submission
      setPreviousEmail(null);
    }
  }, [currentEmail, previousEmail]);

  const onSubmit: SubmitHandler<TLogInData> = (formData) => {
    if (previousEmail && currentEmail === previousEmail) {
      // If email hasn't changed after a 404, show error toast
      toast.error('Email not found. Please change the email.');
      return;
    }

    // Proceed with login mutation
    logIn(formData, {
      onError: (error) => {
        if (error.status === 404) {
          // Mark the email as not found, so user must change it
          setPreviousEmail(formData.email);
        }
      },
      onSuccess: () => {
        setPreviousEmail(null); // Clear the error if login succeeds
        resetField('email');
      },
    });
  };

  const submit = handleSubmit(onSubmit);

  return { submit, formMethods, formErrors: errors, apiError: error };
};
