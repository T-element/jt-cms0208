<template>
  <div class="department">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="departmentList"
      :total-count="departmentTotalCount"
      @pager-change="handlePagerChange"
      @create-click="handleCreateDepartment"
      @edit-click="handleEditDepartment"
      @delete-click="handleDeleteDepartment"
    >
      <template #leader="scoped">
        <span>
          {{ mapDepartmentByParentId(scoped.data.parentId) }}
        </span>
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
import {
  createDepartment,
  getDepartmentById,
  patchDepartment,
  deleteDepartmentById,
} from '@/services'

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
        leader: '',
        createAt: '',
      },
      contentOption,
      dialogOption,
      dialogData: {
        name: '',
        parentId: '',
        leader: '',
      },

      requestConfig: {
        offset: 0,
        size: 10,
      },
      parentDpm: new Map(),
    }
  },
  computed: {
    ...mapState('system', {
      departmentList: (state) => state.departmentList,
      departmentTotalCount: (state) => state.departmentTotalCount,
    }),
  },
  methods: {
    handlePagerChange(info) {
      let { currentPage, size } = info
      this.requestConfig.offset = --currentPage * size
      this.requestConfig.size = size
      this.$store.dispatch('system/fetchDepartmentList', this.requestConfig)
    },
    handleCreateDepartment() {
      this.$refs.dialogRef.setFormState({ ...this.dialogData })
    },
    async handleConfirmClick(data, mode) {
      let res
      if (mode === 'create') {
        res = await createDepartment(data)
        this.$store.dispatch('system/fetchDepartmentList', this.requestConfig)
      } else if (mode === 'edit') {
        res = await patchDepartment(data)
        this.$store.dispatch('system/fetchDepartmentList', this.requestConfig)
      }
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
    handleEditDepartment(info) {
      this.$refs.dialogRef.setFormState(info, 'edit')
    },
    async handleDeleteDepartment(info) {
      const res = await deleteDepartmentById(info)
      if (res.data.code !== 0) {
        ElMessage({
          message: res.data.data,
          type: 'warning',
        })
      }
      this.$store.dispatch('system/fetchDepartmentList', this.requestConfig)
    },
    handleQueryClick(info) {
      this.$store.dispatch('system/fetchDepartmentList', info)
    },

    mapDepartmentByParentId(id) {
      if (id === undefined || id === null) return
      const res = this.parentDpm.get(id)
      if (!res) {
        this.parentDpm.set(id, '/')
        getDepartmentById(id).then((res) => {
          this.parentDpm.set(id, res.data.data.name)
        })
      }
      return res
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

  created() {
    this.$store.dispatch('system/fetchDepartmentList', this.requestConfig).then(() => {
      this.setupDialogSelectOption(this.departmentList, '上级部门')
    })
  },
}
</script>

<style lang="less" scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>
