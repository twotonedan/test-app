import theme from '@/theme';
import { BookingActionRequiredItem } from '@/types/bookings';
import { Box, Button, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PageType } from '@/types/enums';
import ToPathWrapper from '@/components/Common/ToPathWrapper';

type Props = {
  actionRequiredItem: BookingActionRequiredItem;
};

const StyledActionRequiredButton = styled(Button)`
  display: flex;
  gap: 2px;
  width: 100%;
  min-width: fit-content;
`;

const StyledRedDot = styled(Box)`
  width: 6px;
  height: 6px;
  border-radius: 200px;
  background: ${theme.palette.error.main};
`;

const ActionRequiredItem = ({ actionRequiredItem }: Props) => {
  const { t } = useTranslation();
  const { name, completed, link: url } = actionRequiredItem;

  return !url ? (
    <StyledActionRequiredButton variant='outlined' disabled={completed}>
      {t(name)} {!completed && <StyledRedDot />}
    </StyledActionRequiredButton>
  ) : (
    <ToPathWrapper pageType={url as PageType}>
      {({ link }) => (
        <StyledActionRequiredButton href={link} key={name} variant='outlined' disabled={completed}>
          {t(name)} {!completed && <StyledRedDot />}
        </StyledActionRequiredButton>
      )}
    </ToPathWrapper>
  );
};

export default ActionRequiredItem;
