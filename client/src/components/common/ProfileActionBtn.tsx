import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TActionButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  onHoverLabel?: string;
};

function ProfileActionBtn({
  label,
  className = '',
  onClick,
  disabled = false,
  ariaLabel,
  onHoverLabel,
}: TActionButtonProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={ariaLabel || label}
      className={twMerge(
        'text-sm text-primary rounded-lg py-1 px-3 transition-all',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {isHovering && onHoverLabel ? onHoverLabel : label}
    </button>
  );
}

export default ProfileActionBtn;
