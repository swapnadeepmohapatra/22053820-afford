import { saveToken, getToken } from "../db/index.js";
import { refreshAuthToken } from "../services/auth.service.js";

export const getAuthToken = async () => {
  const token = await getToken();
  if (!token) {
    const newToken = await refreshAuthToken();
    saveToken(newToken);
    return newToken.access_token;
  }
  return token;
};
