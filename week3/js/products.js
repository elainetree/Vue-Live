import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'elaine7598';

let prodModal = {};
let delProdModal = {};

const app = createApp({
  data(){
    return{
      prodsData: [],
      tempProd: {
        imagesUrl: [],
      },
      isNew: true, // 判斷 modal 是「新增(true)」或「編輯(false)」，可先隨意給個預設值
    }
  },
  mounted(){
    // 取出 token（取自 MDN - Document.cookie）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)elaineToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
    // 把 token 存到 headers（取自 axios 官網文件），存 token 目的：不用每次登入 API 都要驗證
    axios.defaults.headers.common['Authorization'] = token;

    // 執行 checkLogin
    this.checkLogin();

    // 使用 bootstrap 提供的方法，進行 modal 實體化
    prodModal = new bootstrap.Modal(document.getElementById('prodModal'));
    delProdModal = new bootstrap.Modal(document.getElementById('delProdModal'));
  },
  methods:{
    checkLogin(){
      axios
      .post(`${apiUrl}/api/user/check`)
      .then(()=>{
        this.getProds()
      })
      // login 資料若有誤，出現警告視窗並轉回登入頁
      .catch(error=>{
        alert(error.data.message);
        window.location = 'login.html'
      })
    },
    getProds(){
      axios
      .get(`${apiUrl}/api/${path}/admin/products`)
      .then(res=>{
        this.prodsData = res.data.products;
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },
    openProdModal(status,product){
      if(status==='addData'){
        // 如果是「新增」，就重置 tempProd 物件、把 isNew 變 true
        this.tempProd = {
          imagesUrl: [],
        }
        prodModal.show();
        this.isNew = true;
      }else if(status==='editData'){
        // 如果是「編輯」，就帶入原有資料、把 isNew 變 false。注意：物件傳參考特性，用拷貝才能避免影響到原有的值
        this.tempProd = {...product};
        // imagesUrl 如果沒有陣列，就補上
        if(!this.tempProd.imagesUrl){
          this.tempProd.imagesUrl = [];
        }
        prodModal.show();
        this.isNew = false;
      }else if(status==='deleteData'){
        // 如果是「刪除」，就帶入原有資料（用於畫面顯示產品名稱）
        this.tempProd = {...product};
        delProdModal.show();
      }
    },
    updateProd(){
      // 如果是「新增」，就帶入 url 和 method 值
      let url = `${apiUrl}/api/${path}/admin/product`;
      let method = 'post';
      // 如果是「編輯」，就修改 url 和 method 值
      if(!this.isNew){
        url = `${apiUrl}/api/${path}/admin/product/${this.tempProd.id}`;
        method = 'put';
      }
      
      axios
      // 後端格式：需把資料放在 data 裡
      [method](url, {data: this.tempProd})
      .then(()=>{
        // 新增資料後，重新取得產品列表，並關掉 modal
        this.getProds();
        prodModal.hide();
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },
    deleteProd(){
      axios
      .delete(`${apiUrl}/api/${path}/admin/product/${this.tempProd.id}`)
      .then(()=>{
        // 刪除資料後，重新取得產品列表，並關掉 modal
        this.getProds();
        delProdModal.hide();
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },
  },
});
app.mount('#app');