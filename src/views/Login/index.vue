<template>
  <div class="login-box">
    <div class="title">神界</div>
    <a-form layout="vertical" :model="loginData" class="login">
      <a-form-item label='帐号'>
        <a-input v-model:value="loginData.username" placeholder="Username">
          <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
      <a-form-item label='密码'>
        <a-input v-model:value="loginData.password" type="password" placeholder="Password">
          <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          @click="loginStatus"
          style="width:100%;margin-bottom:30px;"
        >
          进入神界
        </a-button>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/api/user'
import { setToken } from '@/util/auth'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const loginData = reactive({
      username: '封andy为土地公',
      password: '123456'
    })
    const router = useRouter()
    const loginStatus = () => {
      login(loginData).then(res => {
        setToken(res.data.token)
        router.push({
          name: 'Main'
        })
        // console.log(res)
      })
    }
    return {
      loginData,
      loginStatus
    }
  },
  components: {
    UserOutlined,
    LockOutlined
  }
})
</script>

<style lang="less" scoped>
.login-box{
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .title{
    text-align: center;
    padding-top: 15vh;
  }

  .login{
    width: 400px;
    max-width: 100%;
    padding: 0 35px 0;
    margin: 0 auto;
  }
}

</style>
