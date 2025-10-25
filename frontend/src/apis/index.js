export const saveAuthInfo = (res) => {
  localStorage.setItem('access-token', res.headers['access-token']);
  localStorage.setItem('client', res.headers['client']);
  localStorage.setItem('uid', res.headers['uid']);
};

export const clearAuthInfo = () => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');
};

export const getAuthInfo = () => {
  return {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
};
