<template>
  <div class="dashboard">
    <el-row :gutter="10" class="top">
      <template v-for="(item, index) in statisticsData" :key="index">
        <el-col :sm="24" :md="12" :lg="6">
          <div class="panel">
            <div class="title">
              <div class="text">{{ item.title }}</div>
              <el-tooltip class="box-item" effect="light" :content="item.tips" placement="top">
                <el-icon><Warning /></el-icon>
              </el-tooltip>
            </div>
            <div ref="countup" :class="['content', { price: item.title === '商品总销售额' }]">
              {{ item.number1 }}
            </div>
            <div class="divider"></div>
            <div class="footer">
              <span class="text">{{ item.subtitle }}</span>
              <span ref="countup" :class="['count', { price: item.subtitle === '商品总销售额' }]">{{
                item.number2
              }}</span>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10" class="middel">
      <el-col :md="24" :lg="7">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品数量(饼图)</span>
            </div>
          </template>
          <PieChart :data="goodsCountList" />
        </el-card>
      </el-col>
      <el-col :md="24" :lg="10">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>不同城市商品销量</span>
            </div>
          </template>
          <MapChart :data="goodsAddressData" />
        </el-card>
      </el-col>
      <el-col :md="24" :lg="7">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品数量(玫瑰图)</span>
            </div>
          </template>
          <RosePieChart :data="goodsCountList" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="bottom">
      <el-col :md="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品的销量</span>
            </div>
          </template>
          <LineChart :data="goodsSaleData" />
        </el-card>
      </el-col>
      <el-col :md="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类商品收藏数量</span>
            </div>
          </template>
          <BarChart :data="goodsFavorData" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from '@/components/echart/barChart.vue'
import LineChart from '@/components/echart/lineChart.vue'
import MapChart from '@/components/echart/mapChart.vue'
import PieChart from '@/components/echart/pieChart.vue'
import RosePieChart from '@/components/echart/rosePieChart.vue'
import { CountUp } from 'countup.js'
import { mapState } from 'vuex'

export default {
  components: {
    PieChart,
    RosePieChart,
    LineChart,
    BarChart,
    MapChart,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('analysis', {
      statisticsData: (state) => state.statisticsData,
      goodsCountList: (state) => state.goodsCountList,
      goodsSaleData: (state) => state.goodsSaleData,
      goodsFavorData: (state) => state.goodsFavorData,
      goodsAddressData: (state) => state.goodsAddressData,
    }),
  },
  mounted() {
    this.$store.dispatch('analysis/getAnalysisDataAction').then(() => {
      this.$refs.countup.forEach((item) => {
        this.handleCountUp(item)
      })
    })
  },

  methods: {
    handleCountUp(el) {
      const options = {
        duration: 1,
      }
      if (el.className.includes('price')) options.prefix = '￥'
      const countup = new CountUp(el, el.textContent, options)
      if (!countup.error) {
        countup.start()
      } else {
        console.error(countup.error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.dashboard {
  .top {
    .panel {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 130px;
      margin-bottom: 20px;
      padding: 0 20px;
      background-color: #fff;

      .title {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: end;
        font-size: 14px;
        color: #8c8c8c;
      }

      .content {
        height: 53px;
        line-height: 53px;
        font-size: 26px;
      }

      .divider {
        height: 1px;
        background-color: #eee;
      }

      .footer {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 14px;
        letter-spacing: 1px;

        .count {
          margin-left: 5px;
        }
      }
    }
  }

  .middel {
    .el-col {
      margin-bottom: 20px;
      .el-card {
        .figure {
          height: 350px;
        }
      }
    }
  }

  .bottom {
    .el-col {
      margin-bottom: 20px;
    }
  }
}
</style>
