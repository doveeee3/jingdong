<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>

  </div>

</template>

<script>
import { ref } from 'vue'
// import { get } from '../../utils/request'
import hotList from '@/api/hotlist'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffet = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await hotList()
    nearbyList.value = result
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'Nameby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffet()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.nearby {
  &__title {
    font-size: 0.18rem;
    color: $content-fontcolor;
    font-weight: normal;
    margin: 0.16rem 0 0.02rem 0;
    line-height: 0.25rem;
  }
  a {
    text-decoration: none;
  }
}
</style>
