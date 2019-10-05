<template>
  <div>
    <Header />
    <b-container fluid class="th__content">
      <nuxt  />
      <ProductList v-show="this.$store.state.productsShow" :products="products" />
    </b-container>
    <client-only><AgePopUp /></client-only>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import ProductList from '~/components/ProductList.vue'
import AgePopUp from '~/components/AgePopUp.vue'

export default {
  data () {
    // create context via webpack to map over all products
    const allproducts = require.context("~/content/products/", true, /\.md$/)
    const products =  allproducts.keys().map((key) => {
      // give back the value of each product context
      return allproducts(key)
    });
    return {
      products
    }
  },
  components: {
    Header,
    ProductList,
    AgePopUp
  },
  transition (to, from) {
      if (!from) { return 'slide-left' }
      return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
}
</script>

<style lang="scss" scoped>
.th {
  &__content {
    margin-top: 40px;
    background: #EDF0F0;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 1s;
}
.page-enter,
.page-leave-to {
    transition: all .5s;
    opacity: 0;
    transform: translate(-500px, 0);
}
</style>
