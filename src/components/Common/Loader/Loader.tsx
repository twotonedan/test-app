import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, styled } from '@mui/material';

const StyledWrapper = styled(Box, transientOptions)<{ $size: number }>`
  .ring {
    --uib-size: ${props => props.$size}px;
    --uib-speed: 2s;
    --uib-color: ${theme.palette.common.white};

    height: var(--uib-size);
    width: var(--uib-size);
    vertical-align: middle;
    transform-origin: center;
    animation: rotate var(--uib-speed) linear infinite;
    margin-bottom: 2px;
  }

  .ring circle {
    fill: none;
    stroke: var(--uib-color);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stretch {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dashoffset: -124px;
    }
  }
`;

type Props = {
  size: number;
};

const Loader = ({ size }: Props) => {
  return (
    <StyledWrapper $size={size}>
      <svg className='ring' viewBox='25 25 50 50' strokeWidth='5'>
        <circle cx='50' cy='50' r='20' />
      </svg>
    </StyledWrapper>
  );
};

export default Loader;
