import theme from '@/theme';
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { IBookingAccessory } from '@/types/dockQueue';
import { useTranslation } from 'next-i18next';
import NiceModal from '@ebay/nice-modal-react';
import AccessoryItem from './AccessoryItem';
import ConfirmModal from './AccessoryConfirmModal';

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

type AccessoriesListProps = {
  closeButtonHandler: () => void;
  saveAccessories: (accessories: IBookingAccessory[]) => void;
  accessories: IBookingAccessory[];
};

const AccessoriesList = ({ accessories, closeButtonHandler, saveAccessories }: AccessoriesListProps) => {
  const [formAccessories, setFormAccessories] = useState<IBookingAccessory[]>(accessories);
  const [filteredAccessories, setFilteredAccessories] = useState(formAccessories);
  const { t } = useTranslation('actions');
  useEffect(() => {
    setFilteredAccessories(formAccessories);
  }, [formAccessories]);

  const addAccessory = (id: string) => {
    setFormAccessories(
      formAccessories.map(acc => {
        if (acc.id === id) {
          return {
            ...acc,
            isSelected: !acc.isSelected,
          };
        }
        return acc;
      })
    );
  };
  const submitAccessories = () => {
    NiceModal.show('confirm-modal');
  };
  const onConfirm = () => {
    saveAccessories(accessories);
    closeButtonHandler();
  };
  return (
    <StyledContainer component='div'>
      <StyledRow>
        <StyledColumn>
          <Typography variant='h6'>{t('accessories')}</Typography>
        </StyledColumn>
        <StyledColumn>
          <IconButton onClick={closeButtonHandler}>
            <CloseIcon />
          </IconButton>
        </StyledColumn>
      </StyledRow>
      <StyledInnerContainer>
        <Autocomplete
          id='view-autocomplete'
          freeSolo
          options={accessories?.map(acc => acc.title)}
          onChange={(event, value) => {
            if (value) {
              setFilteredAccessories(accessories.filter(acc => acc.title === value));
            } else {
              setFilteredAccessories(accessories);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              z-index={1}
              data-testid='searchTextInput'
              InputProps={{
                ...params.InputProps,
                placeholder: 'Search Accessories',
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
      {filteredAccessories?.map(accessory => (
        <AccessoryItem key={accessory.id} onClick={addAccessory} accessory={accessory} />
      ))}
      <Grid container justifyContent='center'>
        <Button fullWidth onClick={submitAccessories} variant='contained' color='primary'>
          {t('done')}
        </Button>
      </Grid>
      <ConfirmModal id='confirm-modal' accessories={accessories} onConfirm={onConfirm} />
    </StyledContainer>
  );
};

export default AccessoriesList;
