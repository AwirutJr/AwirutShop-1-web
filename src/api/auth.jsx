import axios from 'axios';

export const Login = async (form) => {
  return await axios.post('https://awirut-shop-1-api.vercel.app/api/login', form);
}

export const actionRegister = async (form) => {
  return await axios.post('https://awirut-shop-1-api.vercel.app/api/register', form);
}

export const currentUser = async(token) => await axios.post('https://awirut-shop-1-api.vercel.app/api/current-user',{}
  ,{
      headers: {
          Authorization: `Bearer ${token}`,  // ส่ง token ใน headers
      }
  }
)

export const currentAdmin = async (token) => {
  return await axios.post(
      'https://awirut-shop-1-api.vercel.app/api/current-admin',
      {},
      {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      }
  );
}


