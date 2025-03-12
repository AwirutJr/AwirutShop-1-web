import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Login } from '../api/auth'
import _ from 'lodash'

//api
import { listCategory } from '../api/Category'
import { listProduct, SearchFilters } from '../api/Product'

// สร้าง store ที่ใช้กับ persist
// store.js
const useAwirutStore = (set, get) => ({
  user: null,
  token: null,
  Categories: [],
  Products: [],
  Carts: [],
  Logout: () => {
    set({
      user: null,
      token: null,
      Categories: [],
      Products: [],
      Carts: [],
    })
  },
  actionAddtoCart: (product) => {
    //ดึงข้อมูลจากของเดิม   
    const Carts = get().Carts
    //อัพเดตข้อมูล จากของเดิม
    const updateCart = [...Carts, { ...product, count: 1 }]


    //Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual)
    //สร้างข้อมูลเข้ามาใหม่
    set({ Carts: uniqe })
    // console.log('add to cart', updateCart)



  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // ถ้า newQuantity เป็น 0 เราจะให้ถามผู้ใช้ก่อน
    if (newQuantity === 0) {
      const confirmDelete = window.confirm("คุณต้องการลบสินค้านี้จริงๆ หรือไม่?");
      if (confirmDelete) {
        // ถ้าผู้ใช้ยืนยันจะลบสินค้านี้จริงๆ
        set((state) => ({
          Carts: state.Carts.filter((item) => item.id !== productId) // ลบสินค้าออกจาก Carts
        }));
      } else {
        return; // ถ้าผู้ใช้ไม่ยืนยัน, ไม่ทำอะไร
      }
    } else {
      // ถ้า newQuantity ไม่เป็น 0 ก็แค่ปรับจำนวนสินค้า
      set((state) => ({
        Carts: state.Carts.map((item) =>
          item.id === productId
            ? { ...item, count: Math.max(1, newQuantity) }
            : item
        )
      }));
    }
  },

  actionRemoveProduct: (productId) => {
    // console.log(productId)
    set((state) => ({
      Carts: state.Carts.filter((item) =>
        item.id !== productId
      )
    }))
  },
  actionGetTotalPrice: () => {
    const carts = get().Carts;

    // ตรวจสอบว่า Carts ว่างหรือไม่
    if (carts.length === 0) {
      return 0;  // หากไม่มีสินค้าในตะกร้า, ให้คืนค่าเป็น 0
    }

    return carts.reduce((total, item) => {
      return total + item.price * item.count;  // คูณราคากับจำนวนสินค้า
    }, 0);
  },

  actionLogin: async (form) => {
    try {
      const res = await Login(form)
      set({ user: res.data.payload, token: res.data.token })
    } catch (err) {
      console.log('Login Error:', err)
    }
  },

  actionGetCategory: async () => {
    try {
      const res = await listCategory()
      set({ Categories: res.data })
    } catch (err) {
      console.log(err)
    }
  },

  actionGetProduct: async () => {
    try {
      const res = await listProduct()
      set({ Products: res.data }) // ตั้งค่า Products เป็นข้อมูลสินค้าทั้งหมด
    } catch (err) {
      console.log(err)
    }
  },

  actionSearchFilters: async (arg) => {
    try {
      const res = await SearchFilters(arg)

      // ตรวจสอบว่า res.data เป็นอาเรย์และมีข้อมูลหรือไม่
      if (Array.isArray(res.data) && res.data.length > 0) {
        set({ Products: res.data }) // ถ้ามีข้อมูล, อัพเดต Products
      } else {
        console.log("No products found or invalid data structure:", res.data)
        // หากไม่มีข้อมูลให้แสดงสินค้าทั้งหมดหรือแสดงข้อความว่าไม่พบสินค้า
        set({ Products: [] }) // ตั้งค่า Products เป็นอาเรย์ว่างในกรณีไม่พบสินค้า
      }
    } catch (err) {
      console.log("Search Error:", err)
    }
  },
  clearCart: async () => set({ Carts: [] })
})


// กำหนดชื่อสำหรับ localStorage ที่จะใช้ใน persist
const usePersist = {
  name: 'index', // ใช้ key 'index' ใน localStorage
  storage: createJSONStorage(() => localStorage), // ใช้ localStorage เป็นที่เก็บข้อมูล
}

// สร้าง store ที่เก็บข้อมูลโดยใช้ persist
const useStore = create(persist(useAwirutStore, usePersist))

export default useStore
