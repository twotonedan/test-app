import theme from '@/theme';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { transientOptions } from '@/utils/transientOptions';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  padding-right: 16px !important;
  padding-left: 16px !important;
`;

const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  .MuiAccordionSummary-root {
    padding: 0;
    align-items: baseline;
  }
  .MuiAccordionSummary-content {
    display: flex;
    flex-direction: column;
  }
  .MuiAccordionSummary-expandIconWrapper {
    padding-top: 10px;
  }
  .MuiAccordionSummary-content {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .MuiAccordionSummary-content.Mui-expanded {
    margin-top: 16px;
    margin-bottom: 0;
    min-height: initial;
  }
  .Mui-expanded {
    min-height: initial;
  }
  .MuiAccordionDetails-root {
    padding: 0;
  }
`;

const StyledIconWrapper = styled(Box, transientOptions)<{ $rotate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  ${props => props.$rotate && 'transform: rotate(180deg);'}
  transition: transform ease-out 0.1s;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  color: ${theme.palette.customText.secondary};
  text-transform: uppercase;
`;

const StyledRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding-bottom: 12px;
`;

const StyledGroup = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
`;

const StyledLabel = styled(Box, transientOptions)<{ $isOpen: boolean }>`
  margin-right: auto;
  transition: all ease-in-out 0.5ms;
  ${props => props.$isOpen && 'visibility: hidden; height: 0;'}
`;

type Props = {
  title: string;
  label: ReactNode | string;
  children: ReactNode;
  onClear?: () => void;
  defaultOpen?: boolean;
};

const AccordionWrapper = ({ title, label, children, onClear, defaultOpen = false }: Props) => {
  const { t } = useTranslation('common');
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(defaultOpen);

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClear?.();
  };

  return (
    <StyledWrapper>
      <StyledAccordion expanded={isOpenDropdown} onChange={() => setIsOpenDropdown(prevState => !prevState)}>
        <AccordionSummary>
          <StyledRow>
            <StyledTitle variant='subtitle1'>{title}</StyledTitle>
            <StyledGroup>
              {!isOpenDropdown && (
                <StyledButton variant='text' onClick={handleClear}>
                  {t('clear')}
                </StyledButton>
              )}
              <StyledIconWrapper $rotate={isOpenDropdown}>
                <ExpandMoreRounded />
              </StyledIconWrapper>
            </StyledGroup>
          </StyledRow>
          <StyledLabel $isOpen={isOpenDropdown}>{label}</StyledLabel>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </StyledAccordion>
      <Divider />
    </StyledWrapper>
  );
};

export default AccordionWrapper;
