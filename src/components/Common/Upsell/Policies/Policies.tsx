import { styled, Box, Typography, Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import theme from '@/theme';
import { PoliciesReplaceOptionEnum } from '@/types/enums';
import CheckboxComponent from '../../Checkbox/Checkbox';
import InitialsInput from '../InitialsInput/InitialsInput';

interface Props {
  policiesDescription: string;
}

const StyledTextBox = styled(Box)`
  border: 1px solid ${theme.palette.customColors.gray};
  padding: 16px 16px 24px;
  border-radius: 16px;
  width: 100%;
  height: fit-content;
`;

const StyledSignTypography = styled(Typography)`
  padding-bottom: 32px;
  white-space: break-spaces;
`;

const StyledCheckContainer = styled(Box)`
  margin-top: 20px;
  & .MuiFormControlLabel-root {
    align-items: flex-start;
  }
  & .MuiTypography-root {
    padding-top: 9px;
  }
`;

const Policies = ({ policiesDescription }: Props) => {
  const { t } = useTranslation('common');
  return (
    <StyledTextBox>
      <StyledSignTypography variant='h4'>
        {policiesDescription !== '' &&
          policiesDescription.split(' ').map((word, i) =>
            word.indexOf(PoliciesReplaceOptionEnum.INITIALS) !== -1 ||
            word.indexOf(PoliciesReplaceOptionEnum.SIGNATURE) !== -1 ? (
              // eslint-disable-next-line react/no-array-index-key
              <InitialsInput key={`${word}-${i}`} word={word} index={i} />
            ) : (
              `${word} `
            )
          )}
      </StyledSignTypography>
      <Divider />
      <StyledCheckContainer>
        <CheckboxComponent
          label={t('policies.confirmPolicies')}
          name='checkPolicies'
          validateFields={['checkPolicies', 'checkOthers']}
        />
        <CheckboxComponent
          label={t('policies.confirmOthers')}
          name='checkOthers'
          validateFields={['checkPolicies', 'checkOthers']}
        />
      </StyledCheckContainer>
    </StyledTextBox>
  );
};

export default Policies;
