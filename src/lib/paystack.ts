// src/lib/paystack.ts

import axios from "axios";

export const paystack = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK}`,
    "Content-Type": "application/json",
  },
});