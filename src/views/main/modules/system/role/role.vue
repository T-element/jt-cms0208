<template>
  <div class="role">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="roleList"
      :total-count="roleTotalCount"
      @pager-change="handlePagerChange"
      @delete-click="handleDeleteRole"
      @create-click="handleCreateRole"
    />
    <PageDialog
      ref="dialogRef"
      :option="dialogOption"
      @confirm-click="handleConfirmClick"
    />
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader.vue'
import PageContent from '@/components/pageContent.vue'
import PageDialog from '@/components/pageDialog.vue'
import headerOption from './options/headerOption'
import contentOption from './options/contentOption'
import dialogOption from './options/dialogOption'
import { mapState } from 'vuex'
import { createRole, deleteRoleById } from '@/services'

export default {
  components: {
    PageHeader,
    PageContent,
    PageDialog,
  },
  data() {
    return {
      headerOption,
      headerData: {
        name: '',
        intro: '',
        createAt: '',
      },
      contentOption,
      dialogOption,

      requestConfig: {
        offset: 0,
        size: 10,
      },
    }
  },
  computed: {
    ...mapState('system', {
      roleList: (state) => state.roleList,
      roleTotalCount: (state) => state.roleTotalCount,
    }),
  },

  methods: {
    handleQueryClick(prop) {
      this.$store.dispatch('system/fetchRoleList', prop)
    },
    handlePagerChange(prop) {
      this.requestConfig = {
        offset: --prop.currentPage * prop.size,
        size: prop.size,
      }
      this.$store.dispatch('system/fetchRoleList', this.requestConfig)
    },
    async handleDeleteRole(id) {
      const res = await deleteRoleById(id)
      if (res.data.code !== 0) {
        ElMessage({
          message: res.data.data,
          type: 'warning',
        })
      }
      this.$store.dispatch('system/fetchRoleList', this.requestConfig)
    },
    handleCreateRole() {
      this.$refs.dialogRef.setFormState({})
    },
    async handleConfirmClick(data, mode) {
      console.log(data)
      let res
      if (mode === 'create') {
        res = await createRole(data)
        this.$store.dispatch('system/fetchRoleList', this.requestConfig)
      } else if (mode === 'edit') {
        res = await patchUser(data)
        this.$store.dispatch('system/fetchRoleList', this.requestConfig)
      }
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
  },
  created() {
    this.$store.dispatch('system/fetchRoleList', this.requestConfig)
  },
}
</script>

<style lang="less" scoped>
.role {
  border-radius: 8px;
  overflow: hidden;
}
</style>
