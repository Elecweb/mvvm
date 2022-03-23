const ACCESS_TOKEN_KEY = "access_token";

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};
