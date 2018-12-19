<script src="../../../../vue-admin-master/build/webpack.base.conf.js"></script>
<template>
  <div>
    <el-header>
      <el-row >
        <el-col :span="6">
          任务工会管理系统
        </el-col>
        <el-col :span="18">
          <el-menu>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                     background-color="#e3f0ff"
                     text-color="#434492"
                     active-text-color="#434492" style="border:none;">
              <el-menu-item index="1"><router-link to="/home">公司介绍</router-link></el-menu-item>
              <el-menu-item index="2"><router-link to="/store">商城管理</router-link></el-menu-item>
              <el-menu-item index="3"><router-link to="/order">预约处理</router-link></el-menu-item>
              <el-menu-item index="4"><router-link to="/main">个人中心</router-link></el-menu-item>
              <el-submenu index="5">
                <template slot="title"><router-link to="/power">权限管理</router-link></template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
                <el-menu-item index="5-3">选项3</el-menu-item>
              </el-submenu>
              <el-menu-item index="6"><router-link to="/logs">操作日志</router-link></el-menu-item>
            </el-menu>
            <div class="line"></div>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-header{
    text-align: center;
    line-height:60px;
    font-size:26px;
   // background:#e3f0ff;
    color:#434492;
    background:rgba(0,0,0,0.6);
    color:#434492;
  }
  .el-menu--horizontal{
    display: flex;
    justify-content: space-around;
  }
</style>
