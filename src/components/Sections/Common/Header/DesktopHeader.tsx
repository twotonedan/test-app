import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import useGetCompany from '@/hooks/api/useGetCompany';
import theme from '@/theme/theme';
import { Box, Typography, styled } from '@mui/material';
import { transientOptions } from '@/utils/transientOptions';

import BrandLogo from './BrandLogo';

const StyledStickyHeader = styled(StickyHeader)`
  z-index: 1250;

  .stickyHeader-innerWrapper {
    ${theme.mixins.layout};
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

const StyledMktBanner = styled(Box, transientOptions)<{ $bgColor?: string }>`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.$bgColor || theme.palette.customColors.lapisLazuli};
  margin-bottom: 32px;

  ${theme.breakpoints.down('lg')} {
    display: none;
  }
`;

const StyledMktText = styled(Typography)`
  color: ${theme.palette.common.white};
  width: max-content;
  margin: 0 auto;
`;

type Props = {
  className?: string;
  mktText?: string;
  mktColor?: string;
  onLinksClick?: () => void;
  withShadow?: boolean;
  rightComponent: React.ReactNode;
};

const DesktopHeader = ({ onLinksClick, className, mktText, mktColor, withShadow, rightComponent }: Props) => {
  const { data: companyData } = useGetCompany();

  return (
    <>
      <StyledStickyHeader
        className={className}
        withShadow={withShadow}
        leftComponent={companyData?.logo && <BrandLogo logoSrc={companyData.logo} alt='logo' onClick={onLinksClick} />}
        middleComponent={<div />}
        rightComponent={rightComponent}
      />
      {mktText && (
        <StyledMktBanner $bgColor={mktColor}>
          <StyledMktText variant='h4' fontWeight={500}>
            {mktText}
          </StyledMktText>
        </StyledMktBanner>
      )}
    </>
  );
};

export default DesktopHeader;
