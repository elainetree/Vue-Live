let prodModal = {};

export default {
  data(){
    return{
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      path: 'elaine7598',
    }
  },
  props: ['tempProd', 'isNew'],
  template: '#prodModalTemplate',
  mounted() {
    // 使用 bootstrap 提供的方法，進行 modal 實體化
    prodModal = new bootstrap.Modal(document.getElementById('prodModal'));
  },
  methods:{
    updateProd(){
      // 如果是「新增」，就帶入 url 和 method 值
      let url = `${this.apiUrl}/api/${this.path}/admin/product`;
      let method = 'post';
      // 如果是「編輯」，就修改 url 和 method 值
      if(!this.isNew){
        url = `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProd.id}`;
        method = 'put';
      }
      
      axios
      // 後端格式：需把資料放在 data 裡
      [method](url, {data: this.tempProd})
      .then(()=>{
        // 新增編輯資料後，重新取得產品列表，並關掉 modal
        this.$emit('get-prod');
        this.hideModal();
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      })
    },
    showModal(){
      prodModal.show();
    },
    hideModal(){
      prodModal.hide();
    }
  }
}