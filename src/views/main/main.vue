<template>
  <div class="main">
    <el-container class="container">
      <el-aside class="aside" :width="isCollapse ? '60px' : '210px'">
        <MainAside ref="mainAsideRef" :menuList="mainStore.roleMenu" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <MainHeader :is-collapse="isCollapse" @change-collapse="onChangeCollapse" />
        </el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/main/main'
import MainAside from './cpns/mainAside.vue'
import MainHeader from './cpns/mainHeader.vue'
import { onMounted, ref } from 'vue'

const mainStore = useMainStore()
mainStore.fetchRoleMenu(localStorage.getItem('roleId'))

const mainAsideRef = ref()
const isCollapse = ref()
onMounted(() => {
  isCollapse.value = mainAsideRef.value.getCollapseState()
})

function onChangeCollapse() {
  isCollapse.value = !isCollapse.value
  mainAsideRef.value.setCollapseState(isCollapse.value)
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .container {
    height: 100%;
  }

  .aside {
    background-color: #0c2135;
    transition: width 0.2s ease-in-out;
  }

  .header {
    height: 48px;
  }

  .main {
    background-color: lightblue;
  }
}
</style>
