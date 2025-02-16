<template>
  <div class="goods">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="goodsList"
      :total-count="goodsTotalCount"
      @pager-change="handlePagerChange"
      @create-click="handleCreate"
      @delete-click="handleDelete"
      @edit-click="handleEdit"
    >
      <template #imgBox="scoped">
        <el-image
          class="tableImg"
          style="width: 60px; height: 80px"
          :src="scoped.data.imgUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scoped.data.imgUrl]"
          show-progress
          fit="contain"
          :preview-teleported="true"
        />
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
import { deleteGoodsById, createGoods, editGoods } from '@/services'

const viewConfig = {
  listPath: 'product/fetchGoodsInfo',
  createFn: createGoods,
  editFn: editGoods,
  deleteFn: deleteGoodsById,
  viewName: 'goods',
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
        address: '',
        status: '',
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
      goodsList: (state) => state.goodsList,
      goodsTotalCount: (state) => state.goodsTotalCount,
    }),
  },
  created() {
    const dispatch = this.$store.dispatch
    dispatch(viewConfig.listPath, this.requestConfig)
  },
}
</script>

<style lang="less" scoped>
.goods {
  border-radius: 8px;
  overflow: hidden;
}
</style>
