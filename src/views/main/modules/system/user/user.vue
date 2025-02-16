<template>
  <div class="user">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="userList.list"
      :total-count="userList.totalCount"
      @pager-change="handlePagerChange"
      @create-click="handleCreate"
      @delete-click="handleDelete"
      @edit-click="handleEdit"
    >
      <template #enable="scoped">
        <el-button
          :type="scoped.data.enable === 1 ? 'success' : 'danger'"
          size="small"
          plain
          @click="onEnableBtnClick(scoped)"
        >
          {{ scoped.data.enable === 1 ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
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
import useContent from '@/mixins/useContent'
import useHeader from '@/mixins/useHeader'
import useDialog from '@/mixins/useDialog'
import { mapState } from 'vuex'
import { createUser, deleteUserById, patchUser } from '@/services'

const viewConfig = {
  listPath: 'system/fetchUserList',
  createFn: createUser,
  editFn: patchUser,
  deleteFn: deleteUserById,
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
        realname: '',
        cellphone: '',
        enable: '',
        createAt: '',
      },
      contentOption,
      dialogOption,
      dialogData: {
        name: '',
        realname: '',
        password: '',
        cellphone: '',
        departmentId: '',
        roleId: '',
      },

      requestConfig: null,
      queryConfig: {},
    }
  },
  computed: {
    ...mapState('system', {
      userList: (state) => state.userList,
      roleList: (state) => state.roleList,
      departmentList: (state) => state.departmentList,
    }),
  },
  created() {
    const dispatch = this.$store.dispatch
    dispatch('system/fetchUserList')
    const request1 = dispatch('system/fetchRoleList')
    const request2 = dispatch('system/fetchDepartmentList')
    Promise.all([request1, request2]).then(() => {
      this.setupDialogSelectOption(this.roleList, '选择角色')
      this.setupDialogSelectOption(this.departmentList, '选择部门')
    })
  },
  methods: {
    onEnableBtnClick(prop) {
      prop.data.enable === 1 ? (prop.data.enable = 0) : (prop.data.enable = 1)
    },
    handleEditUser(data) {
      this.$refs.dialogRef.setFormState(data, 'edit')
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
