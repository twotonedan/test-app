import { PersonOutlined } from '@mui/icons-material';
import { Button, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledButton = styled(Button)`
  width: max-content;
`;

const StyledSignInButton = styled(StyledButton)``;

type Props = {
  onClick?: () => void;
};

const SignInButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    // sign in logic
  };

  return (
    <StyledSignInButton variant='contained' startIcon={<PersonOutlined />} onClick={onClick || handleClick}>
      {t('signIn')}
    </StyledSignInButton>
  );
};

export default SignInButton;
