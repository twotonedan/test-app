import { IHeaderMenuOption } from '@/types/company';
import { useUserState } from '@/hooks/contexts/useUserState';

import LoggedButton from './LoggedButton';
import SignInButton from './SignInButton';

type Props = {
  menuOptions?: IHeaderMenuOption[];
  onLinksClick?: () => void;
};

const UserLoginButton = ({ menuOptions, onLinksClick }: Props) => {
  const { isLoggedIn } = useUserState();

  return isLoggedIn ? (
    <LoggedButton menuOptions={menuOptions} onLinksClick={onLinksClick} />
  ) : (
    <SignInButton onClick={onLinksClick} />
  );
};

export default UserLoginButton;
