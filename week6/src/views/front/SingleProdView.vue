<template>
  <div class="container">
    <h2>{{prod.title}}</h2>
    <div class="d-flex">
      <img :src="prod.imageUrl" alt="" class="align-self-start w-25 me-5 img-thumbnail img-fluid" v-show="prod.imageUrl !== undefined">
      <div>
        <h3 class="h4">書籍簡介</h3>
        <p>{{prod.description}}</p>
        <h3 class="h4">作者介紹</h3>
        <p>{{prod.aboutAuthor}}</p>
        <router-link to="/prods" class="d-flex justify-content-end">回到上一頁</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prod: []
    }
  },
  mounted () {
    this.getSingleProd()
  },
  methods: {
    getSingleProd () {
      console.log(this.$route)
      const id = this.$route.params.id
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          console.log(res)
          this.prod = res.data.product
        })
    }
  }
}
</script>
