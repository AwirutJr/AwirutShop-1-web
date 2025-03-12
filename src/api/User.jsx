import axios from "axios";

export const UserCart = async (token, cart) => {
  return await axios.post(
    'https://awirut-shop-1-api.vercel.app/api/user/cart', cart,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

export const listUserCart = async (token) => {
  return await axios.get(
    'https://awirut-shop-1-api.vercel.app/api/user/cart',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}
export const SaveAddress = async (token,address) => {
  return await axios.post(
    'https://awirut-shop-1-api.vercel.app/api/user/address',{address},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}
export const SaveOrder = async (token,payload) => {
  return await axios.post(
    'https://awirut-shop-1-api.vercel.app/api/user/order',payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

export const GetOrders = async (token) => {
  return await axios.get(
    'https://awirut-shop-1-api.vercel.app/api/user/order',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

