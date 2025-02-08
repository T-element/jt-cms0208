<template>
  <div class="mainAside">
    <div class="logo">
      <img src="@/assets/img/logo.svg" class="icon" />
      <h4 class="text">Coderwhy-CMS</h4>
    </div>
    <el-menu :default-active="defaultActive" text-color="#fff" :collapse="isCollapse">
      <template v-for="(item, index) in menuList" :key="index">
        <el-sub-menu :index="index + ''">
          <template #title>
            <el-icon><component :is="item.icon.split('-icon-')[1]" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(iten, indey) in item.children" :key="indey">
            <el-menu-item :index="`${index}-${indey}`" @click="onMenuListClick(iten.url)">
              {{ iten.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, toRaw } from 'vue'

const props = defineProps({
  menuList: {
    type: Array,
    required: true,
  },
  defaultActive: {
    type: String,
    default: '0-0',
  },
})

const isCollapse = ref(false)
function setCollapseState(state) {
  isCollapse.value = state
}

function onMenuListClick(url) {
  router.push(url)
}

defineExpose({
  getCollapseState: () => toRaw(isCollapse.value),
  setCollapseState,
})
</script>

<style lang="less" scoped>
.mainAside {
  overflow: hidden;

  .logo {
    display: flex;
    align-items: center;
    padding: 12px 10px 8px;
    color: #fff;
    cursor: pointer;
    width: 210px;

    .icon {
      width: 28px;
      margin: 0 12px 0 10px;
    }
  }

  .el-menu {
    border: none;
    background-color: #0c2135;
    .is-active {
      span {
        color: #389aff;
      }
    }

    .el-sub-menu {
      :deep(.el-sub-menu__title) {
        color: #9ba3ab;

        &:hover {
          background-color: #0c2135;
        }
      }

      &.is-active {
        .el-icon svg {
          color: #389aff;
        }
      }

      .el-menu-item {
        color: #9ba3ab;
        padding-left: 50px;
        background-color: #0c2135;

        &:hover {
          color: #fff;
        }

        &.is-active {
          background-color: #0a60bd;
          color: #fff;
        }
      }
    }
  }

  :global(.el-menu-item:hover) {
    color: #fff !important;
  }

  :global(.el-menu) {
    --el-menu-bg-color: #0c2135 !important;
    --el-menu-hover-bg-color: #0c2135 !important;
    --el-menu-text-color: #9ba3ab !important;
  }
}
</style>
