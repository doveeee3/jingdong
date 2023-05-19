<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList"
      :class="{ 'docker__item': true, 'docker__item--active': index === currentIndex }" :key="item.icon">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      { icon: '&#xe867;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe645;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe6ab;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe65f;', text: '我的', to: { name: 'PersonalCenter' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";

.docker {
  padding: 0 0.18rem;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 0.49rem;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  color: $content-fontcolor;

  &__item {
    flex: 1;
    text-align: center;

    a {
      color: $content-fontcolor;
      text-decoration: none;
    }

    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }

    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }

  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
