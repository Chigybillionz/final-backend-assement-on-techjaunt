import axios from "axios";
import { env } from "../config/env";

export const paystack = axios.create({
  baseURL: env.paystack.baseUrl,
  headers: {
    Authorization: `Bearer ${env.paystack.secretKey}`,
    "Content-Type": "application/json",
  },
});
