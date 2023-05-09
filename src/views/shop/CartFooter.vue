<template>
  <div class="mask" v-if="showChart && total>0" @click="handleCartShowChange" />
  <div class="cart">
    <div class="product" v-if="showChart && total>0">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="allChecked ? '&#xe69e;': '&#xe648;'"
          >
          </span>
          全选
        </div>
        <div class="product__header__clear">
        <span
          class="product__header__clear__btn"
          @click="() => cleanCartProducts(shopId)"
        >清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe69e;': '&#xe648;'"
            @click="() => changeCartItemChecked(shopId, item._id)"
          />
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="() => { changeItemToCart(item, -1) }"
            >-</span>
              {{item.count || 0}}
            <span
              class="product__number__plus"
              @click="() => { changeItemToCart(item, 1)}"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img" @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ price }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
const useCartEffect = (shopId) => {
  const store = useStore()
  const cartCount = store.state.cartList

  const total = computed(() => {
    const cartShop = cartCount[shopId]
    let count = 0
    if (cartShop) {
      for (const i in cartShop) {
        const product = cartShop[i]
        count += product.count
      }
    }
    return count
  })

  const price = computed(() => {
    const cartShop = cartCount[shopId]
    let count = 0
    if (cartShop) {
      for (const i in cartShop) {
        const product = cartShop[i]
        count += (product.count * product.price)
      }
    }
    return count.toFixed(2)
  })

  const productList = computed(() => {
    const productList = cartCount[shopId] || []
    return productList
  })

  const changeItemToCart = (item, num) => {
    item.count += num
    if (item.count < 0) { item.count = 0 }
  }

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const allChecked = computed(() => {
    const productList = cartCount[shopId]
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })

  return { total, price, productList, changeItemToCart, changeCartItemChecked, setCartItemsChecked, allChecked, cleanCartProducts }
}
export default {
  name: 'CartFooter',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const showChart = ref(false)
    const handleCartShowChange = () => {
      console.log(showChart.value)
      showChart.value = !showChart.value
    }
    const {
      total, price, productList, changeItemToCart, changeCartItemChecked, setCartItemsChecked, allChecked,
      cleanCartProducts
    } = useCartEffect(shopId)
    return { total, price, shopId, productList, changeItemToCart, changeCartItemChecked, setCartItemsChecked, allChecked, cleanCartProducts, handleCartShowChange, showChart }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 1;
  }
  .cart {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: #FFF;
  }
  .check {
    display: flex;
    height: .49rem;
    box-shadow: 0 -.01rem .01rem 0 #F1F1F1;
    line-height: .49rem;
    &__icon {
      position: relative;
      width: .84rem;
      &__img {
        display: block;
        height: .26rem;
        width: .28rem;
        margin: .12rem auto;
      }
      &__tag {
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        background-color: #E93B3B;
        color: #FFFFFF;
        font-size: .12rem;
        position: absolute;
        top: .04rem;
        // left: .47rem;
        right: .2rem;
        line-height: .2rem;
        text-align: center;
        transform: scale(.5);
      }
    }
    &__info {
      flex: 1;
      font-size: 12px;
      color: #333333;
      &__price {
        font-size: .18rem;
        color: #E93B3B;
      }
    }
    &__btn {
      width: .98rem;
      background: #4FB0F9;
      text-align: center;
      color: #FFFFFF;
      font-size: .14rem;
    }
  }
  .product {
    overflow-y: scroll;
    flex: 1;
    background: #FFF;
    &__header {
      display: flex;
      line-height: .52rem;
      border-bottom: 1px solid #F1F1F1;
      font-size: .14rem;
      color: #333;
      justify-content: space-between;
      &__all {
        width: .64rem;
        margin-left: .18rem;
      }
      &__icon {
        display: inline_block;
        margin-right: .1rem;
        vertical-align: top;
        color: $btn-bgColor;
        font-size: .2rem;
      }
      &__clear {
        flex: 1;
        margin-right: .16rem;
        text-align: right;
        line-height: .52rem;
        &__btn {
          display: inline-block;
        }
      }
    }
    &__item {
      position: relative;
      display: flex;
      padding: .12rem 0;
      margin: 0 .16rem;
      border-bottom: .01rem solid $content-bgColor;
      &__checked {
        line-height: .5rem;
        margin-right: .2rem;
        color: #0091FF;
        font-size: .2rem;
      }
      &__detail {
        overflow: hidden;
      }
      &__img {
        width: .46rem;
        height: .46rem;
        margin-right: .16rem;
      }
      &__title {
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }
      &__price {
        margin: .06rem 0 0 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $highlight-fontColor;
      }
      &__yen {
        font-size: .12rem;
      }
      &__origin {
        margin-left: .06rem;
        line-height: .2rem;
        font-size: .12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }
      .product__number {
        position: absolute;
        right: 0;
        bottom: .12rem;
        &__minus, &__plus
        {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          line-height: .16rem;;
          border-radius: 50%;
          font-size: .2rem;
          text-align: center;
        }
        &__minus {
          border: .01rem solid $medium-fontColor;
          color: $medium-fontColor;
          margin-right: .05rem;
        }
        &__plus {
          background: $btn-bgColor;
          color: $bgColor;
          margin-left: .05rem;
        }
      }
    }
  }
</style>
