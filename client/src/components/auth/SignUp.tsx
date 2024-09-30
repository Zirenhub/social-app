import PageOne from './signUpPages/PageOne';
import PageTwo from './signUpPages/PageTwo';
import { z } from 'zod';
import { useSignUpForm } from './helpers/useSignUpForm';
import { UserSignUp } from 'shared';
import { useCallback, useEffect, useState } from 'react';
import { FIRST_PAGE_FIELDS } from '../../constants/formConstants';
import { toast } from 'react-toastify';

type TFormInput = z.infer<typeof UserSignUp>;

function SignUp() {
  const [page, setPage] = useState<1 | 2>(1);

  const { formMethods, getDayOptions, submit, getYearOptions, formErrors } =
    useSignUpForm();

  const notifyFormErrors = useCallback(() => {
    const errorMessages = Object.values(formErrors).map(
      (error) => error?.message
    );
    errorMessages.forEach((message) => {
      if (message) toast.error(message, { toastId: message });
    });
  }, [formErrors]);

  useEffect(() => {
    notifyFormErrors();
  }, [formErrors, notifyFormErrors]);

  const nextPage = async () => {
    // validate only fields that exist on first page of the signup process
    // feels tacky and should be fixed later
    const isValid = await formMethods.trigger(FIRST_PAGE_FIELDS);
    if (isValid) {
      setPage(2);
    } else {
      notifyFormErrors();
    }
  };

  const prevPage = () => {
    const values = formMethods.getValues();
    Object.entries(values).forEach(([key, value]) => {
      formMethods.setValue(key as keyof TFormInput, value);
    });
    setPage(1);
  };

  return (
    <form onSubmit={submit} className="flex flex-col">
      {page === 1 ? (
        <>
          <PageOne
            formMethods={formMethods}
            getDayOptions={getDayOptions}
            getYearOptions={getYearOptions}
          />
          <button
            type="button"
            onClick={nextPage}
            className="btn-auth self-end mb-2"
          >
            Next
          </button>
        </>
      ) : (
        <>
          <PageTwo formMethods={formMethods} />
          <div className="flex justify-between mb-2">
            <button type="button" onClick={prevPage} className="btn-auth">
              Back
            </button>
            <input type="submit" className="btn-submit" value={'Sign Up'} />
          </div>
        </>
      )}
    </form>
  );
}

export default SignUp;
