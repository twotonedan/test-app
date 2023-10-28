import { useTranslation } from 'next-i18next';
import { Box, Divider, Typography, css, styled } from '@mui/material';
import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { IBookingUnitAccessory } from '@/types/bookings';
import { TagColor } from '@/types/enums';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import BookingLocation from '../BookingLocation/BookingLocation';

const StyledWrapper = styled(Box, transientOptions)<{ $color: string; $firstRounded: boolean; $lastRounded: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${props => props.$color};

  ${({ $firstRounded }) =>
    $firstRounded
      ? css`
          border-radius: 16px 16px 0px 0px;
        `
      : ''}

  ${({ $lastRounded }) =>
    $lastRounded
      ? css`
          border-radius: 0px 0px 16px 16px;
        `
      : ''}

  background-color: ${props => props.$color};
  padding: 12px;
  ${theme.breakpoints.up('md')} {
    padding: 12px 20px;
  }
  ${theme.breakpoints.up('lg')} {
    padding: 16px 24px;
  }
`;

const StyledRow = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledGroup = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledDivider = styled(Divider)`
  color: ${theme.palette.customColors.gray};
`;

const StyledVerticalDivider = styled(Divider)`
  border-color: ${theme.palette.customText.primary};
  height: 8px;
`;

const StyledTag = styled(Box, transientOptions)<{ $backgroundColor?: TagColor }>`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  background: ${props => props.$backgroundColor};
  opacity: 1;
  border-radius: 999px;
  max-height: 24px;
  z-index: 2;
`;

const StyledLabel = styled(Typography)`
  font-weight: 600;
  font-size: 10px;
  color: ${theme.palette.common.white};
  margin-bottom: 2px;
`;

const StyledAccessoryDataMobile = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledAccessoryDataDesktop = styled(Box)`
  display: none;
  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

type Props = {
  accessory: IBookingUnitAccessory;
  color: string;
  firstRounded: boolean;
  lastRounded: boolean;
};

const BookingUnitAccessory = ({ accessory, color, firstRounded, lastRounded }: Props) => {
  const { t } = useTranslation('common');
  const { currencyFormatter } = useCurrencyFormatter();

  const { title, location, price, quantity, tag } = accessory;

  return (
    <StyledWrapper $color={color} $firstRounded={firstRounded} $lastRounded={lastRounded}>
      <StyledRow>
        <Typography fontWeight={600} color={theme.palette.customText.primary} fontSize={16}>
          {title}
        </Typography>
        {!!tag && (
          <StyledTag $backgroundColor={tag.color}>
            <StyledLabel>{tag.label}</StyledLabel>
          </StyledTag>
        )}
      </StyledRow>
      <StyledAccessoryDataMobile>
        <BookingLocation locationName={location} />
        <StyledGroup>
          <Typography variant='h4' fontWeight={500} color={theme.palette.customText.primary}>
            {t('quantityAbbreviation')}
          </Typography>
          <Typography variant='subtitle1'>{quantity}</Typography>
        </StyledGroup>
      </StyledAccessoryDataMobile>
      <StyledAccessoryDataDesktop>
        <StyledGroup>
          <BookingLocation locationName={location} />
          <StyledVerticalDivider orientation='vertical' />
          <StyledGroup>
            <Typography variant='h4' fontWeight={500} color={theme.palette.customText.primary}>
              {t('quantityAbbreviation')}
            </Typography>
            <Typography variant='subtitle1'>{quantity}</Typography>
          </StyledGroup>
        </StyledGroup>
      </StyledAccessoryDataDesktop>

      <StyledDivider />

      <StyledRow>
        <Typography variant='h4' fontWeight={600} color={theme.palette.customText.primary}>
          {t('price.title')}
        </Typography>
        <Typography variant='h4' fontWeight={600} color={theme.palette.customText.primary}>
          {currencyFormatter.format(price)}
        </Typography>
      </StyledRow>
    </StyledWrapper>
  );
};

export default BookingUnitAccessory;
