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
      @create-click="handleCreate"
      @delete-click="handleDelete"
      @edit-click="handleEdit"
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
import useContent from '@/mixins/useContent'
import useHeader from '@/mixins/useHeader'
import useDialog from '@/mixins/useDialog'
import { mapState } from 'vuex'
import { createDepartment, getDepartmentById, patchDepartment } from '@/services'

const viewConfig = {
  listPath: 'system/fetchDepartmentList',
  createFn: createDepartment,
  editFn: patchDepartment,
  deleteFn: getDepartmentById,
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
  mixins: [contentMixin, HeaderMixin, dialogMixin],
  methods: {
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
