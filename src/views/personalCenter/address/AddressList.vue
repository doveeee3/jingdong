<template>
  <div class="wrapper">
    <div class="header">
      <div class="iconfont header__back" @click="$router.back()">&#xe7e0;</div>
      <div class="header__title">管理收获地址</div>
      <div class="header__new" @click="$router.push({ path: 'addAddress' })">新建</div>
    </div>
    <span class="title">我的收获地址</span>
    <div class="address" v-for="item in list" :key="item._id">
      <div class="address__info">
        <div class="address__info__name">小慕</div>
        <div class="address__info__num">11232555</div>
      </div>
      <div class="address__address">{{ item.city }}市{{ item.department }}</div>
      <div class="iconfont address__icon">&#xe7e0;</div>
    </div>
  </div>
</template>
<script>
import { getAddress } from '@/api/person'
import { reactive, toRefs } from 'vue'
const useAddressEffect = () => {
  const data = reactive({ list: [] })
  const getAddressList = async () => {
    const result = await getAddress()
    console.log(result)
    data.list = result
  }
  getAddressList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'AddressList',
  setup() {
    const { list } = useAddressEffect()
    return { list }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #f8f8f8;
}

.header {
  display: flex;
  padding: .11rem .18rem;
  line-height: .44rem;
  background-color: #FFF;

  &__back {
    flex: 1;
    text-align: left;
    font-size: .22rem;
    color: #B6B6B6;
  }

  &__title {
    flex: 1;
    text-align: center;
    font-size: .16rem;
    color: #333;
  }

  &__new {
    flex: 1;
    text-align: right;
    font-size: .14rem;
    color: #333;
  }
}

.title {
  display: block;
  margin: .16rem 0 .12rem .18rem;
  font-size: .14rem;
  color: #333333;
}

.address {
  position: relative;
  margin: 0 .18rem .16rem;
  padding: .16rem .18rem;
  background-color: #fff;
  border-radius: 4px;

  &__info {
    display: flex;
    margin-bottom: .08rem;
    font-size: .14rem;
    color: #999999;
    line-height: .2rem;

    &__name {
      margin-right: .66rem;
    }
  }

  &__address {
    font-size: .14rem;
    margin-right: .47rem;
    line-height: .2rem;
    color: #333333;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: .18rem;
    margin-top: -.1rem;
    font-size: .2rem;
    color: #999999;
    transform: rotate(180deg);
  }
}
</style>
