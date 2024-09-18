import { ToastContainer } from 'react-toastify';
import Auth from './pages/auth/Auth';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className="h-full">
      <Auth />
      <ToastContainer />
    </main>
  );
}

export default App;
