import axios from "axios";

export const createProduct = async (token, form) => {
  return await axios.post(
    'https://awirut-shop-1-api.vercel.app/api/product', form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
}

export const listProduct = async (count = 1000) => {
  // code body
  return axios.get("https://awirut-shop-1-api.vercel.app/api/products/" + count);
}

export const readProduct = async (token, id ,form) => {
  // code body
  return axios.get("https://awirut-shop-1-api.vercel.app/api/product/" + id,form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put("https://awirut-shop-1-api.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}


export const romoveProduct = async (id) => {
  // code body
  return axios.delete("https://awirut-shop-1-api.vercel.app/api/product/" + id, {
  })
}

export const uploadFiles = async (token, form) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://awirut-shop-1-api.vercel.app/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://awirut-shop-1-api.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const SearchFilters = async (arg) => { 
  // arg = are gry ment
  return axios.post("https://awirut-shop-1-api.vercel.app/api/product/filters",arg);
}

export const ListProductBy = async (sort, order, limit) => { 
  return axios.post("https://awirut-shop-1-api.vercel.app/api/productby", {
    sort,
    order,
    limit
  })
}