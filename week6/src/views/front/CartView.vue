<template>
  <div class="container">
    <h2>購物車</h2>
    <!-- 購物列表 -->
    <table class="table">
      <thead>
        <tr>
          <th width="65%">書名</th>
          <th width="10%">數量</th>
          <th width="10%">單價</th>
          <th width="15%">
            <button type="button" class="btn btn btn-outline-danger btn-sm" @click="removeCarts" :disabled="isLoadingItem === true || cartData.carts.length === 0">清空購物車</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData.carts">
          <tr v-for="(cart,key) in cartData.carts" :key="key+'1'">
            <td>{{cart.product.title}}</td>
            <td>{{cart.qty}}</td>
            <td>{{cart.product.price}}</td>
            <td>
              <button type="button" class="btn btn btn-outline-danger btn-sm opacity-75" @click="removeCartItem(cart.id)" :disabled="isLoadingItem === cart.id">X</button>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>總計</td>
          <td>{{ cartData.total }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <!-- 填寫表單 -->
    <div class="my-5 row justify-content-center">
        <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field id="email" name="email" type="email" class="form-control"
              placeholder="請輸入 Email" rules="required|email" v-model="formData.user.email" :class="{ 'is-invalid': errors['email'] }"></Field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="formData.user.name"></Field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|integer|min:8" v-model="formData.user.tel"></Field>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="formData.user.address"></Field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <Field id="message" name="留言" class="form-control" cols="30" rows="10" v-model="formData.message" as="textarea"></Field>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger" :disabled="cartData.carts.length === 0 || isLoadingItem === true">
              <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === true"></i>
              送出訂單
            </button>
          </div>
        </Form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      isLoadingItem: '',
      prodId: '',
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log(res)
          this.cartData = res.data.data
        })
    },
    removeCarts () {
      // 點擊「清空購物車」時，把 true 存入 isLoadingItem
      this.isLoadingItem = true
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then(() => {
          this.getCart()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    removeCartItem (id) {
      this.isLoadingItem = id
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(() => {
          this.getCart()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    createOrder () {
      this.isLoadingItem = true
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: this.formData })
        .then((res) => {
          alert(res.data.message)
          this.getCart()
          // 用 refs 取得 DOM 後使用 VeeValidate 提供的 resetForm() 方法重置表單
          this.$refs.form.resetForm()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  }
}
</script>
