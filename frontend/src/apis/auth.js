import axios from 'axios';
import { getAuthInfo } from './index';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;

const buildAuthHeader = () => {
  const authInfo = getAuthInfo();

  if (!authInfo['access-token'] || !authInfo.client || !authInfo.uid) return {};

  return {
    'access-token': authInfo['access-token'],
    client: authInfo.client,
    uid: authInfo.uid,
  };
};

export const signUp = async ({ email, password, passwordConfirmation }) => {
  return axios.post(`${BASE_URL}/auth`, {
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
};

export const signIn = async ({ email, password }) => {
  return axios.post(`${BASE_URL}/auth/sign_in`, {
    email,
    password,
  });
};

export const signOut = async () => {

  return axios.delete(`${BASE_URL}/auth/sign_out`, {
    headers: buildAuthHeader()
  });
};

export const validateToken = async () => {

  const res = await axios.get(`${BASE_URL}/auth/validate_token`, {
    headers: buildAuthHeader()
  });

  return res;
};

export const requestPasswordReset = async ({ email }) => {
  await axios.post(`${BASE_URL}/auth/password`, {
    email,
    redirect_url: `${FRONTEND_BASE_URL}/reset-password`,
  });
};

export const resetPassword = async ({
  password,
  passwordConfirmation,
  resetPasswordToken
}) => {
  await axios.put(
    `${BASE_URL}/auth/password`,
    {
      password,
      password_confirmation: passwordConfirmation,
      reset_password_token: resetPasswordToken,
    },
     {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'access-token': accessToken,
        // client: client,
        // uid: uid,
      },
    }
  );
};

export const requestPasswordChange = async ({
  currentPassword,
  newPassword,
  passwordConfirmation,
  uid,
}) => {
  await axios.put(
    `${BASE_URL}/auth`,
    {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: passwordConfirmation,
    },
    { headers: { uid } }
  );
};

export const resentConfirmation = async (email) => {
  await axios.post(`${BASE_URL}/auth/confirmation`, { email });
};
