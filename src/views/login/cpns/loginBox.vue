<template>
  <div class="loginBox">
    <el-card :body-style="{ padding: 0 }">
      <el-tabs type="border-card" stretch>
        <el-tab-pane>
          <template #label>
            <div class="tabTitle">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <el-form
            ref="accountFormRef"
            :model="accountForm"
            :rules="accountRules"
            label-width="60"
            status-icon
            size="large"
          >
            <el-form-item label="帐号" prop="name">
              <el-input v-model="accountForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" show-password v-model="accountForm.password" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <div class="tabTitle">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <el-form label-width="60" status-icon size="large">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <div class="codeItem">
                <el-input />
                <el-button class="btn" type="primary">获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const accountFormRef = ref()
const accountForm = ref({
  name: localStorage.getItem('name') ?? 'coderjt',
  password: localStorage.getItem('password') ?? '123456',
})

function accountPass(rule, value, callback) {
  const regex = /^[a-zA-Z0-9]{6,20}$/
  if (value === '') {
    callback(new Error('请输入账号信息'))
  } else if (!regex.test(value)) {
    callback(new Error('账号必须是6到20个字母或数字'))
  } else {
    callback()
  }
}

function passwordPass(rule, value, callback) {
  const regex = /^\d{3,}$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!regex.test(value)) {
    callback(new Error('密码必须是3位以上的数字'))
  } else {
    callback()
  }
}

const accountRules = reactive({
  name: [{ required: true, validator: accountPass, trigger: 'blur' }],
  password: [{ required: true, validator: passwordPass, trigger: 'blur' }],
})

defineExpose({
  accountValidate: () => accountFormRef.value.validate,
  getLoginInfo: () => ({ ...accountForm.value }),
})
</script>

<style lang="less" scoped>
.loginBox {
  --el-box-shadow-light: 0px 0px 4px rgba(0, 0, 0, 0.12);

  .tabTitle {
    display: flex;
    align-items: center;

    .text {
      margin-left: 3px;
    }
  }

  .codeItem {
    display: flex;

    .btn {
      width: 112px !important;
      margin-left: 8px;
    }
  }
}
</style>
