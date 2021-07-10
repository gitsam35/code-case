<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="320px">
      <div class="asideTop">
        <div>
          <img src="../assets/logo.jpeg" style="height:150px; width: 160px; border-radius: 50%;" />
        </div>
        <span>星豪物业后台管理系统</span>
      </div>
      <el-menu
        router
        :default-active="$route.path"
        active-text-color="#3483fd"
        background-color="#2c8cfc"
      >
        <el-menu-item index="/shuffling">轮播图管理</el-menu-item>
        <el-menu-item index="/announcement">公告管理</el-menu-item>
        <el-submenu index="1">
          <div slot="title">
            <i class="el-icon-setting" style="color:#fff"></i>
            <span>报修管理</span>
          </div>
          <el-menu-item-group>
            <el-menu-item index="/repairment">报修设置</el-menu-item>
            <el-menu-item index="/repairer">维修员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <div slot="title">
            <i class="el-icon-s-order" style="color:#fff"></i>
            <span>业主信息管理</span>
          </div>
          <el-menu-item-group>
            <el-menu-item index="/house">房间管理</el-menu-item>
            <el-menu-item index="/car">车位管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <div slot="title">
            <i class="el-icon-help" style="color:#fff"></i>
            <span>权限管理</span>
          </div>
          <el-menu-item-group>
            <el-menu-item index="/adminUser">后台管理员管理</el-menu-item>
            <el-menu-item index="/User">业主用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="headerRight">
          <button style="border: none;background-color: transparent;
      outline: none;">
            <i class="iconfont icon-gengduo" style="font-size: 26px; color:#fff;"></i>
          </button>
          <i class="el-icon-user" style="font-size: 26px; color:#fff;margin-left:20px"></i>
          <span style="font-size: 26px; color:#fff;">{{username}}</span>

          <el-tooltip content="退出登录" effect="light" placement="bottom">
            <button
              style="border: none;background-color: transparent;
      outline: none;cursor:pointer;"
              @click="logout"
            >
              <i
                class="el-icon-switch-button"
                style="font-size: 26px; color:#fff;margin-left: 20px;"
              ></i>
            </button>
          </el-tooltip>
        </div>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username")
    };
  },
  methods: {
    logout() {
      //退出登录 清空token
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.el-header {
  line-height: 60px;
  background-color: #545c64;
}
.el-header .headerRight {
  margin-left: 85%;
}
.el-aside {
  background-color: #2c8cfc;
  color: #ffffff;
}
.el-menu {
  /*去除 1px边框  */
  border-right: none;
}
.el-submenu div,
.el-menu-item {
  margin: 0 0 0 70px;
  color: #fff;
  font-size: 18px;
}
.el-main {
  background-color: #ecf5ff;
}
.el-menu-item:hover,
.el-menu-item.is-active,
.el-submenu:hover,
.el-submenu.is-active {
  /* 侧边导航鼠标经过的背景色，字体颜色改变 */
  background: #ecf5ff !important;
  color: #225fec !important;
}
.asideTop {
  text-align: center;
  margin: 20px;
}
.asideTop span {
  color: #fff;
  font-size: 24px;
}
</style>