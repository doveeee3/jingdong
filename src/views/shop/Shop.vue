<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe7e0;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe600;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索"/>
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <Content :shopName="item.name"/>
    <CartFooter />
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo.vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Content from './Content.vue'
import CartFooter from './CartFooter.vue'
import shop from '@/api/shop'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await shop(route.params.id)
    data.item = result
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'Shop',
  components: { ShopInfo, Content, CartFooter },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    const { handleBackClick } = useBackRouterEffect()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  margin: .16rem 0 .04rem 0;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;
  &__icon {
    box-sizing: border-box;
    width: .44rem;
    padding: 0 .12rem 0 .16rem;
    font-size: .19rem;
    color: $seach-fontColor;
  }
  &__input {
    display: block;
    border: none;
    outline: none;
    background: none;
    height: .32rem;
    width: 100%;
    padding-right: .02rem;
    font-size: .14rem;
    color: $content-fontcolor;
    &::placeholder {
      color: $content-fontcolor;
    }
  }
  }
}
</style>
