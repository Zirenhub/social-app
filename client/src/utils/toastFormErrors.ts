import { FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';

const toastFormErrors = (formErrors: FieldErrors) => {
  const errorMessages = Object.values(formErrors)
    .map((error) => error?.message)
    .filter((message): message is string => !!message);
  errorMessages.forEach((message) => {
    if (message) toast.error(message, { toastId: message });
  });
};

export default toastFormErrors;
