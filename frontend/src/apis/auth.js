import axios from 'axios';
import { getAuthInfo } from './index';

export const signUp = async ({ email, password, passwordConfirmation }) => {
  return axios.post('/api/v1/auth', {
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
};

export const signIn = async ({ email, password }) => {
  return axios.post('/api/v1/auth/sign_in', {
    email,
    password,
  });
};

export const signOut = async () => {
  const authInfo = getAuthInfo();

  return axios.delete('/api/v1/auth/sign_out', {
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

  const res = await axios.get('/api/v1/auth/validate_token', {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });

  return res;
};

export const requestPasswordReset = async ({ email }) => {
  await axios.post('/api/v1/auth/password', {
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
    '/api/v1/auth/password',
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
    '/api/v1/auth',
    {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: passwordConfirmation,
    },
    { headers: { uid } }
  );
};
