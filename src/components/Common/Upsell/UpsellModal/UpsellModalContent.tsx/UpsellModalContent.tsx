import { Box, Typography, styled } from '@mui/material';
import theme from '@/theme';
import useIsMobile from '@/hooks/useIsMobile';
import { useMemo, useState } from 'react';
import useGetAccessories from '@/hooks/api/useGetAccessories';
import { useTranslation } from 'next-i18next';
import AccessoryList from '../AccessoryList/AccessoryList';
import AcessoryViewButton from '../AccessoryViewButton';

const StyledSubtitleWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledSubtitle = styled(Typography)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: block;
  }
`;

const StyledAcessoryViewButton = styled(AcessoryViewButton)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: block;
  }
`;

type Props = {
  hidePricing?: boolean;
};

const UpsellModalContent = ({ hidePricing }: Props) => {
  const { t } = useTranslation('common');
  const isMobile = useIsMobile();
  const { data: accessories = [], isLoading } = useGetAccessories();
  const shouldShowMobileViewBasedOnAccesories = useMemo(
    () => isMobile || isLoading || accessories.length >= 8,
    [accessories.length, isLoading, isMobile]
  );
  const [customMobileView, setCustomMobileView] = useState<boolean | undefined>(undefined);

  const shouldShowMobileView = useMemo(
    () => customMobileView ?? shouldShowMobileViewBasedOnAccesories,
    [customMobileView, shouldShowMobileViewBasedOnAccesories]
  );

  return (
    <>
      <StyledSubtitleWrapper>
        <StyledSubtitle variant='h1'>{t('accessories')}</StyledSubtitle>
        <StyledAcessoryViewButton
          onClick={() => setCustomMobileView(!shouldShowMobileView)}
          accessoryMobileView={shouldShowMobileView}
        />
      </StyledSubtitleWrapper>
      <AccessoryList
        isLoading={isLoading}
        accessories={accessories}
        hidePricing={hidePricing}
        mobileView={shouldShowMobileView}
      />
    </>
  );
};

export default UpsellModalContent;
