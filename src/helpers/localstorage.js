export const saveToLocalStorage = (data, token = "auth_token") => {
  console.log({ data, token });
  localStorage.setItem(token, JSON.stringify(data));
};

export const getAuthToken = (token = "auth_token") => {
  return JSON.parse(localStorage.getItem(token)) || "";
};
