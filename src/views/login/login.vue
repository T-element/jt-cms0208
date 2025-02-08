<template>
  <div class="login">
    <div class="loginPanel">
      <h1 class="title">后台管理系统</h1>
      <!-- 引入 LoginBox 组件 -->
      <LoginBox ref="loginBoxRef" />
      <div class="pwdOperateBar">
        <div class="rmbPwd">
          <!-- 记住密码复选框 -->
          <el-checkbox v-model="isRemPwd" label="记住密码" />
        </div>
        <div class="forgetPwd">
          <!-- 忘记密码链接，点击后刷新页面 -->
          <el-link type="primary" @click="onForgetPwdClick">忘记密码</el-link>
        </div>
      </div>
      <!-- 登录按钮，点击后触发 onLoginBtnClick 函数 -->
      <el-button type="primary" size="large" @click="onLoginBtnClick">立即登录</el-button>
    </div>
  </div>
</template>

<script setup>
import LoginBox from './cpns/loginBox.vue'
import { loginRequest } from '@/services'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isRemPwd = ref(JSON.parse(localStorage.getItem('isRemPwd')) ?? false)
watch(isRemPwd, (newValue) => {
  localStorage.setItem('isRemPwd', newValue)
})

function onForgetPwdClick() {
  location.reload()
}

const loginBoxRef = ref()
function onLoginBtnClick() {
  loginBoxRef.value.accountValidate()((valid) => {
    if (valid) {
      const loginInfo = loginBoxRef.value.getLoginInfo()
      loginRequest({ ...loginInfo })
        .then((res) => {
          if (isRemPwd.value) {
            console.log(loginInfo)
            localStorage.setItem('name', loginInfo.name)
            localStorage.setItem('password', loginInfo.password)
          } else {
            localStorage.removeItem('name')
            localStorage.removeItem('password')
          }
          localStorage.setItem('login/token', res.data.data.token)
          localStorage.setItem('roleId', res.data.data.id)

          router.push('/main')
        })
        .catch((err) => {
          console.log(err)
          ElMessage({
            message: err.response.data,
            type: 'error',
            customClass: 'errorMessage',
            offset: 40,
          })
        })
    } else {
      ElMessage({
        message: '请正确填写帐号或者密码',
        type: 'error',
        customClass: 'errorMessage',
        offset: 40,
      })
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/img/login-bg.svg');

  .loginPanel {
    width: 330px;
    margin-bottom: 150px;

    .title {
      margin: 20px 0;
      text-align: center;
    }

    .pwdOperateBar {
      --el-checkbox-height: auto;

      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0;

      .rmbPwd,
      .forgetPwd {
        line-height: 1;
      }

      .rmbPwd {
        margin-top: 3px;
      }
    }

    :deep(.el-button) {
      width: 100%;
    }
  }
}

:global(.errorMessage) {
  width: 380px;
  height: 48px;
}
</style>
