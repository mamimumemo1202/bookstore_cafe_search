import axios from 'axios';
import { getAuthInfo } from './index';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

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
  const authInfo = getAuthInfo();

  return axios.delete(`${BASE_URL}/auth/sign_out`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
};

export const validateToken = async () => {
  const authInfo = getAuthInfo();

  if (!authInfo['access-token'] || !authInfo['client'] || !authInfo['uid']) return null;

  const res = await axios.get(`${BASE_URL}/auth/validate_token`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });

  return res;
};

// TODO: 要修正

export const requestPasswordReset = async ({ email }) => {
  await axios.post(`${BASE_URL}/auth/password`, {
    email,
    redirect_url: 'http://localhost:5173/reset-password',
  });
};

export const resetPassword = async ({
  password,
  passwordConfirmation,
  accessToken,
  client,
  uid,
}) => {
  await axios.put(
    `${BASE_URL}/auth/password`,
    {
      password,
      password_confirmation: passwordConfirmation,
    },
    { headers: { 'access-token': accessToken, client, uid } }
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
