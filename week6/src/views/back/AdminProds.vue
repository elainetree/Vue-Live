<template>
  <div class="container">
    <h1>後台產品列表</h1>
    <table class="table table-hover table-bordered">
      <thead class="bg-secondary bg-opacity-25 text-secondary">
        <tr>
          <th width="40%">書名</th>
          <th width="10%">上架</th>
          <th width="10%">出版社</th>
          <th width="10%">類別</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prod,key) in prods" :key="key+'1'">
          <td>{{ prod.title }}</td>
          <td>
            <span :class="{'text-primary':prod.is_enabled, 'text-black-50':!prod.is_enabled}">{{prod.is_enabled ? '是' : '否'}}</span>
          </td>
          <td>{{ prod.publisher }}</td>
          <td>{{ prod.category }}</td>
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
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`)
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
