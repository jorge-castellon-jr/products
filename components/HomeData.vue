<template>
  <div>
    <div class="circle" :style="{'background-color':home.primary_color}"></div>
    <div v-html="home.cta"></div>
    <div v-html="home.body"></div>
  </div>
</template>

<script>
import homeJSON from '~/content/data/home.json'

export default {
  data () {
    // create context via webpack to map over all products
    const allproducts = require.context("~/content/products/", true, /\.md$/)
    const products =  allproducts.keys().map((key) => {
      // give back the value of each product context
      return allproducts(key)
    });
    return {
      products,
      showMe: false,
      home: homeJSON,
    }
  },
}
</script>

<style lang="scss" scoped>
.circle {
  height: 25vw;
  width: 25vw;
  border-radius: 100%;
}

</style>
