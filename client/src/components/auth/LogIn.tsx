import { useEffect } from 'react';
import { useLogInForm } from './helpers/useLogInForm';
import { toast } from 'react-toastify';

function LogIn() {
  const { submit, formMethods, formErrors, apiError } = useLogInForm();

  useEffect(() => {
    const errorMessages = Object.values(formErrors).map(
      (error) => error?.message
    );
    errorMessages.forEach((message) => {
      if (message) toast.error(message, { toastId: message });
    });
  }, [formErrors]);

  useEffect(() => {
    if (apiError) toast.error(apiError?.message);
  }, [apiError]);

  return (
    <form onSubmit={submit} className="flex flex-col">
      <label>Email</label>
      <input
        {...formMethods.register('email')}
        type="text"
        className="input-auth"
      />
      <label>Password</label>
      <input
        {...formMethods.register('password')}
        type="password"
        autoComplete="new-password"
        className="input-auth"
      />
      <button className="btn-submit">Log In</button>
    </form>
  );
}

export default LogIn;
