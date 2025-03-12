import axios from "axios";

export const GetOrdersAdmin = async (token) => {
  return await axios.get(
    'https://awirut-shop-1-api.vercel.app/api/admin/orders',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}
export const ChangOrderStatus = async (token, orderId, orderStatus) => {
  return await axios.put(
    'https://awirut-shop-1-api.vercel.app/api/admin/change-order-status', { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

export const GetListAllUser = async (token) => {
  return await axios.get(
    'https://awirut-shop-1-api.vercel.app/api/users',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

export const ChangeUserStatus = async (token,value) => {
  return await axios.post(
    'https://awirut-shop-1-api.vercel.app/api/change-status', value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}
export const ChangeUserRole = async (token,value) => {
  return await axios.post(
    'https://awirut-shop-1-api.vercel.app/api/change-role', value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

