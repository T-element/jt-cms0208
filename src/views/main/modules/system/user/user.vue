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
      @create-user-click="handleCreateUser"
      @delete-user-click="handleDeleteUser"
      @edit-user-click="handleEditUser"
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
import { mapState } from 'vuex'
import { createUser, deleteUserById, patchUser } from '@/services'

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
    handlePagerChange(prop) {
      this.requestConfig = {
        offset: --prop.currentPage * prop.size,
        size: prop.size,
      }
      this.$store.dispatch('system/fetchUserList', this.requestConfig)
    },
    handleCreateUser() {
      this.$refs.dialogRef.setFormState({ ...this.dialogData })
    },
    async handleDeleteUser(id) {
      const res = await deleteUserById(id)
      if (res.data.code !== 0) {
        ElMessage({
          message: res.data.data,
          type: 'warning',
        })
      }
      this.$store.dispatch('system/fetchUserList', this.requestConfig)
    },
    handleEditUser(data) {
      this.$refs.dialogRef.setFormState(data, 'edit')
    },
    async handleConfirmClick(data, mode) {
      let res
      if (mode === 'create') {
        res = await createUser(data)
        this.$store.dispatch('system/fetchUserList', this.requestConfig)
      } else if (mode === 'edit') {
        res = await patchUser(data)
        this.$store.dispatch('system/fetchUserList', this.requestConfig)
      }
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
    handleQueryClick(data) {
      this.$store.dispatch('system/fetchUserList', data)
    },

    setupDialogSelectOption(list, targetLabel) {
      const selectOptions = list.map((item) => {
        return { label: item.name, value: item.id }
      })
      const index = this.dialogOption.formOption.findIndex(
        (item) => item.label === targetLabel,
      )
      this.dialogOption.formOption[index].selectOptions = selectOptions
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
