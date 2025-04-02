import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const API_URL =
  process.env.API_URL || "http://20.244.56.144/evaluation-service";

export const EMAIL = process.env.EMAIL;
export const NAME = process.env.NAME;
export const ROLL_NO = process.env.ROLL_NO;
export const ACCESS_CODE = process.env.ACCESS_CODE;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
