import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, styled } from '@mui/material';
import useGetCompany from '@/hooks/api/useGetCompany';
import Typography from '@mui/material/Typography';
import AccordionLinksMobile from './AccordionLinksMobile';
import SocialIcons from './SocialIcons';
import SubscribeForm from './SubscribeForm';
import ListLinksDesktop from './ListLinksDesktop';
import BrandLogo from '../Header/BrandLogo';

const StyledWrapper = styled(Box, transientOptions)<{ $showShadow?: boolean }>`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 24px;
  position: relative;
  background: ${theme.palette.customColors.lightGray};
  margin-bottom: 1px;
  ${theme.breakpoints.up('md')} {
    padding-top: 40px;
    padding-bottom: 48px;
  }
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout};
  width: 100%;
  display: grid;
  ${theme.breakpoints.up('md')} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 80px auto 24px;
  }
`;

const StyledItemWrapper = styled(Box)`
  &:first-of-type {
    margin-bottom: 18px;
    ${theme.breakpoints.up('md')} {
      grid-area: 1 / 1 / 2 / 3;
    }
  }

  &:nth-of-type(2) {
    margin-bottom: 10px;
    ${theme.breakpoints.up('md')} {
      grid-area: 2 / 1 / 3 / 5;
    }
  }
  &:nth-of-type(3) {
    margin-bottom: 10px;
    ${theme.breakpoints.up('md')} {
      grid-area: 2 / 1 / 3 / 5;
    }
  }
  &:nth-of-type(4) {
    ${theme.breakpoints.up('md')} {
      grid-area: 1 / 3 / 2 / 5;
      margin-left: auto;
    }
  }
  &:nth-of-type(5) {
    margin-bottom: 24px;
    ${theme.breakpoints.up('md')} {
      grid-area: 3 / 1 / 4 / 3;
      height: fit-content;
      display: flex;
    }
  }
  &:nth-of-type(6) {
    ${theme.breakpoints.up('md')} {
      grid-area: 3 / 3 / 4 / 5;
      height: fit-content;
    }
  }
`;

const Footer = () => {
  const { data: companyData } = useGetCompany();

  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        <StyledItemWrapper>
          {companyData?.logo && <BrandLogo logoSrc={companyData.logo} alt='logo' />}
        </StyledItemWrapper>
        <StyledItemWrapper>
          <AccordionLinksMobile />
        </StyledItemWrapper>
        <StyledItemWrapper>
          <ListLinksDesktop />
        </StyledItemWrapper>
        <StyledItemWrapper>
          <SubscribeForm />
        </StyledItemWrapper>
        <StyledItemWrapper>
          <Typography variant='label'>© Copyright 1997-{new Date().getFullYear()} Stellar S.R.L</Typography>
        </StyledItemWrapper>
        <StyledItemWrapper>
          <SocialIcons />
        </StyledItemWrapper>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default Footer;
