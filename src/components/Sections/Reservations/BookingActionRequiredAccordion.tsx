import { Accordion, AccordionSummary, AccordionDetails, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BookingActionRequiredItem } from '@/types/bookings';
import { useTranslation } from 'next-i18next';
import theme from '@/theme';
import ActionRequiredList from './ActionRequiredList';

const StyledAccordion = styled(Accordion)`
  all: unset;

  .MuiAccordionSummary-content {
    margin: 0;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${theme.palette.customText.secondary};
  padding-left: 0;
  padding-right: 0;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
`;

type Props = {
  actionRequiredItems: BookingActionRequiredItem[];
  className?: string;
};

const BookingActionRequiredAccordion = ({ actionRequiredItems, className }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledAccordion defaultExpanded className={className}>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        {t('actionRequired')} ({actionRequiredItems.length})
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <ActionRequiredList actionRequiredItems={actionRequiredItems} />
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default BookingActionRequiredAccordion;
