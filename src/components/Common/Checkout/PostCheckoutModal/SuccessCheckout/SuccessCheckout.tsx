import { memo, useMemo } from 'react';
import { styled, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import RecommendedItems from '@/components/Sections/Common/RecommendedItems/RecommendedItems';
import useIsDesktop from '@/hooks/useIsDesktop';
import useGetRelatedItems from '@/hooks/api/useGetRelatedItems';
import CreateAccountForm from './CreateAccountForm/CreateAccountForm';
import ReservationsLink from './ReservationsLink/ReservationsLink';

const StyledContainer = styled(Box)`
  ${theme.breakpoints.up('lg')} {
    padding-bottom: 48px;
  }
`;

const StyledOrder = styled(Box)`
  border: 1px solid ${theme.palette.customInput.borderFilled};
  border-radius: 8px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
  width: 100%;
  ${theme.breakpoints.up('lg')} {
    margin-bottom: 24px;
  }
`;

const StyledOrderContainer = styled(Box)`
  display: flex;
  gap: 24px;
  width: 100%;
`;

const StyledCheckIcon = styled(CheckCircleOutlineIcon)`
  color: ${theme.palette.customColors.lightGreen};
  & .MuiSvgIcon-root {
    font-size: 30px;
  }
`;

const StyledMessageRow = styled(Box)`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const StyledSubTitle = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  word-break: break-word;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
`;

const StyledNextSteps = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 12px;
  ${theme.breakpoints.up('lg')} {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    grid-column-gap: 19px;
    margin-top: 24px;
  }
`;

const StyledColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  gap: 12px;
`;

const StyledButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${theme.breakpoints.up('lg')} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledTestsLabel = styled('span')`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`;

const StyledAccessTimeIcon = styled(AccessTimeIcon)`
  color: ${theme.palette.customColors.lightGreen};
`;

const StyledRecommendedItemsWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
`;

type CreateAccountProps = {
  password: string;
};

type Props = {
  orderId: string | null;
  isLoggedIn: boolean;
  onCreateAccount?: (data: CreateAccountProps) => void;
  accountCreated: boolean;
};

const SuccessCheckout = ({ orderId, isLoggedIn, onCreateAccount, accountCreated }: Props) => {
  const { t } = useTranslation('common');
  const isDesktop = useIsDesktop();
  const { data: relatedItems = [] } = useGetRelatedItems();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wasInitiallyLoggedIn = useMemo(() => isLoggedIn, []);

  const showReservationLink = isLoggedIn && !accountCreated;

  return (
    <>
      <StyledContainer>
        <StyledOrderContainer>
          <StyledOrder>
            <StyledMessageRow>
              <StyledCheckIcon fontSize='large' />
              <div>
                <StyledSubTitle>
                  {t('postCheckout.order')} #{orderId}
                </StyledSubTitle>
                <Typography variant='h4'>{t('postCheckout.generatedSuccessfully')}</Typography>
              </div>
            </StyledMessageRow>
            <IconButton>
              <ShareOutlinedIcon />
            </IconButton>
          </StyledOrder>
          {isDesktop && showReservationLink && <ReservationsLink />}
        </StyledOrderContainer>
        {!isDesktop && showReservationLink && <ReservationsLink />}
        <StyledNextSteps>
          <StyledColumn>
            <StyledTitle>{t('postCheckout.nextSteps')}</StyledTitle>
            <Typography variant='h4'>
              {isLoggedIn ? t('postCheckout.loggedNextSteps') : t('postCheckout.notLoggedNextSteps')}
            </Typography>
          </StyledColumn>
          {isDesktop && <Divider orientation='vertical' flexItem />}
          <StyledColumn>
            {!wasInitiallyLoggedIn && (
              <CreateAccountForm accountCreated={accountCreated} onCreateAccount={onCreateAccount} />
            )}
            {isLoggedIn && (
              <StyledTestsLabel>
                <StyledAccessTimeIcon />
                <Typography variant='h4'>{t('postCheckout.saveTimeText')}</Typography>
              </StyledTestsLabel>
            )}
            <StyledButtonsContainer>
              <Button variant='outlined' disabled={!isLoggedIn}>
                {t('postCheckout.takeTest')}
              </Button>
              <Button variant='outlined' disabled={!isLoggedIn}>
                {t('postCheckout.completeLiability')}
              </Button>
            </StyledButtonsContainer>
          </StyledColumn>
        </StyledNextSteps>
      </StyledContainer>
      {isDesktop && <Divider flexItem />}
      <StyledRecommendedItemsWrapper>
        <RecommendedItems title={t('interestedOn')} items={relatedItems} />
      </StyledRecommendedItemsWrapper>
    </>
  );
};

export default memo(SuccessCheckout);
