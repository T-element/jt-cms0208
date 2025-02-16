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
      @create-click="handleCreate"
      @delete-click="handleDelete"
      @edit-click="handleEdit"
    />
    <PageDialog
      ref="dialogRef"
      :option="dialogOption"
      @confirm-click="handleConfirmClick"
    >
      <template #menuList="scoped">
        <el-tree
          ref="elTreeRef"
          style="max-width: 600px"
          :data="menuList"
          :props="elTreeProps"
          node-key="id"
          show-checkbox
        />
      </template>
    </PageDialog>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader.vue'
import PageContent from '@/components/pageContent.vue'
import PageDialog from '@/components/pageDialog.vue'
import headerOption from './options/headerOption'
import contentOption from './options/contentOption'
import dialogOption from './options/dialogOption'
import useContent from '@/mixins/useContent'
import useHeader from '@/mixins/useHeader'
import useDialog from '@/mixins/useDialog'
import { mapState } from 'vuex'
import { createRole, deleteRoleById, getRoleMenuIds, patchRole } from '@/services'

const viewConfig = {
  listPath: 'system/fetchRoleList',
  createFn: createRole,
  editFn: patchRole,
  deleteFn: deleteRoleById,
}
const contentMixin = useContent(viewConfig)
const HeaderMixin = useHeader(viewConfig)
const dialogMixin = useDialog(viewConfig)

export default {
  components: {
    PageHeader,
    PageContent,
    PageDialog,
  },
  mixins: [contentMixin, HeaderMixin, dialogMixin],
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
      elTreeProps: {
        label: 'name',
        children: 'children',
      },
    }
  },
  computed: {
    ...mapState('system', {
      roleList: (state) => state.roleList,
      roleTotalCount: (state) => state.roleTotalCount,
      menuList: (state) => state.menuList,
    }),
  },

  methods: {
    async handleConfirmClick(data, mode) {
      data.menuList = this.$refs.elTreeRef.getCheckedKeys(false)
      console.log(data)
      let res
      if (mode === 'create') {
        res = await createRole(data)
        this.$store.dispatch('system/fetchRoleList', this.requestConfig)
      } else if (mode === 'edit') {
        res = await patchRole(data)
        this.$store.dispatch('system/fetchRoleList', this.requestConfig)
      }
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
    async handleEditRole(data) {
      console.log(data)
      this.$refs.dialogRef.setFormState(data, 'edit')
      const res = await getRoleMenuIds(data.id)
      this.$refs.elTreeRef.setCheckedKeys(res.data.data.menuIds)
    },

    formatMenuItem(data) {
      if (data === null || data === undefined || typeof data !== 'object') return data
      let cache
      if (Array.isArray(data)) {
        cache = []
        for (let key in data) {
          cache[key] = this.formatMenuItem(data[key])
        }
        return cache
      } else {
        cache = {}
        for (let key in data) {
          if (key === 'name') {
            cache['label'] = data[key]
          } else if (key === 'children') {
            cache[key] = this.formatMenuItem(data[key])
          }
        }
        return cache
      }
    },
  },
  created() {
    this.$store.dispatch('system/fetchRoleList', this.requestConfig)
    this.$store.dispatch('system/fetchMenuList', this.requestConfig)
  },
}
</script>

<style lang="less" scoped>
.role {
  border-radius: 8px;
  overflow: hidden;
}
</style>
