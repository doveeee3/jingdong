<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">
            {{ item.isCanceled ? '已取消' : '已下单' }}
          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img class="order__content__img" :src="innerItem.product.img" v-if="innerIndex <= 3" />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥ {{ item.totalPrice }}</div>
            <div class="order__content__count">共 {{ item.totalNumber }} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>
<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker.vue'
// import { get } from '@/utils/request'
import order from '@/api/order'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await order()
    console.log(result)
    const orderList = result
    orderList.forEach((order) => {
      const products = order.products || []
      let totalPrice = 0
      let totalNumber = 0
      products.forEach((productItem) => {
        totalNumber += (productItem?.orderSales || 0)
        totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
      })
      order.totalPrice = totalPrice
      order.totalNumber = totalNumber
    })
    data.list = result
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  bottom: 0.5rem;
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

.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background-color: $bgColor;

  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }

  &__status {
    float: right;
    font-size: .14rem;
    color: $light-fontColor;
  }

  &__content {
    display: flex;

    &__imgs {
      flex: 1;
    }

    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }

    &__info {
      width: .7rem;
    }

    &__price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
      text-align: right;
    }

    &__count {
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>
