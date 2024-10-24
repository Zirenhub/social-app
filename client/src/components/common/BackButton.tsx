import { useNavigate } from 'react-router-dom';
import BackIcon from '../svg/BackIcon';

type Props = {
  className?: string;
};

function BackButton({ className }: Props) {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <button
      className={`${className && className} text-secondary hover:bg-third hover:text-primary transition-all rounded-full`}
      onClick={handleGoBack}
    >
      <BackIcon className="h-8 w-8 fill-current stroke-current" />
    </button>
  );
}

export default BackButton;
