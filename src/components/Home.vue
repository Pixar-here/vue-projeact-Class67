<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isshow?'65px':'200px'">
        <div :style="{width:isshow?'65px':'200px'}" @click="isshow=!isshow" class="toggle_bar">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isshow"
          :unique-opened="true"
          :collapse-transition="true"
        >
          <el-submenu
            :index="item.id"
            :style="{width:isshow?'65px':'200px'}"
            v-for="(item,k) in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="'iconfont icon-'+iconList[k]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="item2 in item.children"
              :key="item2.id"
              :index="item.id+'-'+item2.id"
            >
              <i class="el-icon-menu"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      isshow: false,
      menuList: [],
      iconList: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getMenuList() {
      var { data: dt } = await this.$http.get('/menus')
      if (dt.meta.status !== 200) {
        return this.$message.reeor(dt.msg)
      }
      this.menuList = dt.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    width: 100%;
    padding: 0;
    padding-right: 20px;
    background-color: #373d41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo-box {
      color: white;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle_bar {
      width: 20px;
      height: 25px;
      background-color: #4a5064;
      color: white;
      text-align: center;
      font-size: 12px;
      line-height: 25px;
      letter-spacing: 0.1em;
      user-select: none;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
