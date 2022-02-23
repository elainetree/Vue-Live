import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';

const app = createApp({
  data(){
    return{
      user:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      if(this.user.username === '' || this.user.password === ''){
        alert('請輸入帳號和密碼');
      }else{
        axios
        .post(`${apiUrl}/admin/signin`,this.user)
        .then((res)=>{
          const {expired, token} = res.data;
          document.cookie = `elaineToken=${token}; expires=${new Date(expired)};`;
          window.location = 'products.html'
        })
        .catch((error)=>{
          alert(error.data.message+'，請重新輸入');
          this.user.username = '';
          this.user.password = '';
        })
      }
    }
  }
});
app.mount('#app');