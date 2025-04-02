import { LocalStorage } from "node-localstorage";

export const saveToken = (token_obj) => {
  try {
    const { access_token, expires_in } = token_obj;
    const localStorage = new LocalStorage("./scratch");
    const token = {
      access_token,
      expires_in,
    };
    localStorage.setItem("token", JSON.stringify(token));
  } catch {
    console.log("Error saving token", error);
  }
};

export const getToken = () => {
  const localStorage = new LocalStorage("./scratch");
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  if (!token) {
    return null;
  }
  if (!token.access_token) {
    return null;
  }
  const { access_token, expires_in } = token;
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime > expires_in) {
    return null;
  }
  return access_token;
};
