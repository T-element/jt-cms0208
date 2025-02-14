<template>
  <div class="category">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="categoryList"
      :total-count="categoryTotalCount"
      @pager-change="handlePagerChange"
      @create-click="handleCreate"
      @delete-click="handleDelete"
      @edit-click="handleEdit"
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
import { deleteCategoryById, createCategory, editCategory } from '@/services'

const viewConfig = {
  listPath: 'product/fetchCategoryInfo',
  createFn: createCategory,
  editFn: editCategory,
  deleteFn: deleteCategoryById,
}

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
        createAt: '',
      },
      contentOption,
      dialogOption,

      requestConfig: {
        offset: 0,
        size: 10,
      },
      queryConfig: {},
    }
  },
  computed: {
    ...mapState('product', {
      categoryList: (state) => state.categoryList,
      categoryTotalCount: (state) => state.categoryTotalCount,
    }),
  },
  created() {
    const dispatch = this.$store.dispatch
    dispatch(viewConfig.listPath, this.requestConfig)
  },
  methods: {
    handlePagerChange(prop) {
      this.requestConfig = {
        offset: --prop.currentPage * prop.size,
        size: prop.size,
      }
      this.$store.dispatch(viewConfig.listPath, { ...this.requestConfig, ...queryConfig })
    },
    handleCreate() {
      this.$refs.dialogRef.setFormState({})
    },
    async handleDelete(id) {
      const res = await viewConfig.deleteFn(id)
      if (res.data.code !== 0) {
        ElMessage({
          message: res.data.data,
          type: 'warning',
        })
      }
      this.$store.dispatch(viewConfig.listPath, { ...this.requestConfig, ...queryConfig })
    },
    handleEdit(data) {
      this.$refs.dialogRef.setFormState(data, 'edit')
    },
    async handleConfirmClick(data, mode) {
      console.log(data, mode)
      let res
      if (mode === 'create') {
        res = await viewConfig.createFn(data)
      } else if (mode === 'edit') {
        res = await viewConfig.editFn(data)
      }
      this.$store.dispatch(viewConfig.listPath, { ...this.requestConfig, ...queryConfig })
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
    handleQueryClick(data) {
      this.queryConfig = { ...data }
      this.$store.dispatch(viewConfig.listPath, {
        ...this.requestConfig,
        ...data,
      })
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
.category {
  border-radius: 8px;
  overflow: hidden;
}
</style>
