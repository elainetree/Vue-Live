export default {
  data(){
    return{
      prodModal: null
    }
  },
  props: ['tempProd', 'isNew'],
  template: '#prodModalTemplate',
  mounted() {
    // 使用 bootstrap 提供的方法，進行 modal 實體化
    this.prodModal = new bootstrap.Modal(document.getElementById('prodModal'));
  },
  methods:{
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
        // 新增編輯資料後，重新取得產品列表，並關掉 modal
        this.$emit('get-prod');
        this.hideModal();
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },
    showModal(){
      // Bootstrap 提供 JS 使用的方法
      this.prodModal.show();
    },
    hideModal(){
      this.prodModal.hide();
    }
  }
}