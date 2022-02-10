import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

// apiUrl 和 path 放在全域或 data 內均可，只需注意取資料方式不同。若放在 data return 內，取用時需要用 this 去取得
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'elaine7598';

const app = createApp({
  data() {
    return {
      // 存放「被選取」的 products 內容
      tempProd: {},
      // 存放從 API 取得的產品資料
      prodsData: []
    }
  },
  // 生命週期（初始化）
  mounted() {
    // 取出 token（取自 MDN - Document.cookie）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)elaineToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // 把 token 存到 headers（取自 axios 官網文件）
    axios.defaults.headers.common['Authorization'] = token;
    // 存取 token 的目的：不用每次登入 API 都要驗證

    // 執行 checkLogin
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      axios.post(`${apiUrl}/api/user/check`)
        .then(() => {
          // login 資料若正確，執行 getProds
          this.getProds();
        })
        .catch((error) => {
          // login 資料若有誤，出現警告視窗並轉回登入頁
          alert(error.data.message);
          window.location = 'login.html';
        })
    },
    getProds() {
      axios.get(`${apiUrl}/api/${path}/admin/products`)
        .then((res) => {
          // 把取得的資料存到 prodsData
          this.prodsData = res.data.products;
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },
    checkProdInfo(item) {
      this.tempProd = item;
    }
  }
});
app.mount('#app');