import LogIn from '../../components/auth/LogIn';
import SignUp from '../../components/auth/SignUp';

function Auth() {
  return (
    <div className="flex justify-center items-center flex-col m-24 gap-16">
      <h1 className="text-green-500 font-bold text-9xl">Kquirtz</h1>
      <div className="flex shadow-md border-2 border-gray-50 rounded-md hover:border-gray-200 transition-all">
        <div className="px-6 flex gap-3">
          <h2 className="text-green-400 font-bold text-4xl pt-4 whitespace-nowrap">
            Sign Up!
          </h2>
          <SignUp />
        </div>
        <div className="bg-[#1a1a1a] rounded-tr-md rounded-br-md shadow-md w-[170px] text-white px-8 flex justify-center items-center">
          <h2 className="font-bold text-2xl">Log In!</h2>
          {/* <LogIn /> */}
        </div>
      </div>
    </div>
  );
}

export default Auth;
