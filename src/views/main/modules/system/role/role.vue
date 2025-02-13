<template>
  <div class="role">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader.vue'
import headerOption from './options/headerOption'

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      headerOption,
      headerData: {
        name: '',
        intro: '',
        createAt: '',
      },

      requestConfig: {
        offset: 0,
        size: 10,
      },
    }
  },
  methods: {
    handleQueryClick(prop) {
      this.$store.dispatch('system/fetchRoleList', prop)
    },
  },
}
</script>

<style lang="less" scoped>
.role {
  border-radius: 8px;
  overflow: hidden;
}
</style>
