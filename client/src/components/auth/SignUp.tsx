import { z } from 'zod';
import { useSignUpForm } from './helpers/useSignUpForm';
import PageOne from './signUpPages/pageOne';
import User from './SignUpUserSchema';
import { useState } from 'react';

type TFormInput = z.infer<typeof User>;

function SignUp() {
  const [page, setPage] = useState<1 | 2>(1);

  const { formMethods, onSubmit, getDayOptions, getYearOptions } =
    useSignUpForm();

  const { handleSubmit } = formMethods;

  const nextPage = async () => {
    const isValid = await formMethods.trigger();
    if (isValid) {
      setPage(2);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-3 px-5">
      {page === 1 ? (
        <>
          <PageOne
            formMethods={formMethods}
            getDayOptions={getDayOptions}
            getYearOptions={getYearOptions}
          />
          <button type="button" onClick={nextPage} className="btn-auth">
            Next
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={prevPage} className="btn-auth">
            Back
          </button>
          <input type="submit" className="btn-auth" />
        </>
      )}
    </form>
  );
}

export default SignUp;
