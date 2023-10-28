import constate from 'constate';
import useGetUserData from '@/hooks/api/useGetUserData';
import { useState } from 'react';

import useCreateAccount from '../api/useCreateAccount';

// TODO
// When click on "Login" then we will use Auth0 for authentication
// If user is valid, then we get data from authenticated user (if that user exists from stellar api)

const useUserContext = () => {
  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const { data: userData, remove } = useGetUserData({ enabled: isLoginEnabled });
  const { mutate: createAccount } = useCreateAccount();

  const loginUser = () => setIsLoginEnabled(true);
  const logoutUser = remove;

  const isLoggedIn = !!userData;

  return {
    userData,
    loginUser,
    logoutUser,
    isLoggedIn,
    createAccount,
  };
};

export const [UserStateProvider, useUserState] = constate(useUserContext);
