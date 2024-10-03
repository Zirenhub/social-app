import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../../stores/authStore';
import { toast } from 'react-toastify';
import { TLogInData } from '../../../types/user';
import { ZUserLogIn } from 'shared';

export const useLogInForm = () => {
  const formMethods = useForm<TLogInData>({
    resolver: zodResolver(ZUserLogIn),
  });

  const {
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const { mutate: logIn, error } = useLogin();

  const onSubmit: SubmitHandler<TLogInData> = (formData) => {
    if (error?.status === 404) {
      const currentEmail = formMethods.getValues('email');
      if (currentEmail === formData.email) {
        toast.error('Please change the email');
      }
    } else {
      logIn(formData);
    }
  };

  const submit = handleSubmit(onSubmit);

  return { submit, formMethods, formErrors: errors, apiError: error };
};
