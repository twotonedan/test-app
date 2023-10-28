import { SupportedIcons } from '@/constants/icons/supportedIcons';
import { transientOptions } from '@/utils/transientOptions';
import { Box, IconButton, SvgIcon, styled } from '@mui/material';
import theme from '@/theme/theme';
import useGetCompany from '@/hooks/api/useGetCompany';
import { ISocialLink } from '@/types/company';
import { useRouter } from 'next/router';

const StyledWrapper = styled(Box, transientOptions)<{ $showShadow?: boolean }>`
  display: flex;
  gap: 24px;
  ${theme.breakpoints.up('md')} {
    justify-content: flex-end;
  }
`;

const SocialIcons = () => {
  const { data: companyData } = useGetCompany();
  const router = useRouter();
  return (
    <StyledWrapper>
      {companyData?.footer?.socialLinks?.map((socialLink: ISocialLink) => {
        return (
          <IconButton key={socialLink.id} onClick={() => router.push(socialLink.link)}>
            <SvgIcon component={SupportedIcons[socialLink.name]} viewBox='0 0 24 24' width='24' height='24' />
          </IconButton>
        );
      })}
    </StyledWrapper>
  );
};

export default SocialIcons;
