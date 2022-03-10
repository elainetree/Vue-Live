<template>
  <h1 class="text-warning text-center">Elaine's Home</h1>
  <div id="nav" class="m-3 text-center"> |
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/prods">Products</router-link> |
    <router-link to="/cart">Cart</router-link> |
    <!-- <router-link to="/admin">Dashboard Login</router-link> | -->
    <router-link to="/login">Login</router-link> |
  </div>
  <router-view/>
</template>

<script>
// @ is an alias to /src

// export default {
//   mounted () {
//     console.log(this.$http.get)
//   }
// }
</script>
