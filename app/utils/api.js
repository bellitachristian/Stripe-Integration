import { apiClient } from "./apiClient";

const BASE_URI = "http://localhost:3000/api/";

export const paymongo = {
  createCheckoutSession: (data) =>
    apiClient.post(`${process.env.PAYMONGO_BASE_URI}checkout_sessions`, data, {
      auth: "BASIC",
    }),
};

export const checkout = {
  post: (data) => apiClient.post(`${BASE_URI}checkout`, data),
};

export const stripe = {
  //USE STRIPE VALID API FOR CHECKOUT SESSION
  // createCheckoutSession: console.log('STRIPE INTEGRATION daw')
};
