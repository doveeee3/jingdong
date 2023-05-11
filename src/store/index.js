import { createStore } from 'vuex'
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocaCartList()
  },
  getters: {},
  mutations: {
    changeItemToCart(state, payload) {
      const { shopId, productId, productInfo, num, shopName } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = { shopName: '', productList: {} }
      }
      let product = shopInfo.productList[productId]
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
      shopInfo.shopName = shopName
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      console.log(shopInfo)
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const shopInfo = state.cartList[shopId]
      const product = shopInfo.productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    }
  },
  actions: {},
  modules: {}
})
