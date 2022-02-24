export default {
  data(){
    return{
      alertModal: null
    }
  },
  props: ['tempProd'],
  template: '#alertModalTemplate',
  mounted() {
    // 使用 bootstrap 提供的方法，進行 modal 實體化
    this.alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
  },
  methods: {
    deleteProd(){
      axios
      .delete(`${apiUrl}/api/${path}/admin/product/${this.tempProd.id}`)
      .then(()=>{
        // 刪除資料後，重新取得產品列表，並關掉 modal
        this.$emit('get-prod');
        this.hideModal();
      })
      .catch((error) => {
        alert(error.data.message);
      })
    },
    showModal(){
      this.alertModal.show();
    },
    hideModal(){
      this.alertModal.hide();
    }
  },
}