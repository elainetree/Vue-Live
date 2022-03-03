import pagination from './components/pagination.js'
import userProdModal from './components/user-prod-modal.js'

const app = Vue.createApp({
  data() {
    return{
      prodsData: [],
      pagination: {},
      cartData: {
        carts: [] // 用於判斷長度
      },
      prodId: '',
      // 用於 loading overlay
      isLoadingPage: false,
      opacity: 1,
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
    addLoadingPage() {
      this.isLoadingPage = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoadingPage = false
      }, 1000)
    },
  },
  mounted(){
    this.getProds();
  },
  components: {
    pagination,
    userProdModal
  }
});

// 註冊 Vue-Loading-Overlay 元件
app.component('loading-page', VueLoading.Component)
console.log(VueLoading);

app.mount('#app');