<template>
   <div class="login-page">
  <van-nav-bar
  title="面经登陆"

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
<router-link to='/register' class="link">没账号？点此注册</router-link>

</van-form>
  </div>
</template>

<script>
import { Login } from '@/api/user'
import { setToken } from '@/utils/storage'
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await Login(values)
        setToken(res.data.token)
        this.$toast.success('登陆成功')
        this.$router.push('/')
      } catch (error) {

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
