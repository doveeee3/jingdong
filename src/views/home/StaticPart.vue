<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe628;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe600;</span>
    山姆会员商店优惠商品
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div
      class="icons__item"
      v-for="item in iconsList"
      :key="item.desc"
    >
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  @include ellipsis;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  .position__icon {
    position: relative;
    font-size: 0.2rem;
    top: 0.013rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.18rem;
    font-size: 0.2rem;
  }
  color: $content-fontcolor;
}
.search {
  margin-bottom: .12rem;
  line-height: 0.32rem;
  font-size: 0.14rem;
  color: $seach-fontColor;
  background: $search-bgColor;
  border-radius: 0.16rem;
  .iconfont {
    position: relative;
    top: 0.019rem;
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.18rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%; //是宽度的25.4%
  &__img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      font-size: 0.12rem;
      text-align: center;
      margin: 0.06rem 0 0.16rem 0;
      color: $content-fontcolor;
    }
  }
}

.gap {
  height: 0.1rem;
  background-color: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>
