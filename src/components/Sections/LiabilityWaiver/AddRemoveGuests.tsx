import { Box, Button, FormControl, FormGroup, IconButton, styled, TextField, Typography } from '@mui/material';
import { memo, useState, useEffect } from 'react';
import theme from '@/theme';
import { Guest } from '@/types/guest';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { KeyboardArrowUp } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import Collapse from '@mui/material/Collapse';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import AddRemoveGuestsSchema, {
  AddRemoveGuestsForm,
} from '@/validationSchemas/addRemoveGuestsSchema/addRemoveGuestsSchema';

const StyledWrapper = styled(Box)`
  border: 1px solid ${theme.palette.customColors.gray};
  border-radius: 16px;
`;

const StyledRow = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
};

const AddRemoveGuests = ({ guests, setGuests }: Props) => {
  const [isAdding, setIsAdding] = useState<boolean>(!(guests.length > 0));
  const [isAddGuestsOpen, setIsAddGuestsOpen] = useState<boolean>(false);
  const [isGuestAlreadyPresent, setIsGuestAlreadyPresent] = useState<boolean>(false);
  const [duplicateGuest, setDuplicateGuest] = useState<Guest | null>(null);
  const [resendEmailSent, setResendEmail] = useState<boolean>(false);
  const { t } = useTranslation(['common', 'actions']);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AddRemoveGuestsForm>({
    resolver: yupResolver(AddRemoveGuestsSchema),
  });
  const isSubmitDisabled = !isDirty;

  const submitForm = (guest: Guest) => {
    if (!guests.some(g => guest.emailAddress === g.emailAddress)) {
      setIsAdding(false);
      setGuests([...guests, guest]);
      setIsGuestAlreadyPresent(false);
      setDuplicateGuest(null);
      setResendEmail(false);
      reset();
    } else {
      setIsGuestAlreadyPresent(true);
      setDuplicateGuest(guest);
    }
  };

  // ToDo: Implement resend email
  const resendEmail = () => {
    if (duplicateGuest) {
      setResendEmail(true);
    }
  };

  useEffect(() => {
    if (guests.length === 0) {
      setIsAdding(true);
    }
  }, [guests]);

  return (
    <StyledWrapper component='section'>
      <StyledRow sx={{ padding: `12px ${theme.paddings.xs}` }}>
        <Box display='flex' alignItems='center'>
          <PersonAddAltOutlinedIcon sx={{ marginRight: 1 }} fontSize='small' />
          <Typography data-testid='guestHeader' display='flex' fontWeight={600} alignItems='center' variant='body2'>
            {guests.length > 0 ? `${t('guests', 'Guests')} (${guests.length})` : t('addGuests', 'Add Guests')}
          </Typography>
        </Box>
        <Box>
          <IconButton
            data-testid='collapseController'
            sx={{ color: theme.palette.text.primary }}
            onClick={() => setIsAddGuestsOpen(!isAddGuestsOpen)}>
            {!isAddGuestsOpen && <AddIcon fontSize='small' />}
            {isAddGuestsOpen && <KeyboardArrowUp fontSize='small' />}
          </IconButton>
        </Box>
      </StyledRow>
      <Collapse in={isAddGuestsOpen}>
        {isAdding && (
          <StyledRow
            data-testid='addingGuestsForm'
            sx={{ borderTop: `1px solid ${theme.palette.customColors.gray}`, padding: `12px ${theme.paddings.xs}` }}>
            <Box width='100%'>
              <Typography fontWeight={600} variant='body2'>
                {t('newGuest', 'New Guest')}
              </Typography>
              <FormControl
                onSubmit={handleSubmit(values => {
                  submitForm({ ...values, isUser: false });
                })}
                fullWidth
                component='form'>
                <FormGroup>
                  <TextField
                    id='fullName'
                    label={t('fullName', 'Full Name')}
                    variant='outlined'
                    size='small'
                    margin='normal'
                    {...register('fullName')}
                    error={!!errors?.fullName}
                    required
                    helperText='*Required'
                    inputProps={{ 'data-testid': 'addRemoveGuestFullName' }}
                  />
                  <TextField
                    id='emailAddress'
                    {...register('emailAddress')}
                    label={t('emailAddress', 'Email Address')}
                    variant='outlined'
                    size='small'
                    margin='normal'
                    error={!!errors?.emailAddress}
                    type='email'
                    inputProps={{ 'data-testid': 'addRemoveGuestEmailAddress' }}
                  />
                  <TextField
                    id='phoneNumber'
                    {...register('phoneNumber')}
                    error={!!errors?.phoneNumber}
                    label={t('phone', 'Phone')}
                    size='small'
                    variant='outlined'
                    margin='normal'
                    inputProps={{ 'data-testid': 'addRemoveGuestPhoneNumber' }}
                  />
                </FormGroup>
                <Box>
                  {isGuestAlreadyPresent && (
                    <Box display='grid' gridTemplateColumns='2em auto'>
                      <ErrorOutlineOutlinedIcon sx={{ color: theme.palette.error.main }} />
                      <Typography variant='body2'>
                        {t('duplicateGuest', ' Guest already exists! Please ask them to check their email or')}
                        <Button
                          onClick={resendEmail}
                          sx={[
                            { padding: 0, marginBottom: '1px', marginLeft: 1 },
                            { color: resendEmailSent ? theme.palette.action.disabled : theme.palette.primary.main },
                            { '&:hover': { background: 'none' } },
                          ]}
                          disabled={resendEmailSent}
                          variant='text'>
                          {t('resendEmail', 'Resend Email')}
                          {resendEmailSent && <CheckIcon fontSize='small' />}
                        </Button>
                      </Typography>
                    </Box>
                  )}
                </Box>
                <StyledRow>
                  <Box>
                    {(Object.keys(errors).length || !isDirty) && (
                      <Typography display='grid' gridTemplateColumns='2em auto' variant='body2'>
                        <ErrorOutlineOutlinedIcon sx={{ color: theme.palette.error.main }} />
                        {t('required', 'Email and phone required')}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Button
                      sx={[
                        { color: isSubmitDisabled ? theme.palette.action.disabled : theme.palette.primary.main },
                        { '&:hover': { background: 'none' } },
                      ]}
                      disabled={isSubmitDisabled}
                      data-testid='addNewGuestButton'
                      type='submit'>
                      <AddIcon />
                      <Typography color='inherit' display='grid' gridTemplateColumns='2em auto' variant='body2'>
                        {t('add', 'Add')}
                      </Typography>
                    </Button>
                  </Box>
                </StyledRow>
              </FormControl>
            </Box>
          </StyledRow>
        )}
        {!isAdding && (
          <Box
            data-testid='managingGuestsWrapper'
            sx={{
              padding: `12px ${theme.paddings.xs}`,
              columnGap: '4px',
              rowGap: '6px',
              borderTop: `1px solid ${theme.palette.customColors.gray}`,
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: '4px',
                rowGap: '6px',
              }}>
              {guests.map((guest, i) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '5px',
                    background: theme.palette.customColors.smoothGray,
                    borderRadius: '16px',
                    padding: '6px 8px',
                  }}
                  data-testid={`guestBadge${i}`}
                  key={`${guest.fullName}${guest?.emailAddress}${guest?.phoneNumber}`}>
                  <Typography sx={{ color: theme.palette.text.primary }} fontWeight={500} variant='body2'>
                    {guest.fullName}
                  </Typography>
                  <IconButton
                    data-testid='removeGuestBadge'
                    sx={{ '&:hover': { background: 'none' } }}
                    onClick={() => setGuests(guests.filter(g => g.emailAddress !== guest.emailAddress))}>
                    <CancelIcon fontSize='small' sx={{ color: theme.palette.customColors.lapisLazuli }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box display='flex' justifyContent='end'>
              <Button
                onClick={() => {
                  setIsAdding(!isAdding);
                }}
                data-testid='addAdditionalGuestButton'
                sx={[{ color: theme.palette.primary.main }, { '&:hover': { background: 'none' } }]}
                type='button'>
                <AddIcon />
                <Typography color='inherit' display='grid' gridTemplateColumns='2em auto' variant='body2'>
                  {t('add', 'Add')}
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
      </Collapse>
    </StyledWrapper>
  );
};

export default memo(AddRemoveGuests);
