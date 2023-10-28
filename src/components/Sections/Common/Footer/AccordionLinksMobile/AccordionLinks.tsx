import { Box, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '@/theme/theme';
import { LinkType } from '@/types/footer';
import { PageType } from '@/types/enums';
import useGetCompany from '@/hooks/api/useGetCompany';
import ItemLink from '../ItemLink/ItemLink';
import ToPathWrapper from '../../../../Common/ToPathWrapper/ToPathWrapper';

const StyledAccordion = styled(Accordion)`
  background: ${theme.palette.customColors.lightGray};
  &.MuiPaper-root {
    box-shadow: none;
  }
  &.MuiPaper-root::before {
    display: none;
  }
  &.Mui-expanded {
    margin: 0;
  }
  & .MuiAccordionSummary-root {
    padding: 0;
  }
  & .MuiAccordionSummary-content {
    margin: 14px 0;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0 16px;
`;

const SytledContainer = styled(Box)`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const AccordionLinks = () => {
  const { data: companyData } = useGetCompany();
  const footer = companyData?.footer || { items: [] };
  return (
    <SytledContainer>
      {footer.items.map((list, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledAccordion key={`footerAccordionItem-${list.title}-${JSON.stringify(list)}-${i}`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h4' fontWeight={600}>
              {list.title}
            </Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            {list.list?.map(item => {
              if (item.type !== LinkType.INTERNAL)
                return <ItemLink key={`${item.title}-${item.link}`} link={item.link} title={item.title} />;
              return (
                <ToPathWrapper pageType={item.link as PageType} key={`${item.title}-${item.link}`}>
                  {({ link }) => <ItemLink key={link} link={link} title={item.title} />}
                </ToPathWrapper>
              );
            })}
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </SytledContainer>
  );
};

export default AccordionLinks;
