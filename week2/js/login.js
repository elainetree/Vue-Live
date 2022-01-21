import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';

const app = createApp({
  data(){
    return{
      // HTML input 的資料會綁定到這裡，此物件格式也是登入的 API post 所需的參數
      user:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      // 要取到 data 中 API post 所需的參數，需使用 this
      axios.post(`${apiUrl}/admin/signin`, this.user)
      .then((res)=>{
        // 在 res.data 中，可看到 token 和 expired，以解構的方式取出它們（expired 為 unix 時間戳格式）
        const {token,expired} = res.data;

        // 把 token 存到 cookie：定義存放 token 的名稱、到期日用 new Date 把時間戳轉成一般格式（取自 MDN - Document.cookie）
        document.cookie = `elaineToken=${token}; expires=${new Date(expired)};`;

        // 轉址到產品頁：window 是瀏覽器的物件，location 是 window 底下的轉址方法
        window.location = 'products.html';
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    }
  }
});
app.mount('#app');