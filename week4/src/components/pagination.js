export default {
  props: ['pages'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end">
    <li class="page-item"
        :class="{disabled : !pages.has_pre}">
      <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="$emit('get-prod', pages.current_page-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" 
        v-for="page in pages.total_pages" 
        :key="page+'1'"
        :class="{active: page === pages.current_page}">
      <a class="page-link" href="#"
        @click.prevent="$emit('get-prod',page)">{{page}}</a>
    </li>
    <li class="page-item" 
        :class="{disabled : !pages.has_next}">
      <a class="page-link" href="#" aria-label="Next"
        @click.prevent="$emit('get-prod', pages.current_page+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
}