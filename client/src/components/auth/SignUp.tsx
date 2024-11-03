import PageOne from './signUpPages/PageOne';
import PageTwo from './signUpPages/PageTwo';
import { useSignUpForm } from './helpers/useSignUpForm';
import { useEffect, useState } from 'react';
import { FIRST_PAGE_FIELDS } from '../../constants/constants';
import { TSignUpData } from '../../types/user';
import toastFormErrors from '../../utils/toastFormErrors';

function SignUp() {
  const [page, setPage] = useState<1 | 2>(1);

  const { formMethods, getDayOptions, submit, getYearOptions, formErrors } =
    useSignUpForm();

  useEffect(() => {
    toastFormErrors(formErrors);
  }, [formErrors]);

  const nextPage = async () => {
    // validate only fields that exist on first page of the signup process
    // feels tacky and should be fixed later
    const isValid = await formMethods.trigger(FIRST_PAGE_FIELDS);
    if (isValid) {
      setPage(2);
    } else {
      toastFormErrors(formErrors);
    }
  };

  const prevPage = () => {
    const values = formMethods.getValues();
    Object.entries(values).forEach(([key, value]) => {
      formMethods.setValue(key as keyof TSignUpData, value);
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
