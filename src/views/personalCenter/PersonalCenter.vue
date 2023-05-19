<template>
  <div class="top">
    <div class="top__userInfo">
      <div class="top__userInfo__avatar">
        <img src="" alt="">
      </div>
      <div class="top__userInfo__name">{{ list.username }}</div>
      <span class="top__userInfo__id">ID:{{ list._id }}</span>
      <div class="top__userInfo__discounts">
        <div class="top__userInfo__discount" v-for="(item, index) in ticketList" :key="index">
          <div class="top__userInfo__title">{{ item.name }}</div>
          <div class="top__userInfo__number">{{ item.number }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="content__item">
      <div class="content__item__icon iconfont content__item__hongbao">&#xe65d;</div>
      <div class="content__item__title">我的红包</div>
      <div class="content__item__back iconfont">&#xe7e0;</div>
    </div>
    <div class="content__item" @click="handleAddress">
      <div class="content__item__icon iconfont content__item__address">&#xe632;</div>
      <div class="content__item__title">我的地址</div>
      <div class="content__item__back iconfont">&#xe7e0;</div>
    </div>
    <div class="content__item">
      <div class="content__item__icon iconfont content__item__help">&#xe612;</div>
      <div class="content__item__title">客服与帮助</div>
      <div class="content__item__back iconfont">&#xe7e0;</div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>
<script>
import { toRefs, reactive } from 'vue'
import Docker from '../../components/Docker.vue'
import { person } from '@/api/person'
import router from '@/router'

const useUserInfoListEffect = () => {
  const userInfo = reactive({ list: [] })
  const getUserInfoList = async () => {
    const result = await person()
    userInfo.list = result
  }
  getUserInfoList()
  const { list } = toRefs(userInfo)
  return { list }
}

const useClickEffect = () => {
  const handleAddress = () => {
    router.push({ name: 'AddressList' })
  }
  return handleAddress
}
export default {
  name: 'PersonalCenter',
  components: { Docker },
  setup() {
    const ticketList = [
      { name: '红包', number: 128 },
      { name: '优惠券', number: '12张' },
      { name: '鲜豆', number: 88 },
      { name: '白条', number: 1000 }
    ]
    const { list } = useUserInfoListEffect()
    const handleAddress = useClickEffect()
    return { list, ticketList, handleAddress }
  }
}
</script>
<style lang="scss" scoped>
.top {
  height: 1.44rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  padding: .9rem .18rem 0 .18rem;

  &__userInfo {
    position: relative;
    background: #FFFFFF;
    box-shadow: 0 .08rem .16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: .08rem;
    padding-top: .6rem;

    &__avatar {
      position: absolute;
      top: -.47rem;
      left: 50%;
      margin-left: -.47rem;
      height: .94rem;
      width: .94rem;
      border-radius: 50%;
      background-color: #FFF;
    }

    &__name {
      line-height: .36rem;
      font-size: .24rem;
      color: #262628;
      letter-spacing: .0019rem;
      text-align: center;
    }

    &__id {
      display: block;
      padding: .02rem 0 .12rem 0;
      line-height: .2rem;
      font-size: .14rem;
      color: #C1C0C9;
      letter-spacing: .0019rem;
      text-align: center;
    }

    &__discounts {
      display: flex;
      border-top: .01rem solid #f1f1f1;
      padding: .12rem .28rem .16rem .28rem;
    }

    &__discount {
      flex: 1;
      text-align: center;
    }

    &__title {
      margin-bottom: .03rem;
      font-size: .12rem;
      line-height: .17rem;
      color: #C1C0C9;
    }

    &__number {
      font-size: .2rem;
      line-height: .28rem;
      color: #262628;
    }
  }
}

.content {
  margin: .77rem .18rem 0 .18rem;
  background: #FFFFFF;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  &__item {
    display: flex;
    line-height: .22rem;
    padding: .16rem .16rem .08rem;

    &__icon {
      margin-right: .12rem;
      font-size: .22rem;
    }

    &__title {
      font-size: .14rem;
      color: #262626;
    }

    &__back {
      flex: 1;
      transform: rotate(180deg);
    }

    &__hongbao {
      color: #ED4A47;
    }

    &__address {
      color: #32C5FF;
    }

    &__help {
      color: rgba(144, 19, 254, 0.92);
    }
  }

  &__item:last-child {
    padding-bottom: .16rem;
  }
}
</style>
