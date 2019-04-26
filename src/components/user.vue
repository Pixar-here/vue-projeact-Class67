<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dialog @close="resetForm()" title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addUserRef" :model="addUser" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tianjia()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog @close="resetEditForm()" title="修改用户" :visible.sync="editUserDialog" width="50%">
      <el-form ref="editUserRef" :model="editUser" :rules="editUserRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="xiugai()">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="querycdt.query"
            class="input-with-select"
            clearable
            @clear="search()"
            @keyup.enter.native="search()"
          >
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="130"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="60">
          <el-switch v-model="info.row.mg_state" slot-scope="info"></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <!-- 在操作列中，修改、删除、分配角色 按钮都需要获取到当前的每条记录信息，
          因此在全部按钮的外侧通过template统一接收作用域插槽提供的过来的“单用户”信息
          并应用-->
          <template slot-scope="info">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(info.row.id)"
            ></el-button>
            <el-button type="warning" icon="el-icon-delete" size="mini" @click="del(info.row.id)"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserList()
  },
  data() {
    var checkMobile = (rule, value, callback) => {
      var reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        // 效验失败
        return callback(new Error('手机号码格式不正确'))
      }
      // 验证成功,继续..
      callback()
    }
    return {
      editUser: {
        username: '',
        mobile: '',
        email: ''
      },
      // 修改
      editUserDialog: false,
      // 增加
      dialogVisible: false,
      currentPage: ''.number,
      // 数据纪录总条数
      tot: 0,
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请输入长度在 3 到 10 个字符的用户名称',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '请输入长度在 6 到 18 位的用户密码',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editUserRules: {
        mobile: [
          { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 用户列表成员
      userList: [],
      addUser: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      querycdt: {
        query: '',
        pagenum: 1,
        pagesize: 3
      }
    }
  },
  methods: {
    // 修改事件
    xiugai() {
      // 表单效验
      this.$refs.editUserRef.validate(async valid => {
        if (valid === true) {
          const { data: dt } = await this.$http.put(
            'users/' + this.editUser.id,
            this.editUser
          )
          // 判断修改失败执行的代码
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          // 弹窗提示
          this.$message.success(dt.meta.msg)
          // 关闭窗口
          this.editUserDialog = false
          // 刷新页面
          this.getuserList()
        }
      })
    },
    // 关闭修改对话框的时候重置form表单
    resetEditForm() {
      this.$refs.editUserRef.resetFields()
    },
    // 获取要修改的数据,渲染到修改页面上
    async showEditDialog(id) {
      const { data: dt } = await this.$http.get('users/' + id)
      // return
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      console.log(dt)
      // 获取到数据立即弹出对话框并渲染数据
      this.editUser = dt.data
      this.editUserDialog = true
    },
    // 删除事件
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // element-ui组件自己的方法(.then和.catch都是)
        .then(async() => {
          const { data: dt } = await this.$http.delete('users/' + id)
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          this.$message.success(dt.meta.msg)
          // 如果当前页只剩下一条数据,那么就给页码做减一操作
          if (this.userList.length === 1 && this.querycdt.pagenum > 1) {
            this.querycdt.pagenum--
          }
          // 刷新数据
          this.getuserList()
        })
        .catch(() => {})
    },
    // 点击添加按钮向数据库添加新用户
    tianjia() {
      // 验证表单,通过refs获取form表单,调用validate方法,参数返回值为布尔值
      this.$refs.addUserRef.validate(async valid => {
        // 如果是true,说明表单验证通过,反之不会执行添加代码
        if (valid) {
          // 发送axios请求
          const { data: dt } = await this.$http.post('/users', this.addUser)
          // 添加失败执行代码
          //! 注意此处是201状态码
          if (dt.meta.status !== 201) {
            return this.$message.error(dt.meta.msg)
          }
          // 成功后关闭弹框
          this.dialogVisible = false
          // 弹框提示
          this.$message.success(dt.meta.msg)
          // 刷新数据
          this.getuserList()
        }
      })
    },
    // 对话框回调
    resetForm() {
      // 重置form表单
      this.$refs.addFormRef.resetFields()
    },
    search() {
      this.getuserList()
    },
    // 数据分页相关1
    // 当前页码变化的处理
    handleCurrentChange(val) {
      // val变化后的当前页码
      // 把变化后的页码赋予给querycdt.pagenum
      this.querycdt.pagenum = val
      // 根据变化页码重新获取数据
      this.getuserList()
    },
    // 数据分页相关2
    // 每页数据显示条数变化的处理
    handleSizeChange(val) {
      // val 代表当前改变后每页显示的条数
      // 把变化后的显示条数直接赋予给querycdt.pagesize
      this.querycdt.pagesize = val
      // 根据变化后的每页数据重新获取数据
      this.getuserList()
    },
    async getuserList() {
      var { data: dt } = await this.$http.get('/users', {
        params: this.querycdt
      })
      console.log(dt)
      // 判断数据获取失败处理
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      // 把获取到的数据总条数赋予给tot存储
      this.tot = dt.data.total
      // 把获得到的数据传递给userList成员
      this.userList = dt.data.users
    }
  }
}
</script>

<style lang="less" scoped>
</style>
