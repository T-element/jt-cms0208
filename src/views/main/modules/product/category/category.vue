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
import useContent from '@/mixins/useContent'
import useHeader from '@/mixins/useHeader'
import useDialog from '@/mixins/useDialog'
import { mapState } from 'vuex'
import { deleteCategoryById, createCategory, editCategory } from '@/services'

const viewConfig = {
  listPath: 'product/fetchCategoryInfo',
  createFn: createCategory,
  editFn: editCategory,
  deleteFn: deleteCategoryById,
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
}
</script>

<style lang="less" scoped>
.category {
  border-radius: 8px;
  overflow: hidden;
}
</style>
