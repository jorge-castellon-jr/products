<template>
  <div>
    <Header />
    <b-container fluid>
      <b-row>
        <b-col cols="9" offset="3">
          <nuxt  />
          <ProductList v-show="this.$store.state.productsShow" :products="products" />
        </b-col>
      </b-row>
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

<style>
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
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
