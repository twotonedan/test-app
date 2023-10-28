import {
  Box,
  styled,
  Autocomplete,
  TextField,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
  Typography,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { memo, useState, useEffect, ReactNode } from 'react';
import theme from '@/theme';
import { Guest } from '@/types/guest';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userSelectorSchema, { UserSelectorForm } from '@/validationSchemas/userSelectorSchema/userSelectorSchema';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
`;

const StyledTextButton = styled(Button)`
  display: inline-block;
  padding: 0;
  text-decoration: underline;
  &:hover {
    background: none;
    text-decoration: underline;
  }
`;

const StyledContainer = styled(Box)`
  display: block;
  margin-top: 1em;
  padding: 8px 8px 16px 8px;
  border-radius: 8px;
`;

const StyledRow = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledInputTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${theme.palette.customColors.white};
  }
`;

type Props = {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  bookingSwitch: boolean;
  setBookingSwitch: (bookingSwitch: boolean) => void;
};

const UserSelector = ({ guests, setGuests, bookingSwitch, setBookingSwitch }: Props) => {
  const { t } = useTranslation(['actions', 'common']);
  const [selectedGuest, setSelectedGuest] = useState<Guest | undefined | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isGuestAlreadyInList, setIsGuestAlreadyInList] = useState(false);
  const [searchTextFieldVal, setSearchTextFieldVal] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm<UserSelectorForm>({
    resolver: yupResolver(userSelectorSchema),
  });
  const addingButtonHandler = () => {
    setIsAdding(!isAdding);
  };
  const isSubmitButtonDisabled = !isDirty;

  const doneButtonHandler = () => {
    const isGuestInList = guests.find(guest => guest.fullName === getValues('fullName'));
    if (isGuestInList) {
      setIsGuestAlreadyInList(true);
    } else {
      const newGuest: Guest = {
        fullName: getValues('fullName'),
        emailAddress: getValues('emailAddress'),
        phoneNumber: getValues('phoneNumber'),
        isUser: true,
      };
      setGuests([...guests, newGuest]);
      setSelectedGuest(newGuest);
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (
      selectedGuest &&
      !guests.find(findGuest => findGuest.isUser === true && findGuest.fullName === selectedGuest.fullName)
    ) {
      const updatedGuests = guests.map(guest => {
        if (guest.fullName === selectedGuest.fullName) {
          return {
            ...guest,
            isUser: true,
          };
        }
        return {
          ...guest,
          isUser: false,
        };
      });
      setGuests(updatedGuests);
    } else if (!!selectedGuest === false && guests.find(findGuest => findGuest.isUser === true)) {
      const updatedGuests = guests.map(guest => {
        return {
          ...guest,
          isUser: false,
        };
      });
      setGuests(updatedGuests);
    }
  }, [guests, selectedGuest, setGuests]);

  return (
    <StyledWrapper component='div'>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={bookingSwitch}
              onChange={() => setBookingSwitch(!bookingSwitch)}
              id='booking-for-someone-else'
              name='booking-for-someone-else'
              data-testid='bookingSwitch'
            />
          }
          label='The booking is for someone else'
        />
      </FormGroup>
      {!bookingSwitch && (
        <Box data-testid='switchControlledDiv' component='div'>
          <Typography variant='h6'>{t('personalData', 'Personal Data')}</Typography>
          <Typography marginBottom={2} variant='body2'>
            {t('pickYourSelfGuestsList', 'Pick yourself from the guests list:')}
          </Typography>

          <Autocomplete
            freeSolo
            id='guest-autocomplete-search'
            disableClearable
            options={guests.map(option => option.fullName)}
            onChange={(event, value) => {
              setSelectedGuest(guests.find(guest => guest.fullName === value));
            }}
            value={selectedGuest?.fullName || ''}
            renderInput={params => (
              <TextField
                {...params}
                label={searchTextFieldVal ? t('guestsList', 'Guests List') : undefined}
                InputLabelProps={{ shrink: searchTextFieldVal.length > 0 }}
                placeholder={t('searchGuests', 'Search Guests')}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  inputProps: {
                    ...params.inputProps,
                    'data-testid': 'guestTextField',
                  },
                  onChange: event => {
                    if (!guests.find(guest => guest.fullName === event.target.value)) {
                      setSelectedGuest(null);
                    }
                    setSearchTextFieldVal(event.target.value);
                  },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <StyledContainer
            sx={{ background: isAdding ? theme.palette.customColors.lightGray : 'none' }}
            component='div'>
            <StyledRow>
              <StyledColumn>
                <StyledTextButton
                  data-testid='notOnListTextButton'
                  sx={{ mb: 1 }}
                  variant='text'
                  onClick={addingButtonHandler}>
                  <Typography variant='body2'>{t('guestNotOnList', "I'm not on the list")}</Typography>
                </StyledTextButton>
              </StyledColumn>
              {isAdding && (
                <StyledColumn>
                  <IconButton
                    data-testid='closeAddUserButton'
                    sx={{ color: theme.palette.customText.primary }}
                    onClick={addingButtonHandler}>
                    <CloseIcon />
                  </IconButton>
                </StyledColumn>
              )}
            </StyledRow>

            {isAdding && (
              <FormControl
                data-testid='addUserForm'
                fullWidth
                component='form'
                onSubmit={handleSubmit(doneButtonHandler)}>
                <FormGroup>
                  <FormLabel component='legend'>
                    <Typography variant='body2'>
                      {t('enterYourPersonalInformation', 'Enter your personal information.')}
                    </Typography>
                  </FormLabel>
                  <StyledInputTextField
                    id='fullName'
                    label={t('fullName', 'Full Name')}
                    variant='outlined'
                    size='small'
                    margin='normal'
                    {...register('fullName')}
                    error={!!errors?.fullName}
                    helperText={errors?.fullName ? (errors.fullName.message as ReactNode) : null}
                    required
                    inputProps={{ 'data-testid': 'fullName' }}
                  />
                  <StyledInputTextField
                    id='emailAddress'
                    {...register('emailAddress')}
                    label={t('emailAddress', 'Email Address')}
                    variant='outlined'
                    required
                    size='small'
                    margin='normal'
                    error={!!errors?.emailAddress}
                    helperText={errors?.emailAddress ? (errors.emailAddress.message as ReactNode) : null}
                    type='email'
                    inputProps={{ 'data-testid': 'emailAddress' }}
                  />
                  <StyledInputTextField
                    id='phoneNumber'
                    {...register('phoneNumber')}
                    error={!!errors?.phoneNumber}
                    helperText={errors?.phoneNumber ? (errors.phoneNumber.message as ReactNode) : null}
                    label={t('phone', 'Phone')}
                    size='small'
                    variant='outlined'
                    margin='normal'
                    required
                    inputProps={{ 'data-testid': 'phoneNumber' }}
                  />
                  {isGuestAlreadyInList && (
                    <Typography sx={{ mt: 2 }} display='grid' gridTemplateColumns='2em auto' variant='body2'>
                      <ErrorOutlineOutlinedIcon sx={{ color: theme.palette.error.main }} />{' '}
                      {t(
                        'guestAlreadyExists',
                        'Guest Already exists, either select from the list or enter new information.'
                      )}
                    </Typography>
                  )}
                  <StyledTextButton
                    sx={[
                      {
                        ml: 'auto',
                        color: isSubmitButtonDisabled ? theme.palette.customText.secondary : theme.palette.primary.main,
                        textDecoration: 'none',
                      },
                      {
                        '&:hover': {
                          textDecoration: 'none',
                        },
                      },
                    ]}
                    variant='text'
                    type='submit'
                    data-testid='doneButton'
                    disabled={isSubmitButtonDisabled}>
                    {t('done', 'Done')}
                  </StyledTextButton>
                </FormGroup>
              </FormControl>
            )}
          </StyledContainer>
        </Box>
      )}
    </StyledWrapper>
  );
};

export default memo(UserSelector);
