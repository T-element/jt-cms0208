<template>
  <div class="pageContent">
    <div class="header">
      <div class="title">{{ headerOption.title }}</div>
      <el-button class="createUser" type="primary" size="large" @click="onCreateBtnClick">
        {{ headerOption.btnName }}
      </el-button>
    </div>
    <div class="content">
      <el-table
        :data="data"
        border
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        size="large"
        :tree-props="{ children: 'children' }"
        row-key="id"
      >
        <template v-for="(item, index) in tableOption" :key="index">
          <el-table-column v-bind="item">
            <template v-if="item.type === 'createDate'" #="scoped">
              <div>{{ formatDate(scoped.row.createAt) }}</div>
            </template>
            <template v-else-if="item.type === 'updateDate'" #="scoped">
              <div>{{ formatDate(scoped.row.updateAt) }}</div>
            </template>
            <template v-else-if="item.type === 'operation'" #="scoped">
              <div class="btns">
                <el-button
                  type="primary"
                  size="small"
                  text
                  @click="onEditClick(scoped.row)"
                >
                  <el-icon><Edit style="margin-top: 1px" /></el-icon>
                  <span> 编辑</span>
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  text
                  @click="onDeleteClick(scoped.row.id)"
                >
                  <el-icon><Delete /></el-icon>
                  <span> 删除</span>
                </el-button>
              </div>
            </template>
            <template v-else-if="item.type === 'custom'" #="scoped">
              <slot :name="item.slotName" :data="scoped.row"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="paginationConfig.currentPage"
        v-model:page-size="paginationConfig.size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="debouncePagerChange"
        @current-change="debouncePagerChange"
      />
    </div>
  </div>
</template>

<script>
import debounce from '@/utils/debounce'
import { formatDate } from '@/utils/formatDate'

export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      required: true,
      default: [
        {
          name: 'test',
          createAt: '2021-01-02T10:01:52.000Z',
          updateAt: '2021-01-02T10:01:52.000Z',
        },
      ],
    },
    totalCount: {
      type: Number,
      default: 10,
    },
  },

  data() {
    return {
      paginationConfig: {
        currentPage: 1,
        size: 10,
      },
      debouncePagerChange: null,
    }
  },
  computed: {
    headerOption() {
      return this.$props.option.header
    },
    tableOption() {
      return this.$props.option.content.tableOption
    },
  },
  created() {
    this.debouncePagerChange = debounce(this.handlePagerChange, 100)
  },
  emits: ['pagerChange', 'createClick', 'deleteClick', 'editClick'],
  methods: {
    onCreateBtnClick() {
      this.$emit('createClick')
    },
    onEditClick(data) {
      this.$emit('editClick', { ...data })
    },
    onDeleteClick(id) {
      this.$emit('deleteClick', id)
    },
    handlePagerChange() {
      this.$emit('pagerChange', { ...this.paginationConfig })
    },
    formatDate,
  },
}
</script>

<style lang="less" scoped>
.pageContent {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    margin-bottom: 5px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .createUser {
      margin: 0 10px;
    }
  }

  .content {
    .btns {
      .el-button {
        padding: 7px 0;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
}
</style>
