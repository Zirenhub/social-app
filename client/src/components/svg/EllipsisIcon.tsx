import { SvgProps } from '../../types/svg';

function EllipsisIcon({ fill, className, width, height }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41.915 41.916"
      width={width}
      height={height}
      fill={fill}
      className={className}
    >
      <g>
        <g>
          <path
            d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585
     C8.705,15.371,11.214,17.874,11.214,20.956z"
          />
          <path
            d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585
     C24.056,15.371,26.564,17.874,26.564,20.956z"
          />
          <path
            d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585
     C39.406,15.371,41.915,17.874,41.915,20.956z"
          />
        </g>
      </g>
    </svg>
  );
}

export default EllipsisIcon;
