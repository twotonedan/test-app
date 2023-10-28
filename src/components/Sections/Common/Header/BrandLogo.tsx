import { styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

type Props = {
  logoSrc: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};

const BrandLogo = ({ logoSrc, alt, href = '/', width = 141, height = 40, onClick }: Props) => {
  return (
    <StyledLink href={onClick ? '#' : href} onClick={onClick}>
      <Image src={logoSrc} alt={alt} width={width} height={height} />
    </StyledLink>
  );
};

export default BrandLogo;
