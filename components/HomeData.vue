<template>
  <b-row align-h="center" class="th__hero">
    <b-col cols="8">
      <b-img class="th__img" :src="`/media/${home.hero_image}`" fluid-grow></b-img>
      <b-row class="th__hero-text">
        <h1 v-html="home.cta"></h1>
        <div v-html="home.body"></div>
      </b-row>
      <b-row class="th__btn-group">
        <b-button variant="primary" :style="`background: ${home.primary_color}; border-color: ${home.primary_color}`" v-if="company.phone_" :href="`tel:${company.phone}`">Call</b-button>
        <b-button variant="outline-dark" v-if="company.email_" :href="`mailto:${company.email}`">Email</b-button>
        <b-button variant="outline-dark" :href="`https://www.google.com/maps/search/${decodeURI( company.address )}`">Get Directions</b-button>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import homeJSON from '~/content/data/home.json'
import companyJSON from '~/content/data/company.json'

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
      company: companyJSON,
    }
  },
  methods: {
    decodeURI( string ) {
        return encodeURIComponent(string)
    }
  }
}
</script>

<style lang="scss" scoped>
.th {
  &__hero {
    position: relative;
    margin-bottom: 140px;
  }
  &__img {
    margin-bottom: 40px;
  }
  &__hero-text {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
  &__btn-group {
    justify-content: space-around;
    max-width: 80%;
    margin: 0 auto;
    a {
      margin: 10px;
      min-width: 150px;
      width: 25%
    }
  }
}

</style>
