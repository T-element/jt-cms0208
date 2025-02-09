<template>
  <div class="overview">
    <el-card>
      <template #header>
        <h4 class="card-header">关于</h4>
      </template>
      <p>
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5
        等后台系统解决方案。
      </p>
    </el-card>
    <el-card>
      <template #header>
        <h4 class="card-header">技术栈</h4>
      </template>
      <div class="card-content">
        <div class="text-link">
          <template v-for="(item, index) in technologyStacks" :key="index">
            <div class="item">
              <span class="title">{{ item.title }}：</span>
              <el-link type="primary" href=" ">{{ item.desp }}</el-link>
            </div>
          </template>
        </div>
        <el-descriptions class="descriptions" title="生产环境依赖" :column="2" border>
          <template v-for="(item, index) in dependencies" :key="index">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">{{ item.name }}</div>
              </template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
        <el-descriptions class="descriptions" title="开发环境依赖" :column="2" border>
          <template v-for="(item, index) in devDependencies" :key="index">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">{{ item.name }}</div>
              </template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <h4 class="card-header">项目结构</h4>
      </template>
      <div class="card-content">
        <pre class="projectDir">{{ projectDir }}</pre>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <h4 class="card-header">项目规范</h4>
      </template>
      <div class="card-content">
        <el-descriptions class="descriptions" title="文件命名规范" :column="1" border>
          <template v-for="(item, index) in namingConventions" :key="index">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">{{ item.name }}</div>
              </template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
        <el-descriptions class="descriptions" title="编写组件规范" :column="1" border>
          <template v-for="(item, index) in componentRules" :key="index">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">{{ item.name }}</div>
              </template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <h4 class="card-header">Git提交规范</h4>
      </template>
      <div class="card-content">
        <el-descriptions class="descriptions" :column="1" border>
          <template v-for="(item, index) in gitRules" :key="index">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">{{ item.name }}</div>
              </template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
import { technologyStacks } from './config/technologyStacks'
import { dependencies } from './config/dependencies'
import { devDependencies } from './config/devDependencies'
import { projectDir } from './config/projectDir'
import { namingConventions } from './config/namingConventions'
import { componentRules } from './config/componentRules'
import { gitRules } from './config/gitRules'

export default {
  components: {},
  data() {
    return {
      technologyStacks,
      dependencies,
      devDependencies,
      projectDir,
      namingConventions,
      componentRules,
      gitRules,
    }
  },
}
</script>

<style lang="less" scoped>
.overview {
  .el-card + .el-card {
    margin-top: 20px;
  }

  .card-content {
    .text-link {
      margin-bottom: 30px;
      .item {
        .title::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          margin-right: 10px;
          border-radius: 3px;
          background-color: #000;
          vertical-align: 3px;
        }

        + .item {
          margin-top: 6px;
        }
      }
    }

    .descriptions {
      + .descriptions {
        margin-top: 30px;
      }

      :deep(.el-descriptions__header) {
        margin-bottom: 15px;

        .el-descriptions__title {
          font-weight: 400;
        }
      }
    }

    .projectDir {
      padding: 20px 10px;
      background-color: #f0f0f0;
    }
  }
}
</style>
