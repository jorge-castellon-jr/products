<template>
  <div class="container">
    <Header />
    <div class="circle" :style="{'background-color':home.primary_color}"></div>
    <div v-html="home.cta"></div>
    <div v-html="home.body"></div>
    <div>
      <ProductList :products="products" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import homeJSON from '~/content/data/home.json'
import ProductList from '~/components/ProductList.vue'

export default {
  data () {
    return {
      home: homeJSON,
    }
  },
  components: {
    Header,
    ProductList
  },
  async asyncData () {
    // create context via webpack to map over all products
    const allproducts = await require.context("~/content/products/", true, /\.md$/)
    const products =  allproducts.keys().map((key) => {
      // give back the value of each product context
      return allproducts(key)
    });
    return {
      products
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  margin: 20px auto;
}
.circle {
  height: 25vw;
  width: 25vw;
  border-radius: 100%;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
