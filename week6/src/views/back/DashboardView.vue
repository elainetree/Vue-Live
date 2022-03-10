<template>
  <h1 class="text-success text-center">後台</h1>
  <div id="nav" class="m-3 text-center">
    <router-link to="/">Back to Home</router-link> |
    <router-link to="/admin/prods">Products</router-link> |
    <router-link to="/admin/orders">Orders</router-link> |
  </div>
  <router-view v-if="checkSuccess" />
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    // 驗證
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)elaineToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        // 把 token 存到 axios headers
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.checkSuccess = true
          })
          .catch((error) => {
            alert(error.data.message)
            // 轉址到登入頁
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('./login')
      }
    }
  }
}
</script>
