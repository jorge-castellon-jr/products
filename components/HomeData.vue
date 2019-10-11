<template>
<b-container class="th__home">
  <b-row align-h="center" class="th__hero">
    <b-col cols="12" lg="10">
      <b-img class="th__img" :src="`${home.hero_image}`" fluid-grow></b-img>
      <b-row class="th__hero-text">
        <h1 v-html="home.cta"></h1>
        <div v-html="home.body"></div>
      </b-row>
      <b-row class="th__btn-group">
        <b-col v-if="company.phone_">
          <b-button variant="primary" :style="`background: ${home.primary_color}; border-color: ${home.primary_color}`" :href="`tel:${company.phone}`">Call</b-button>
        </b-col>
        <b-col v-if="company.email_">
          <b-button variant="outline-dark" :href="`mailto:${company.email}`">Email</b-button>
        </b-col>
        <b-col>
          <b-button variant="outline-dark" :href="`https://www.google.com/maps/search/${decodeURI( company.address )}`">Get Directions</b-button>
        </b-col>
      </b-row>
    <b-row v-if="home.gallery_" class="th__gallery">
      <b-card-group columns>
        <b-card v-for="img in home.gallery" :key="img" :img-src="img"></b-card>
      </b-card-group>
    </b-row>
    </b-col>
  </b-row>
</b-container>
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
    // position: relative;
    margin-bottom: 140px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      height: 20vw;
      max-height: 200px;
      width: 100%;
      background: white;
    }
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
    // max-width: 80%;
    margin: 0 auto;
    .col {
      justify-content: center;
      display: flex;
    }
    a {
      margin: 10px;
      min-width: 150px;
      width: 25%;
    }
  }
  &__gallery {
    margin-top: 40px;
    justify-content: space-between;
    .card-body {
      display: none;
    }
    // img {
    //   width: calc(50% - 10px);
    //   padding-bottom: 20px;
    //   object-fit: cover;
    //   @media only screen and (min-width: 768px) {
    //     max-width: calc(25% - 10px);
    //   }
    // }
  }
}

</style>
