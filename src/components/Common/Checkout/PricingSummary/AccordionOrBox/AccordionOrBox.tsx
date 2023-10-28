import theme from '@/theme/theme';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, styled } from '@mui/material';
import { ReactNode } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

const StyledAccordionWrapper = styled(Box)`
  ${theme.mixins.layout}

  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledAccordion = styled(Accordion)`
  width: 100%;
  box-shadow: none;
  border: 1px solid ${theme.palette.customText.primary};
  box-shadow: 0px 1px 4px rgba(42, 51, 60, 0.16);
  border-radius: 16px !important;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  margin-right: 4px;
  min-height: 48px !important;
  max-height: 48px;

  & > .MuiAccordionSummary-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledTopDivider = styled(Divider)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const StyledBoxWrapper = styled(Box)`
  ${theme.mixins.layout}

  ${theme.breakpoints.up('lg')} {
    padding-left: 0;
    justify-self: flex-end;
    width: 100%;
    max-width: 421px;
    box-sizing: content-box;
    margin-top: 34px;
    margin-bottom: 24px;
  }
`;

const StyledBox = styled(Box)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    border-radius: 16px;
    border: 1px solid #e7e7e7;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledHeaderBox = styled(Box)`
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionOrBox = ({ children, header }: Props) => (
  <>
    <StyledBoxWrapper>
      <StyledBox>
        <StyledHeaderBox>{header}</StyledHeaderBox>
        {children}
      </StyledBox>
    </StyledBoxWrapper>

    <StyledAccordionWrapper>
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>{header}</StyledAccordionSummary>

        <StyledTopDivider />
        <StyledAccordionDetails>{children}</StyledAccordionDetails>
      </StyledAccordion>
    </StyledAccordionWrapper>
  </>
);

export default AccordionOrBox;
