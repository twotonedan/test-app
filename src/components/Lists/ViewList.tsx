import theme from '@/theme';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { ICardView } from '@/types/dockQueue';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'next-i18next';
import ViewListItem from './ViewListItem';
import FloatingFixedBottomRightButton, {
  AddButtonConfig,
} from '../Common/FloatingFixedBottomRightButton/FloatingFixedBottomRightButton';

const StyledContainer = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin: 20px auto;
`;
const StyledInnerContainer = styled(Box)`
  display: block;
`;

const StyledRow = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type Props = {
  headerTitle: string;
  addButtonConfig: AddButtonConfig;
  closeButtonHandler: () => void;
  optionsHandler: (id: string) => void;
  data: ICardView[];
  autoCompletePlaceholder: string;
};

const ViewList = ({
  headerTitle,
  addButtonConfig,
  optionsHandler,
  closeButtonHandler,
  data,
  autoCompletePlaceholder,
}: Props) => {
  const { t } = useTranslation('common');
  const [standardViewCards, setStandardViewCards] = useState<ICardView[]>(data.filter(item => !item?.isCustomView));
  const [customViewCards, setCustomViewCards] = useState<ICardView[]>(data.filter(item => item?.isCustomView));

  const ViewAccordion = (viewItems: ICardView[], title: string) => {
    const StyledAccordion = styled(Accordion)`
      margin: 0;
      &.Mui-expanded {
        margin: 0;
      }
      box-shadow: none;
      &:before {
        display: none;
      }
    `;

    const StyledAccordionSummary = styled(AccordionSummary)`
      margin: 0;
      padding: 0;
      .Mui-expanded {
        margin: 0;
      }
    `;

    const StyledAccordionDetails = styled(AccordionDetails)`
      padding: 0;
    `;
    return (
      <StyledAccordion defaultExpanded>
        <StyledAccordionSummary
          data-testid='viewListAccordionHeader'
          aria-controls={`panel${title}`}
          expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{title}</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails data-testid='viewListAccordionBodyWrapper'>
          {viewItems?.map(item => (
            <ViewListItem key={item.name + item.subName} handleOnClick={() => optionsHandler(item.id)} data={item} />
          ))}
        </StyledAccordionDetails>
      </StyledAccordion>
    );
  };

  return (
    <StyledContainer component='div'>
      <StyledRow>
        <StyledColumn>
          <Typography variant='h6'>{headerTitle}</Typography>
        </StyledColumn>
        <StyledColumn>
          <IconButton data-testid='closeViewListButton' onClick={closeButtonHandler}>
            <CloseIcon />
          </IconButton>
        </StyledColumn>
      </StyledRow>
      <StyledInnerContainer>
        <Autocomplete
          id='view-autocomplete'
          freeSolo
          options={data?.map(item => item.name)}
          onChange={(event, value) => {
            if (value) {
              setStandardViewCards(data.filter(item => item.name === value && !item?.isCustomView));
              setCustomViewCards(data.filter(item => item.name === value && item?.isCustomView));
            } else {
              setStandardViewCards(data.filter(item => !item?.isCustomView));
              setCustomViewCards(data.filter(item => item?.isCustomView));
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              z-index={1}
              data-testid='searchTextInput'
              InputProps={{
                ...params.InputProps,
                placeholder: autoCompletePlaceholder,
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </StyledInnerContainer>
      <Box />
      {standardViewCards.length > 0 && ViewAccordion(standardViewCards, t('standardCardView'))}
      {customViewCards.length > 0 && ViewAccordion(customViewCards, t('customCardView'))}
      <FloatingFixedBottomRightButton addButtonConfig={addButtonConfig} />
    </StyledContainer>
  );
};

export default ViewList;
