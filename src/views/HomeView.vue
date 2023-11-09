<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="logo" src="../assets/logo.svg">
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <el-button class="login-out" type="primary">
              退出登录
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" router>
            <!-- 开启路由模式，通过el-menu-item index来进行跳转 -->
            <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <!-- 设置路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {

  },

  setup() {
    // 获取子路由
    const router = useRouter();
    // 获取路由信息
    // console.log(router.getRoutes());
    // 过滤出路由信息中meta.isShow == true的路由并加入到列表中
    const list = router.getRoutes().filter(v => v.meta.isShow);
    // console.log(list);

    return { list };
  }
});
</script>

<style lang="scss" scoped>
.el-header {
  border: 1px solid;
  height: 80px;
  background-color: #666;

  .logo {
    height: 80px;
  }

  h2,
  .login-out {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
    ;
  }

}

.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }

}
</style>