<template>
  <div class="main">
    <el-container class="container">
      <el-aside class="aside" :width="!!isCollapse ? '60px' : '210px'">
        <MainAside
          ref="mainAsideRef"
          :menuList="mainStore.roleMenu"
          :default-active="currentActive"
        />
      </el-aside>
      <el-container>
        <el-header class="header">
          <MainHeader :is-collapse="!!isCollapse" @change-collapse="onChangeCollapse" />
        </el-header>
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/main/main'
import MainAside from './cpns/mainAside.vue'
import MainHeader from './cpns/mainHeader.vue'
import { computed, onMounted, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const mainStore = useMainStore()
const { roleMenu } = mainStore

const mainAsideRef = ref()
const isCollapse = ref()
onMounted(() => {
  isCollapse.value = mainAsideRef.value.getCollapseState()
})

function onChangeCollapse() {
  isCollapse.value = !isCollapse.value
  mainAsideRef.value.setCollapseState(isCollapse.value)
}

const route = useRoute()
function changeCurrentActive() {
  console.log('changeCurrentActive')
  const currentActiveArr = []
  for (let i = 0; i < roleMenu.length; i++) {
    if (route.path.includes(roleMenu[i].url)) {
      currentActiveArr.push(i.toString())
      for (let j = 0; j < roleMenu[i].children.length; j++) {
        if (route.path === roleMenu[i].children[j].url) {
          currentActiveArr.push(j.toString())
          break
        }
      }
      break
    }
  }
  return currentActiveArr.join('-')
}

const currentActive = computed(() => {
  return changeCurrentActive(route.path)
})
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
    background-color: #eff1f4;
  }
}
</style>
