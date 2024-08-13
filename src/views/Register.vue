<template>
  <div class="login-page">
  <van-nav-bar
  title="面经注册"

/>
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="username"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' },
    { pattern:/\w{5,}/, message: '至少5为字符' }
    ]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button  block type="primary" native-type="submit">提交</van-button>
  </div>
<router-link to='/login' class="link">有账号？点此登录</router-link>

</van-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'Register-Page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        await register(values)
        this.$toast.success('注册成功，请登录')
        this.$router.push('/login')
      } catch (error) {
        // this.$toast.fail(error.response.data.message)
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
