import { Box, Button, Chip, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import theme from '@/theme/theme';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  width: 100%;
`;

const StyledChipsWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 8px;
  margin-top: 8px;
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const ChipContainer = () => {
  const { t } = useTranslation('actions');
  const { handleDeleteAllFilters, flattedFilters } = useFeedFilterHandlers();

  return (
    <StyledWrapper>
      <StyledChipsWrapper>
        {flattedFilters?.map(filter => {
          return <Chip label={filter.label} key={filter.id} onDelete={() => filter.remove()} />;
        })}
      </StyledChipsWrapper>
      <StyledButton variant='text' onClick={handleDeleteAllFilters}>
        {t('clearAll')}
      </StyledButton>
    </StyledWrapper>
  );
};

export default ChipContainer;
