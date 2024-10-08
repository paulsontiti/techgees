import React, { useState } from 'react';
import axios from 'axios';
import Loader from '@/components/loader';

interface PayStackButtonProps {
  email:string;
  amount: number;
}


const PayStackButton: React.FC<PayStackButtonProps> = ({ email, amount }) => {
  const [loading, setLoading] = useState(false);

  const initializePayment = async () => {
    setLoading(true);
    try {
      // Send a POST request to your server to create a Paystack checkout session
      const response = await axios.post(
        '/api/paystack/create-checkout-session',
        {
         
          amount,
          email,
        }
      );

      const { authorizationUrl } = response.data;

      // Open Paystack payment page in a new tab
      const paymentWindow = window.open(authorizationUrl);

      if (paymentWindow) {
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            window.location.href = '/checkout-success';
            clearInterval(interval);
          }
        }, 1000);
      } else {
        console.error('Failed to open payment window.');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      // Handle the error, e.g., show a user-friendly error message to the user.
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="cta" onClick={initializePayment}>
      <Loader loading={loading} /> pay with Paystack
    </button>
  );
};

export default PayStackButton;