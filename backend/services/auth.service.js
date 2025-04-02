import {
  ACCESS_CODE,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  EMAIL,
  NAME,
  ROLL_NO,
} from "../utils/keys.js";

export const refreshAuthToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: EMAIL,
        name: NAME,
        rollNo: ROLL_NO,
        accessCode: ACCESS_CODE,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error refreshing auth token:", error);
  }
};
