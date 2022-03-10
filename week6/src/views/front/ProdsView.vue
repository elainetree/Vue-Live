<template>
  <div class="container">
    <h2>書籍列表</h2>
    <table class="table table-hover table-bordered">
      <thead class="bg-secondary bg-opacity-25 text-secondary">
        <tr>
          <th width="20%">書封</th>
          <th width="40%">書名</th>
          <th width="10%">出版社</th>
          <th width="10%">類別</th>
          <th width="10%">售價</th>
          <th width="10%">檢視</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prod,key) in prods" :key="key+'1'" class="align-middle">
          <td style="width: 200px">
            <div v-if="prod.imageUrl !== undefined" :style="{ backgroundImage: `url(${prod.imageUrl})`}"
            style="height: 150px; background-size: contain; background-position: center; background-repeat: no-repeat;"></div>
          </td>
          <td>{{prod.title}}</td>
          <td>{{prod.publisher}}</td>
          <td>{{prod.category}}</td>
          <td>{{prod.price}}</td>
          <td><router-link :to="`/prod/${prod.id}`">詳目頁</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prods: []
    }
  },
  mounted () {
    this.getProds()
  },
  methods: {
    getProds () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          // console.log(res)
          this.prods = res.data.products
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  }
}
</script>
