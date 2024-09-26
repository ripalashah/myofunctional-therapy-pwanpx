import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Q2sDRRwV8mqBs6KEiC0b1e9Azfe4EpZ5sCWVpJfRdN6TCdXAJcDdpNQj0CBSz8yrwCwvcXf1azw3wd5JrptbTQr00auq7ucIZ');

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
