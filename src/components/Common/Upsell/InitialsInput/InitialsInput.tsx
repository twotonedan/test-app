import { styled, Box, Typography, Divider, FormControl, InputAdornment } from '@mui/material';
import { useTranslation } from 'next-i18next';
import NiceModal from '@ebay/nice-modal-react';
import theme from '@/theme';
import { useEffect, useId, useState } from 'react';
import Image from 'next/image';
import { useWatch, useFormContext } from 'react-hook-form';
import Input from '../../Input/Input';
import SignModal from '../SignModal/SignModal';

interface SignProps {
  isinitials: string;
}

const StyledRequiredIcon = styled(Typography)`
  color: ${theme.palette.error.main};
`;

const StyledImageContainer = styled(Box)`
  width: ${({ isinitials }: SignProps) => (isinitials === 'true' ? '55' : '119')}px;
  height: 20px;
  position: relative;
`;

const StyledSignContent = styled(Box)`
  width: ${({ isinitials }: SignProps) => (isinitials === 'true' ? '55' : '119')}px;
  height: 32px;
  display: inline-grid;
  & .MuiDivider-root {
    border-bottom: 1px dashed ${theme.palette.customInput.borderFilled};
    height: 1px;
    padding-top: 2px;
  }
  & .MuiTypography-root {
    font-weight: 400;
    color: ${theme.palette.customInput.borderFilled};
    line-height: initial;
  }
`;

const StyledSignForm = styled(FormControl)`
  width: 119px;
  height: 20px;
  margin-right: 4px;

  & .MuiInputBase-root {
    input {
      font-size: 14px;
    }
  }
`;

const StyledInput = styled(Input)`
  height: inherit;

  .MuiInputBase-root {
    height: inherit;

    &:hover::before {
      border-bottom: 1px dashed ${theme.palette.error.main} !important;
    }

    &::after,
    &::before {
      border-bottom: 1px dashed ${theme.palette.error.main};
      transition: unset;

      .MuiInputBase-input {
        font-size: 14px;
      }
    }
  }
`;

interface Props {
  word: string;
  index: number;
}

const InitialsInput = ({ word, index }: Props) => {
  const id = useId();
  const policiesSignModalId = `policies-sign-${id}`;
  const { t } = useTranslation('common');
  const signatureName = `${word}-${index}`;
  const [signatureDate, setSignatureDate] = useState<string | null>();
  const signature = useWatch({ name: `${word}-${index}` });
  const [signaturePoints, setSignaturePoints] = useState<[][] | null>(null);
  const { setValue } = useFormContext();

  const onSaveSignature = () => {
    const today = new Date();
    setSignatureDate(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`);
  };

  const onClearSignature = () => {
    setSignatureDate(null);
  };

  const onSaveSignaturePoints = (points: [][]) => {
    setSignaturePoints(points);
  };

  const handleOpenSignModal = () => NiceModal.show(policiesSignModalId);
  const isInitials = word === '%your_initials_input%' ? 'true' : 'false';
  useEffect(() => {
    setValue(signatureName, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!signature ? (
        <StyledSignForm>
          <StyledInput
            name='sign'
            variant='standard'
            error
            placeholder={t('policies.initialsHere')}
            onClick={handleOpenSignModal}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <StyledRequiredIcon variant='h4'>*</StyledRequiredIcon>
                </InputAdornment>
              ),
            }}
          />
        </StyledSignForm>
      ) : (
        <StyledSignContent isinitials={isInitials} onClick={handleOpenSignModal}>
          {signature && (
            <StyledImageContainer isinitials={isInitials}>
              <Image src={signature} alt='signature' fill style={{ objectFit: 'contain' }} />
            </StyledImageContainer>
          )}
          <Divider />
          <Typography variant='subtitle2'>{signatureDate}</Typography>
        </StyledSignContent>
      )}
      <SignModal
        id={policiesSignModalId}
        onSaveSignature={onSaveSignature}
        onClearSignature={onClearSignature}
        signatureName={signatureName}
        onSaveSignaturePoints={onSaveSignaturePoints}
        signaturePoints={signaturePoints}
        validateFields={[signatureName, 'checkPolicies', 'checkOthers']}
      />
    </>
  );
};

export default InitialsInput;
