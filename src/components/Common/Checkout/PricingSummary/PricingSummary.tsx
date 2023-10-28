import { Fragment } from 'react';
import { styled, Box, Typography, Divider, IconButton, SvgIcon } from '@mui/material';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { map } from 'lodash';
import { ShareIcon } from '@/assets';
import copy from 'copy-to-clipboard';

import ItemCartPricingSummary from './ItemCartPricingSummary/ItemCartPricingSummary';
import PromoCodeInput from '../../PromoCodeInput';
import AccordionOrBox from './AccordionOrBox/AccordionOrBox';

const StyledTitle = styled(Typography)`
  font-weight: 600;

  &.pricing-summary-title-total {
    ${theme.breakpoints.up('lg')} {
      display: none;
    }
  }

  &.pricing-summary-title {
    font-size: 14px;
    ${theme.breakpoints.up('lg')} {
      font-size: 20px;
    }
  }

  &.pricing-summary-subtotal {
    font-size: 16px;

    ${theme.breakpoints.up('lg')} {
      font-size: 18px;
    }
  }

  &.pricing-summary-total {
    font-size: 18px;
    ${theme.breakpoints.up('lg')} {
      font-size: 20px;
    }
  }
`;

const StyledTotalPrice = styled(Box)`
  font-weight: 600;
  padding: 16px;
  display: flex;
  justify-content: space-between;

  ${theme.breakpoints.up('lg')} {
    padding: 24px;

    &.subtotal {
      padding-bottom: 0;
    }
  }
`;

const StyledPromoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  padding-top: 0;
  margin-bottom: 16px;

  ${theme.breakpoints.up('lg')} {
    padding: 24px 24px 2px;
    margin-bottom: auto;
    height: 100%;
  }
`;

const StyledPromoRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBottomDivider = styled(Divider)`
  ${theme.breakpoints.up('lg')} {
    width: 100%;
    max-width: 371px;
    margin: 0 auto;
  }
`;

const StyledSubtotalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('lg')} {
    justify-content: flex-start;
    margin-bottom: auto;
    height: 100%;
  }
`;

const StyledIconButton = styled(IconButton)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
    background-color: ${theme.palette.customColors.lightGray};
    width: 48px;
    height: 48px;
  }
`;

const PricingSummary = () => {
  const { t } = useTranslation('common');
  const { prices, creditsData, useCredits } = useCalculatePrice();
  const { currencyFormatter } = useCurrencyFormatter();

  const showCredits = !!creditsData && useCredits;

  return (
    <AccordionOrBox
      header={
        <>
          <StyledTitle className='pricing-summary-title' variant='h4'>
            {t('pricingSummary')}
          </StyledTitle>
          <StyledTitle className='pricing-summary-title-total' variant='h4'>
            {currencyFormatter.format(prices.total)}
          </StyledTitle>
          <StyledIconButton onClick={() => copy(window.location.href)}>
            <SvgIcon component={ShareIcon} inheritViewBox sx={{ fontSize: '18px' }} />
          </StyledIconButton>
        </>
      }>
      {map(prices.items, (item, key: string) => (
        <Fragment key={key}>
          <ItemCartPricingSummary
            {...item.$metadata}
            duration={item.$selectedDuration}
            subTotal={item.subTotal}
            accessories={item.accessories}
          />
        </Fragment>
      ))}
      <StyledBottomDivider />
      <StyledSubtotalWrapper>
        <StyledTotalPrice className='subtotal'>
          <StyledTitle className='pricing-summary-subtotal' variant='h4'>
            {t('subtotal')}
          </StyledTitle>
          <StyledTitle className='pricing-summary-subtotal' variant='h4'>
            {currencyFormatter.format(prices.subTotal)}
          </StyledTitle>
        </StyledTotalPrice>
        <StyledPromoContainer>
          {showCredits && (
            <StyledPromoRow>
              <Typography variant='h4' fontWeight={500}>
                {t('credits')}
              </Typography>
              <Typography variant='h4' fontWeight={500}>
                -{currencyFormatter.format(creditsData)}
              </Typography>
            </StyledPromoRow>
          )}
          <PromoCodeInput disabledCondition={!prices.total} />
        </StyledPromoContainer>
      </StyledSubtotalWrapper>
      <StyledBottomDivider />

      <StyledTotalPrice>
        <StyledTitle className='pricing-summary-total' variant='h3'>
          {t('total')}
        </StyledTitle>
        <StyledTitle className='pricing-summary-total' variant='h3'>
          {currencyFormatter.format(prices.total)}
        </StyledTitle>
      </StyledTotalPrice>
    </AccordionOrBox>
  );
};

export default PricingSummary;
