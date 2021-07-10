<template>
  <div class="login-container">
    <div
      class="login-bg-img"
      style="position:absolute;z-index:-1;width:100%;height:100%;top:0px;left:0px;"
    >
      <img src="../assets/bg.jpg" width="100%" height="100%" />
    </div>

    <div class="login-box">
      <div class="login-content">
        <h2>用户登录</h2>
        <div>
          <!-- 登录表单区 -->
          <el-form
            :model="loginForm"
            :rules="loginFormRules"
            ref="loginFormRef"
            label-width="90px"
            class="login_form"
          >
            <!-- 账号 -->
            <!-- <i class="el-icon-user-solid"></i><input type="text"> -->
            <el-form-item label="账号" prop="username">
              <el-input
                v-model="loginForm.username "
                prefix-icon="el-icon-user"
                placeholder="请输入账号"
                style="width: 90%;"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                show-password
                style="width: 90%;"
              ></el-input>
            </el-form-item>

            <div class="btn">
              <el-button type="primary" @click="login">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div class="copyright">
      <div>本系统由广西星豪物业提供技术支持</div>
      <div>Copyright &copy; 2017-2021 &nbsp;&nbsp;广西星豪物业&nbsp;&nbsp;版权所有</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的账号和密码数据绑定对象
      loginForm: {
        username: "",
        password: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    async login() {
      const res = await this.$http.post("login", this.loginForm);
      window.sessionStorage.token = res.data.token;
      window.sessionStorage.setItem("username", res.data.username); // 保存用户名
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    },

    registered() {
      // 注册
      this.addDialogVisible = true;
    },
    async addUser() {}
  }
};
</script>

<style  scoped>
.login-bg-img {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.login-bg-img img {
  height: 100%;
  width: 100%;
}
.login-content {
  position: absolute;
  top: 180px;
  left: 50%;
  width: 500px;
  height: 460px;
  background: #8bb3fe;
  box-shadow: 0px 0px 43px 11px rgba(111, 159, 224, 0.42);
  border-radius: 40px;
}
.login-content h2 {
  margin: 50px 0;
  text-align: center;
  font-size: 36px;
}
.copyright {
  position: absolute;
  top: 750px;
  left: 50%;
  margin-top: 30px;
  height: 40px;
  font-size: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
/deep/.el-form-item__label {
  /* 加 /deep/ 是让element组件的样式起效果 */
  font-size: 22px;
}
/deep/.el-input__inner {
  height: 60px;
  font-size: 22px;
}
.btn {
  margin-top: 20px;
  text-align: center;
}
.btn .el-button {
  margin: 20px;
  width: 80px;
  height: 50px;
  font-size: 24px;
}

.qrlogin-hint img {
  cursor: pointer;
}
</style>