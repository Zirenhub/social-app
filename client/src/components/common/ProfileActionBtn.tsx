import { twMerge } from 'tailwind-merge';

type TActionButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

function ProfileActionBtn({
  label,
  className = '',
  onClick,
  disabled = false,
  ariaLabel,
}: TActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className={twMerge(
        'text-sm text-primary rounded-lg py-1 px-3 transition-all',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {label}
    </button>
  );
}

export default ProfileActionBtn;
