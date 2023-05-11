<template>
  <div class="wrapper">
    <div class="title">我的全部购物车({{ cartTotalProduct }})</div>
    <div class="products">
      <div class="product" v-for="(item, index) in shopInfoList" :key="index">
        <div class="product__title">{{ item.shopName }}</div>
        <div class="product__wrapper">
          <div class="product__list">
            <div class="product__item" v-for="(innerItem, innerIndex) in item.productList" :key="innerIndex">
              <img class="product__item__img" :src="innerItem.imgUrl" />
              <div class="product__item__detail">
                <h4 class="product__item__title">{{ innerItem.name }}</h4>
                <p class="product__item__price">
                  <span class="product__item__single">
                    <span class="product__item__yen">&yen;</span>
                    {{ innerItem.price }} × {{ innerItem.count }}
                  </span>
                  <span class="product__item__total">
                    <span class="product__item__yen">&yen;</span>
                    {{ (innerItem.price * innerItem.count).toFixed(2) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Docker from '../../components/Docker.vue'

const useCartListEffect = () => {
  const store = useStore()
  const shopInfo = store.state.cartList
  const shopInfoList = computed(() => {
    const shopInfoList = []
    for (const i in shopInfo) {
      shopInfoList.push(shopInfo[i])
    }
    return shopInfoList
  })
  const cartTotalProduct = computed(() => {
    let totalProduct = 0
    for (const i in shopInfo) {
      const productList = shopInfo[i]?.productList
      for (const i in productList) {
        const product = productList[i]
        totalProduct += product.count
      }
    }
    return totalProduct
  })
  console.log(cartTotalProduct.value)
  return { shopInfoList, cartTotalProduct }
}

export default {
  name: 'CartList',
  components: { Docker },
  setup() {
    const { shopInfoList, cartTotalProduct } = useCartListEffect()
    return { shopInfoList, cartTotalProduct }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background-color: #f8f8f8;
}

.title {
  line-height: .44rem;
  background: #FFF;
  font-size: .16rem;
  color: #333;
  text-align: center;
}

.products {
  position: absolute;
  left: 0;
  right: 0;
  bottom: .6rem;
  top: .6rem;
  overflow-y: scroll;
  // margin: 0 .18rem;
  overflow-y: scroll;
}

.product {
  position: relative;
  margin: 0 .18rem .16rem .18rem;
  background: #fff;

  &__title {
    padding: .16rem;
    font-size: .16rem;
    color: #333;
  }

  &__item {
    display: flex;
    padding: 0 .16rem .16rem .16rem;

    &__checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: #0091ff;
      font-size: 0.2rem;
    }

    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }

    &__detail {
      flex: 1;
      overflow: hidden;
    }

    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }

    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }

    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
