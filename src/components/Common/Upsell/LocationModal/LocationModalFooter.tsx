import { styled, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import theme from '@/theme';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FooterDrawer from '../../FooterDrawer/FooterDrawer';

const StyledFooterDrawer = styled(FooterDrawer)`
  position: sticky;
  background: ${theme.palette.customColors.white};
  border-radius: 16px 16px 0px 0px;
  bottom: 0;
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout}
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledMandatoryMessage = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 9px;
  width: inherit;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
  color: ${theme.palette.customInput.borderFilled};
`;

const StyledRequiredMessageContainer = styled(Box)`
  display: flex;
  align-items: baseline;
`;

type Props = {
  onClose: () => void;
  isDisabled: boolean;
};

const LocationModalFooter = ({ onClose, isDisabled }: Props) => {
  const { t } = useTranslation('common');

  return (
    <StyledFooterDrawer elevation={0}>
      <StyledInnerWrapper>
        {isDisabled && (
          <StyledMandatoryMessage>
            <StyledInfoOutlinedIcon fontSize='medium' />
            <StyledRequiredMessageContainer>
              <Typography variant='h4' color={theme.palette.customText.primary}>
                {t('location.selectionRule')}
              </Typography>
            </StyledRequiredMessageContainer>
          </StyledMandatoryMessage>
        )}
        <StyledButton disabled={isDisabled} onClick={() => onClose()} variant='contained'>
          {t('done')}
        </StyledButton>
      </StyledInnerWrapper>
    </StyledFooterDrawer>
  );
};

export default LocationModalFooter;
