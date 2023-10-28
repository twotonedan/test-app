import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { styled, Dialog, DialogContent, Typography, Box, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import theme from '@/theme';
import SignatureCanvas from 'react-signature-canvas';
import { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    width: 343px;
    height: 311px;

    & .MuiDialogContent-root {
      flex: none;
      overflow: hidden;
    }
  }
`;

const StyledDialogContent = styled(DialogContent)`
  font-size: 16px;
  text-align: center;
  padding-bottom: 0;
`;

const StyledFieldset = styled('fieldset')`
  border: 2px dashed ${theme.palette.customText.secondary};
  border-radius: 8px;
  height: 253px;
  padding: 0;
  position: relative;
`;

const StyledLegend = styled('legend')`
  text-align: start;
`;

const StyledRedText = styled(Typography)`
  color: ${theme.palette.error.main};
`;

const StyledTextContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0 4px;
`;

const StyledTextContainerBottom = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin: 0 4px;
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  border-radius: 100px;
  height: 40px;
  border: 1px solid ${theme.palette.primary.main};
  width: 97px;
  position: absolute;
  top: 0;
  right: 10px;
`;

const StyledToggleButtonLeft = styled(ToggleButton)`
  border-radius: 100px !important;
  width: 52px;
  color: ${theme.palette.customColors.white};
  background-color: ${theme.palette.primary.main};
  border: none;

  &:hover {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    background-color: ${theme.palette.primary.main};
  }
`;

const StyledDoneButton = styled(Button)`
  position: absolute;
  bottom: 12px;
  right: 10px;
`;

const StyledToggleButtonRigth = styled(ToggleButton)`
  background-color: transparent;
  color: ${theme.palette.primary.main};
  border-radius: 0 100px 100px 0;
  border: none;
`;

const StyledSignContent = styled(Box)`
  height: 100%;
  width: 100%;

  canvas {
    width: inherit;
    height: inherit;
  }
`;

type Props = {
  signatureName: string;
  onSaveSignature?: () => void;
  onClearSignature?: () => void;
  onSaveSignaturePoints?: (signaturePoints: [][]) => void;
  signaturePoints: [][] | null;
  validateFields?: string | string[];
};

const SignModal = NiceModal.create(
  ({
    signatureName,
    signaturePoints,
    onSaveSignaturePoints,
    onSaveSignature,
    onClearSignature,
    validateFields,
  }: Props) => {
    const modal = useModal();
    const { t } = useTranslation(['common']);
    const { isOpen, handleOnClose } = useMuiDrawer(modal);
    const { setValue, trigger } = useFormContext();
    const signature = useWatch({ name: signatureName });

    const signRef = useRef<SignatureCanvas>(null);

    useEffect(() => {
      if (signaturePoints) {
        setTimeout(() => {
          signRef.current?.fromData(signaturePoints);
        });
      }
    }, [signaturePoints]);

    const handleValidateFields = () => {
      trigger(validateFields);
    };

    const handleSignatureEnd = () => {
      setValue(signatureName, signRef.current?.getTrimmedCanvas().toDataURL('image/svg'));
      onSaveSignaturePoints?.(signRef.current?.toData() as [][]);
    };

    const clearSignature = () => {
      signRef.current?.clear();
      setValue(signatureName, '');
      onClearSignature?.();
      handleValidateFields();
    };

    const handleSaveSignature = () => {
      onSaveSignature?.();
      handleOnClose();
      handleValidateFields();
      onSaveSignaturePoints?.(signRef.current?.toData() as [][]);
    };

    return (
      <StyledDialog open={isOpen} onClose={handleOnClose}>
        <StyledDialogContent>
          <StyledFieldset>
            <StyledLegend>
              <StyledTextContainer>
                <Typography variant='label'>{t('policies.initialsHere')}</Typography>
                <StyledRedText>*</StyledRedText>
              </StyledTextContainer>
            </StyledLegend>
            <StyledSignContent>
              <SignatureCanvas ref={signRef} onEnd={handleSignatureEnd} />
            </StyledSignContent>
            <StyledToggleButtonGroup color='primary'>
              <StyledToggleButtonLeft value='edit'>
                <ModeEditOutlineOutlinedIcon />
              </StyledToggleButtonLeft>
              <StyledToggleButtonRigth value='delete' onClick={clearSignature}>
                <DeleteOutlineOutlinedIcon />
              </StyledToggleButtonRigth>
            </StyledToggleButtonGroup>
            <StyledDoneButton variant='text' onClick={handleSaveSignature} disabled={!signature}>
              {t('done')}
            </StyledDoneButton>
          </StyledFieldset>
        </StyledDialogContent>
        <StyledTextContainerBottom>
          <StyledRedText>*</StyledRedText>
          <Typography variant='label'>{t('required')}</Typography>
        </StyledTextContainerBottom>
      </StyledDialog>
    );
  }
);

export default SignModal;
