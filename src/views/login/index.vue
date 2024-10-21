<template>
  <div>
    <van-nav-bar title="会员登陆" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getiDentifyingCode()">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="smsCode">
          <button @click="getCode()">{{secend === 60 ? '获取验证码': secend + '秒后重新发送'}}</button>
        </div>
      </div>

      <div @click="login(mobile, smsCode)" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 导入请求函数
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来要求传递的图形验证码唯一标识
      picUrl: '/src/assets/code.png', // 存储请求渲染的图片地址
      totalSecend: 60, // 总秒数
      secend: 60, // 倒计时秒数
      timer: null,
      mobile: '', // 手机号 15751776629
      smsCode: '' // 246810
    }
  },
  created () {
    // 一进入页面就获取验证码
    this.getiDentifyingCode()
    // this.$toast('获取验证码成功')
  },
  methods: {
    // 获取图形
    async getiDentifyingCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picKey = key
      this.picUrl = base64
    },
    // 验证码倒计时
    async getCode () {
      if (!this.checkiDentifyingCode()) return
      if (this.secend === this.totalSecend && !this.timer) {
        // 发送请求获取验证码
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')
        console.log(res)
        this.timer = setInterval(() => {
          this.secend--
          if (this.secend < 1) {
            clearInterval(this.timer)
            this.secend = this.totalSecend
            this.timer = null
          }
        }, 1000)
      }
    },
    // 检查验证码是否正确
    checkiDentifyingCode () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    // 登录校验
    async login (mobile, smsCode) {
      if (!this.checkiDentifyingCode()) return
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的验证码')
        return
      }
      const res = await codeLogin(mobile, smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast.success('登录成功')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  // 离开页面销毁定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
