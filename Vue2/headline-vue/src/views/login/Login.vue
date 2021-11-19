<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      fixed
      placeholder
      safe-area-inset-top
      :border="false"
    />

    <!-- 登录的表单 -->
    <van-form @submit="login">
      <van-field
        v-model="form.mobile"
        name="mobile"
        type="tel"
        label="手机号码"
        placeholder="请输入手机号码"
        required
        :rules="rules.mobile"
      ></van-field>
      <van-field
        v-model="form.code"
        type="password"
        name="code"
        label="登录密码"
        placeholder="请输入登录密码"
        required
        :rules="rules.code"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/loginAPI.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确手机号',
            trigger: 'onBlur'
          }
        ],
        code: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['updateTokenInfo']),
    async login() {
      const { data: res } = await loginAPI(this.form)
      if (res.message === 'OK') {
        this.updateTokenInfo(res.data)
        this.$router.push('/')
        // 1.把登录结果存放到vuex中
        // 2.跳转到首页
      }
    }
  }
}
</script>

<style></style>
