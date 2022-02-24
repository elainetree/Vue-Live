import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import pagination from './components/pagination.js';
import modalForProd from './components/prod-modal.js';
import modalForAlert from './components/alert-modal.js';

const app = createApp({
  data(){
    return{
      prodsData: [],
      tempProd: {
        imagesUrl: [],
      },
      isNew: true, // 判斷 modal 是「新增(true)」或「編輯(false)」，可先隨意給個預設值
      pagination: {}
    }
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)elaineToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin();
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
    // 參數預設值：指定起始頁面位置
    getProds(page=1){
      axios
      // 依據 API 文件，page string(query) 使用「查詢字符串 Query String parameters」，使用方式：在 url 尾端加上「?參數=值」
      .get(`${apiUrl}/api/${path}/admin/products/?page=${page}`)
      .then(res=>{
        this.prodsData = res.data.products;
        // 儲存分頁資訊
        this.pagination = res.data.pagination;
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
        this.$refs.prodModal.showModal();
        this.isNew = true;
      }else if(status==='editData'){
        // 如果是「編輯」，就帶入原有資料、把 isNew 變 false。注意：物件傳參考特性，用拷貝才能避免影響到原有的值
        this.tempProd = {...product};
        // imagesUrl 如果沒有陣列，就補上
        if(!this.tempProd.imagesUrl){
          this.tempProd.imagesUrl = [];
        }
        this.$refs.prodModal.showModal();
        this.isNew = false;
      }else if(status==='deleteData'){
        // 如果是「刪除」，就帶入原有資料（用於畫面顯示產品名稱）
        this.tempProd = {...product};
        this.$refs.alertModal.showModal();
      }
    },
  },
  // 區域註冊
  components: {
    pagination,
    modalForProd,
    modalForAlert
  }
});
app.mount('#app');