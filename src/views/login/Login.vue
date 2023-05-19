<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div :class="{ 'wrapper__input': true, 'checkusername': isActiveUsername }">
      <input class="wrapper__input__content" placeholder="用户名" v-model="username" />
    </div>
    <span class="check-message">{{ errorMessage.username }}</span>
    <div :class="{ 'wrapper__input': true, 'checkpassword': isActivePassword }">
      <input class="wrapper__input__content" placeholder="请输入密码" type="password" v-model="password"
        autocomplete="new-password" />
    </div>
    <span class="check-message">{{ errorMessage.password }}</span>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast :message="toastMessage" v-if="show" />
  </div>
</template>

<script>
import Schema from 'async-validator'
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { post } from '../../utils/request'
import login from '@/api/login'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const isActiveUsername = ref(false)
  const isActivePassword = ref(false)
  const errorMessage = reactive({
    username: '',
    password: ''
  })
  // 校验规则
  const descriptor = reactive({
    username: {
      required: true,
      message: '姓名不能为空'
    },
    password: [
      {
        required: true,
        message: '密码不能为空'
      }
    ]
  })

  const clearMessage = () => {
    for (const key in errorMessage) {
      errorMessage[key] = ''
    }
  }
  const validator = reactive(new Schema(descriptor))

  const handleLogin = async () => {
    if (data.username === '') {
      isActiveUsername.value = true
    }
    if (data.password === '') {
      isActivePassword.value = true
    }
    if (data.username !== '') {
      isActiveUsername.value = false
    }
    if (data.password !== '') {
      isActivePassword.value = false
    }
    clearMessage()
    validator.validate(data, {
      firstFields: true
    })
      .then(() => {
        // 校验通过
      })
      .catch(({ errors }) => {
        // 校验未通过
        // 显示错误信息
        for (const { field, message } of errors) {
          errorMessage[field] = message
        }
      })

    try {
      // const result = await post('/api/user/login', {
      //   username: data.username,
      //   password: data.password
      // })
      await login(data)
      if (data.username !== 'admin' || data.password !== '123456') {
        data.username = ''
        data.password = ''
        showToast('用户名或密码错误')
      }
      if (data.username === 'admin' && data.password === '123456') {
        localStorage.isLogin = true
      }
      // localStorage.isLogin = true
      router.push({ name: 'Home' })
    } catch (e) {
      console.log(e)
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin, isActiveUsername, isActivePassword, errorMessage }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin, isActiveUsername, isActivePassword, errorMessage } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()
    return {
      username, password, handleLogin, handleRegisterClick, show, toastMessage, isActiveUsername, isActivePassword, errorMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    height: .66rem;
    width: .66rem;
    margin: 0 auto .4rem auto;
  }

  &__input {
    height: .48rem;
    background: #F9F9F9;
    border: .01rem solid rgba(0, 0, 0, 0.10);
    border-radius: .06rem;
    margin: .16rem .4rem 0 .4rem;
    padding: 0 .16rem;

    &__content {
      margin-top: .13rem;
      border: none;
      outline: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;
      line-height: .22rem;
      background: none;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__login-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    font-size: .16rem;
    color: $bgColor;
    text-align: center;
  }

  &__login-link {
    font-size: .14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}

.check-message {
  color: #d03050;
  display: block;
  margin: .03rem .4rem 0;
  font-size: .15rem;
}

.checkpassword,
.checkusername {
  border: 2px solid #d03050 !important;
}
</style>
