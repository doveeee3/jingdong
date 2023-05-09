import { createStore } from 'vuex'
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList)
  } else {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocaCartList()
  },
  getters: {
  },
  mutations: {
    changeItemToCart (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = {}
      }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      if (num < 0) {
        product.count -= 1
        if (product.count < 0) {
          product.count = 0
        }
      }
      if (num > 0) {
        product.count += 1
        product.check = true
      }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const shopInfo = state.cartList[shopId]
      const product = shopInfo[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      const shopInfo = {}
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
