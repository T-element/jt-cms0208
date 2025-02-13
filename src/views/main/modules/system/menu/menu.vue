<template>
  <div class="menu">
    <PageContent :option="contentOption" :data="menuList">
      <template #menuIcon="scoped">
        <el-icon v-if="scoped.data.icon" size="20">
          <component :is="scoped.data.icon.split('-icon-')[1]" />
        </el-icon>
      </template>
    </PageContent>
  </div>
</template>

<script>
import PageContent from '@/components/pageContent.vue'
import contentOption from './options/contentOption'
import { mapState } from 'vuex'

export default {
  components: {
    PageContent,
  },
  data() {
    return {
      contentOption,
    }
  },
  computed: {
    ...mapState('system', {
      menuList: (state) => state.menuList,
    }),
  },
  created() {
    this.$store.dispatch('system/fetchMenuList')
  },
}
</script>

<style lang="less" scoped>
.menu {
  border-radius: 8px;
  overflow: hidden;
}
</style>
