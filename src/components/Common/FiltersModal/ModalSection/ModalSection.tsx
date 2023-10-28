import AccordionWrapper from '@/components/Sections/Home/FilterDisplay/FilterHandler/AddFilterDrawer/AccordionWrapper/AccordionWrapper';
import theme from '@/theme';
import { Box, Divider, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  color: ${theme.palette.customText.secondary};
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const StyledContent = styled(Box)`
  padding-top: 8px;
  padding-bottom: 16px;
`;

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  isAccordion?: boolean;
  label?: string | ReactNode;
  onClear?: () => void;
  defaultOpen?: boolean;
};

const ModalSection = ({
  title,
  children,
  className,
  label,
  isAccordion = false,
  onClear,
  defaultOpen = false,
}: Props) => {
  return (
    <>
      {isAccordion ? (
        <AccordionWrapper title={title} label={label} onClear={onClear} defaultOpen={defaultOpen}>
          <StyledContent>{children}</StyledContent>
        </AccordionWrapper>
      ) : (
        <StyledWrapper className={className}>
          <StyledTitle variant='label'>{title}</StyledTitle>
          {children}
        </StyledWrapper>
      )}

      {!isAccordion && <Divider />}
    </>
  );
};

export default ModalSection;
