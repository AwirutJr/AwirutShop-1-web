import axios from 'axios';

export const payment = async (token) => {
    return await axios.post(
        'https://awirut-shop-1-api.vercel.app/api/user/create-checkout-session',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
  }
  