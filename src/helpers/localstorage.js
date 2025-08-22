export const saveToLocalStorage = (data, token = 'auth_token') => {
  localStorage.setItem(token, JSON.stringify(data));
};

export const getAuthToken = (token = 'auth_token') => {
  return JSON.parse(localStorage.getItem(token)) || '';
};
