import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../../stores/authStore';
import { UserLogIn } from 'shared';
import { z } from 'zod';
import { toast } from 'react-toastify';

type TFormInput = z.infer<typeof UserLogIn>;

export const useLogInForm = () => {
  const formMethods = useForm<TFormInput>({
    resolver: zodResolver(UserLogIn),
  });

  const {
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const { mutate: logIn, error } = useLogin();

  const onSubmit: SubmitHandler<TFormInput> = (formData) => {
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
