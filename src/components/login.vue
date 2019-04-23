<template>
  <div id="login-container">
    <!-- Login管理员登陆系统 -->
    <div class="login-box">
      <div class="logo-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :push="15">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 给 各个表单域 定义校验规则
      loginFormRules: {
        username: [
          // required:非空  message:错误提示  trigger:触发校验机制
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // 用户登录表单数据对象(用户名、密码)
      loginForm: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    login() {
      // 表单效验没有问题时,页面再跳转
      this.$refs.loginFormRef.validate(async valid => {
        // valid 效验 成功/失败 的标志 true为成功 false为失败
        if (valid === true) {
          // 账号的真实性效验
          const { data: dt } = await this.$http.post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          window.sessionStorage.setItem('token', dt.data.token)
        }
        this.$router.push('/home')
      })
    },
    // 重置表单
    reset() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  .login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .logo-box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px #eee;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
