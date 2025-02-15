<template>
  <div class="mainHeader">
    <div class="left">
      <el-button text @click="onCollapseBtnClick">
        <template #icon>
          <el-icon size="25"><component :is="isCollapse ? 'Fold' : 'Expand'" /></el-icon>
        </template>
      </el-button>
      <el-breadcrumb :separator-icon="ArrowRight">
        <template v-for="(item, index) in Breadcrumbdata" :key="index">
          <el-breadcrumb-item :to="{ path: index === 0 ? '' : item.path }">
            {{ item.name }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button text>
        <template #icon>
          <el-icon size="20"><component is="Bell" /></el-icon>
        </template>
      </el-button>
      <el-button text>
        <template #icon>
          <el-icon size="20"><component is="ChatLineRound" /></el-icon>
        </template>
      </el-button>
      <el-badge is-dot :offset="[-10, 8]">
        <el-button text>
          <template #icon>
            <el-icon size="20"><component is="Postcard" /></el-icon>
          </template>
        </el-button>
      </el-badge>
      <el-dropdown>
        <div class="userInfo">
          <img
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
            alt=""
            class="icon"
          />
          <div class="text">{{ username }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onLogoutBtnClick">
              <el-icon><CircleClose /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import useMainStore from '@/stores/main/main'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const mainStore = useMainStore()

defineProps({
  isCollapse: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['changeCollapse'])
function onCollapseBtnClick() {
  emit('changeCollapse')
}

const username = localStorage.getItem('name')

function onLogoutBtnClick() {
  mainStore.firstView = true
  router.push('/login')
}

const route = useRoute()
let currentPath = route.path
const Breadcrumbdata = ref([])
watch(route, (newValue) => {
  console.log(newValue)
  currentPath = route.path
  Breadcrumbdata.value.length = 0
  handleBreadcrumbData(mainStore.roleMenu)
})
function handleBreadcrumbData(data) {
  if (data === null || data === undefined || !Array.isArray(data)) return data

  data.forEach((item) => {
    if (currentPath.includes(item.url)) {
      Breadcrumbdata.value.push({ name: item.name, path: item.url })

      if ('children' in item) handleBreadcrumbData(item.children)
    }
  })
}
handleBreadcrumbData(mainStore.roleMenu)
</script>

<style lang="less" scoped>
.mainHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;

    .el-button + .el-button {
      margin: 0;
    }

    .userInfo {
      display: flex;
      align-items: center;
      margin: 0 20px;
      cursor: pointer;

      .icon {
        width: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }

    :global(.el-dropdown-menu__item) {
      padding: 10px 18px;
    }
  }
}
</style>
