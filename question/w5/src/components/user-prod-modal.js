export default {
  template: '#userProdModal',
  data() {
    return {
      prodModal: null,
      prods: {},
      prodQty: 1,
      // isLoadingPage: false,
      // opacity: 1,
    }
  },
  mounted() {
    this.prodModal = new bootstrap.Modal(this.$refs.modal);
  },
  props: ['id'],
  watch: {
    // 當 id 值有變時，觸發 getProd()
    id(){
      this.getProd();
    }
  },
  methods: {
    getProd() {
      axios
      // 產品 id
      .get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
      .then(res=>{
        this.prods = res.data.product;
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    openModal() {
      // 每次打開 modal，數量重置為 1
      console.log(this);
      this.prodQty = 1;
      this.prodModal.show();
      this.$emit('add-loading')
    },
    closeModal() {
      this.prodModal.hide();
    },
    // addLoadingPage() {
    //   this.isLoadingPage = true;
    //   // simulate AJAX
    //   setTimeout(() => {
    //     this.isLoadingPage = false
    //   }, 1000)
    // },
  }
}