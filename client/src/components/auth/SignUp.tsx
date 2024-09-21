import { z } from 'zod';
import { useSignUpForm } from './helpers/useSignUpForm';
import PageOne from './signUpPages/PageOne';
import User from './SignUpUserSchema';
import { useState } from 'react';
import PageTwo from './signUpPages/PageTwo';
import { FIRST_PAGE_FIELDS } from '../../constants/formConstants';

type TFormInput = z.infer<typeof User>;

function SignUp() {
  const [page, setPage] = useState<1 | 2>(2);

  const {
    formMethods,
    displayErrors,
    onSubmit,
    getDayOptions,
    getYearOptions,
  } = useSignUpForm();

  const { handleSubmit } = formMethods;

  const nextPage = async () => {
    // validate only fields that exist on first page of the signup process
    // feels tacky and should be fixed later
    const isValid = await formMethods.trigger(FIRST_PAGE_FIELDS);
    if (isValid) {
      setPage(2);
    } else {
      displayErrors();
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
        <div className="flex flex-col">
          <PageTwo formMethods={formMethods} />
          <div className="flex justify-between">
            <button type="button" onClick={prevPage} className="btn-auth">
              Back
            </button>
            <input type="submit" className="btn-auth" />
          </div>
        </div>
      )}
    </form>
  );
}

export default SignUp;
