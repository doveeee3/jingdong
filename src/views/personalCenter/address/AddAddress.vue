<template>
  <div class="wrapper">
    <div class="header">
      <div class="iconfont header__back" @click="$router.back()">&#xe7e0;</div>
      <div class="header__title">新建收货地址</div>
      <div class="header__new">保存</div>
    </div>
    <div class="address">
      <div class="address__item">
        <span class="address__item__text">所在城市：</span>
        <input type="text" class="address__item__input" placeholder="如北京市">
      </div>
      <div class="address__item">
        <span class="address__item__text">小区/大厦/学校：</span>
        <input type="text" class="address__item__input" placeholder="如理工大学国防科技园">
      </div>
      <div class="address__item">
        <span class="address__item__text">楼号-门牌号：</span>
        <input type="text" class="address__item__input" placeholder="A号楼B层">
      </div>
      <div class="address__item">
        <span class="address__item__text">收货人：</span>
        <input type="text" class="address__item__input" placeholder="请填写收货人的姓名">
      </div>
      <div class="address__item">
        <span class="address__item__text">联系电话：</span>
        <input type="text" class="address__item__input" placeholder="请填写收货手机号">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddAddress',
  setup() {
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
  margin-bottom: .12rem;
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

.address {
  background-color: #fff;
  padding: 0 .18rem;
  &__item {
    padding: .12rem 0;
    font-size: .14rem;
    color: #666666;
    line-height: .2rem;
    border-bottom: .01rem solid #F1F1F1;
    &__input {
      border: none;
      outline: none;
      color: #999;
    }
  }
  &__item:last-child {
    border: none;
  }
}
</style>
