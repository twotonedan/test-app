import useGetFeedItems from '@/hooks/api/useGetFeedItems';
import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Button, Paper, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

const StyledWrapper = styled(Paper, transientOptions)<{ $showResults: boolean }>`
  ${theme.mixins.layout}
  display: flex;
  ${props => props.$showResults && 'flex-direction: column;'}
  gap: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  padding-top: 16px;
  padding-bottom: 16px;
  backdrop-filter: blur(2px);
  border-radius: 0;
  margin-top: auto;
  padding-right: 16px !important;
  padding-left: 16px !important;
`;

const StyledRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  onClearAll: () => void;
  onClose: () => void;
  name: string;
  showResults?: boolean;
};

const Footer = ({ onClearAll, onClose, name, showResults = false }: Props) => {
  const { t } = useTranslation('actions');
  const isMultiDay = useWatch({ name: `${name}.isMultiDay` });
  const { data: feedCardsData = [] } = useGetFeedItems({ isMultiDay });

  return (
    <StyledWrapper $showResults={showResults}>
      {showResults ? (
        <StyledRow>
          <Typography variant='subtitle1' fontWeight={500} color={theme.palette.customText.secondary}>
            {`${feedCardsData.length} ${t('common:results')}`}
          </Typography>

          <Button onClick={onClearAll}>{t('clearAll')}</Button>
        </StyledRow>
      ) : (
        <Button onClick={onClearAll} fullWidth>
          {t('clearAll')}
        </Button>
      )}
      <Button onClick={onClose} fullWidth variant='contained'>
        {t('applyFilters')}
      </Button>
    </StyledWrapper>
  );
};

export default Footer;
