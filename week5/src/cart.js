import pagination from './components/pagination.js'
import userProdModal from './components/user-prod-modal.js'

// CDN 版：載入 VeeValidate 全部驗證規則
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale 啟用語言環境
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: false, // 輸入文字時，是否立即進行驗證
});

const app = Vue.createApp({
  data() {
    return{
      prodsData: [],
      pagination: {},
      cartData: {
        carts: [] // 用於判斷長度
      },
      prodId: '',
      isLoadingItem: '',
      // 用於 loading overlay
      isLoadingPage: false,
      opacity: 1,
      // post order API，後端規定格式
      formData: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    }
  },
  methods: {
    getProds(page=1) {
      this.addLoadingPage();
      axios
      // 依據 API 文件，page string(query) 為「查詢字符串 Query String parameters」，使用方式：在 url 尾端加上「?參數=值」
      .get(`${apiUrl}/api/${apiPath}/products/?page=${page}`)
      .then(res=>{
        this.prodsData = res.data.products;
        this.pagination = res.data.pagination;
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    openProdModal(id) {
      this.prodId = id;
      this.$refs.prodModal.openModal();
    },
    getCart() {
      axios
      .get(`${apiUrl}/api/${apiPath}/cart`)
      .then(res=>{
        // data 裡除了 carts 還有 total、final_total 等資訊也要一起存
        this.cartData = res.data.data;
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    addToCart(id, qty=1) {
      // 後端規定格式
      const data = {
        product_id: id,
        qty
      };
      // 點擊「加到購物車」時，把 id 存入 isLoadingItem
      this.isLoadingItem = id;
      axios
      .post(`${apiUrl}/api/${apiPath}/cart`, {data})
      .then(()=>{
        // 「加到購物車」後重新取得產品列表並關閉 modal
        this.getCart();
        this.$refs.prodModal.closeModal();
        // 觸發 API 後清空 isLoadingItem 值
        this.isLoadingItem = '';
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    removeCarts() {
      // 點擊「清空購物車」時，把 true 存入 isLoadingItem
      this.isLoadingItem = true;
      axios
      .delete(`${apiUrl}/api/${apiPath}/carts`)
      .then(()=>{
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    removeCartItem(id) {
      this.isLoadingItem = id;
      axios
      .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
      .then(()=>{
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    updateCartItem(item) {
      const data = {
        product_id: item.product_id, // 留意：這裡要帶入產品 id，不是購物車 id
        qty: item.qty
      };
      this.isLoadingItem = item.id;
      axios
      // 這裡帶入購物車 id
      .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, {data})
      .then(()=>{
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    createOrder() {
      this.isLoadingItem = true;
      axios
      .post(`${apiUrl}/api/${apiPath}/order`, {data: this.formData})
      .then((res)=>{
        alert(res.data.message);
        this.getCart();
        // 用 refs 取得 DOM 後使用 VeeValidate 提供的 resetForm() 方法重置表單
        this.$refs.form.resetForm();
        this.isLoadingItem = '';
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    addLoadingPage() {
      this.isLoadingPage = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoadingPage = false
      }, 800)
    },
  },
  mounted(){
    this.getProds();
    this.getCart();
  },
  components: {
    pagination,
    userProdModal
  }
});

// 註冊表單驗證元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

// 註冊 Vue-Loading-Overlay 元件
app.component('loading-page', VueLoading.Component)

app.mount('#app');