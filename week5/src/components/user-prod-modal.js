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
      this.prodQty = 1;
      this.prodModal.show();
      this.$emit('add-loading')
    },
    closeModal() {
      this.prodModal.hide();
    },
    addToCartInModal() {
      // 帶入產品 id，和選取的產品數量
      // this.id 和 this.prods.id 都是產品 id，擇一即可
      this.$emit('add-to-cart', this.prods.id, this.prodQty);
    },
  }
}