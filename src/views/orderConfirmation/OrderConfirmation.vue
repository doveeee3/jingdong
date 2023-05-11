<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back" @click="$router.back()">&#xe7e0;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">18911024266</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe7e0;</div>
      </div>
    </div>
    <div class="product">
      <div class="product__title">{{ shopName }}</div>
      <div class="product__wrapper">
        <div class="product__list">
          <div class="product__item" v-for="item in productList" :key="item._id">
            <img class="product__item__img" :src="item.imgUrl" />
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.name }}</h4>
              <p class="product__item__price">
                <span class="product__item__single">
                  <span class="product__item__yen">&yen;</span>
                  {{ item.price }} × {{ item.count }}
                </span>
                <span class="product__item__total">
                  <span class="product__item__yen">&yen;</span>
                  {{ (item.price * item.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price">实付金额 <b>&yen;{{ price }}</b></div>
      <div class="order__btn" @click="() => handleSubmitOrder(true)">提交订单</div>
    </div>
    <div class="mask" v-if="mask" @click="() => handleSubmitOrder(false)">
      <div class="mask__content" @click.stop>
        <h3 class="mask__content__title">确认要离开收银台？</h3>
        <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
        <div class="mask__content__btns">
          <div class="mask__content__btn mask__content__btn--first" @click="() => handleOrderConfirm(true)">取消订单</div>
          <div class="mask__content__btn mask__content__btn--second" @click="() => handleOrderConfirm(false)">确认支付</div>
        </div>
      </div>
    </div>
    <Toast :message="toastMessage" v-if="show" />
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'
const useOrderEffert = (shopId, showToast) => {
  const store = useStore()
  const cartCount = store.state.cartList
  const router = useRouter()
  const mask = ref(false)

  const productList = computed(() => {
    const productList = cartCount[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    console.log(notEmptyProductList)
    return notEmptyProductList
  })

  const shopName = computed(() => {
    const shopName = cartCount[shopId].shopName || ''
    return shopName
  })

  const price = computed(() => {
    const cartShop = cartCount[shopId]?.productList
    let count = 0
    if (cartShop) {
      for (const i in cartShop) {
        const product = cartShop[i]
        count += (product.count * product.price)
      }
    }
    return count.toFixed(2)
  })
  const handleSubmitOrder = () => {
    mask.value = true
  }
  const handleOrderConfirm = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('cleanCartProducts', { shopId })
        router.push({ name: 'Home' })
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  return { productList, shopName, price, handleOrderConfirm, mask, handleSubmitOrder }
}
export default {
  name: 'OrderConfirmation',
  components: { Toast },
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { show, toastMessage, showToast } = useToastEffect()
    const { productList, shopName, price, handleOrderCancel, handleOrderConfirm, mask, handleSubmitOrder } = useOrderEffert(shopId, showToast)
    return { productList, shopName, price, handleOrderCancel, handleOrderConfirm, mask, show, toastMessage, handleSubmitOrder }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #eee;
}

.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091FF 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: #FFF;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }

  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background-color: #FFF;
    border-radius: 4px;

    &__title {
      padding: .16rem 0 .14rem .16rem;
      line-height: .22rem;
      font-size: .16rem;
      color: #333;
    }

    &__address {
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      line-height: .2rem;
      color: #333;
    }

    &__info {
      padding: .06rem 0 0 .16rem;

      &__name {
        line-height: .18rem;
        font-size: .12rem;
        color: #666;
      }
    }

    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .48rem;
      color: #666;
      font-size: .20rem;
    }
  }
}

.product {
  margin: .16rem .18rem .2rem .18rem;
  overflow-y: scroll;
  background: #fff;

  &__title {
    padding: .16rem;
    font-size: .16rem;
    color: #333;
  }

  &__wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.62rem;
    overflow-y: scroll;
    margin: 0 .18rem;
  }

  &__list {
    background-color: #FFF;
  }

  &__item {
    position: relative;
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

.order {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  line-height: .49rem;
  background-color: #fff;
  display: flex;

  &__price {
    flex: 1;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    padding: .14rem 0 .15rem .24rem;
  }

  &__btn {
    width: .98rem;
    background: #4FB0F9;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
  }
}

.mask {
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.50);

  &__content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 1.56rem;
    width: 3rem;
    background-color: #fff;
    text-align: center;

    &__title {
      line-height: .26rem;
      margin: .24rem 0 0 0;
      font-size: .18rem;
      color: #333;
    }

    &__desc {
      margin-top: .08rem;
      font-size: .14rem;
      color: #666;
    }

    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }

    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border: 1px solid #4FB0F9;
      border-radius: 16px;

      &--first {
        margin-right: .12rem;
        color: #4FB0F9;
      }

      &--second {
        margin-left: .12rem;
        color: #FFF;
        background: #4FB0F9;
      }
    }
  }
}
</style>
