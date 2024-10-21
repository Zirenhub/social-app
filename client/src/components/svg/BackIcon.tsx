import { SvgProps } from '../../types/svg';

function BackIcon({ fill, className, width, height }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill={fill}
      className={className}
    >
      <polyline
        points="244 400 100 256 244 112"
        style={{
          fill: 'none',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '48px',
        }}
      />
      <line
        x1="120"
        y1="256"
        x2="412"
        y2="256"
        style={{
          fill: 'none',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '48px',
        }}
      />
    </svg>
  );
}

export default BackIcon;
