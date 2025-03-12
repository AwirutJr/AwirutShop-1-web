import axios from 'axios';

export const createCategory = async (token, name) => {
    return await axios.post(
        'https://awirut-shop-1-api.vercel.app/api/category', name,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
     );     
  }

export const listCategory = async () => {
    return await axios.get(
        'https://awirut-shop-1-api.vercel.app/api/category',);
  }
  
export const removeCategory = async (token, id) => {
    return await axios.delete(
        'https://awirut-shop-1-api.vercel.app/api/category/'+id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
     );
  }