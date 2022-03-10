<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="col-8 col-md-5">
        <h1 class="h3 text-center">管理員登入</h1>
        <form action="" @submit.prevent="login">
          <div class="mb-3">
            <label for="userMail" class="form-label">帳號</label>
            <input type="email" id="userMail" class="form-control" placeholder="example@mail.com" v-model="user.username">
          </div>
          <div class="mb-3">
            <label for="userPassword" class="form-label">密碼</label>
            <input type="password" id="userPassword" class="form-control" v-model="user.password">
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // email 登入、寫入 cookie、轉址
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.user.username === '' || this.user.password === '') {
        alert('請輸入帳號和密碼')
      } else {
        this.$http
          .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
          .then((res) => {
            const { expired, token } = res.data
            document.cookie = `elaineToken=${token}; expires=${new Date(expired)};`
            // 轉址到後台
            // 為什麼是 push？因為是一個陣列的概念（推到某個路由） ['/', 'login', '/admin/prods']
            this.$router.push('/admin')
          })
          .catch((error) => {
            alert(error.response.data.message + '，請重新輸入')
            this.user.username = ''
            this.user.password = ''
          })
      }
    }
  }
}
</script>
