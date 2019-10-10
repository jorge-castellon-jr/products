<template>
    <b-container class="th__header">
        <b-row align-h="center">
          <nuxt-link to="/" class="th__brand" >
            <img :src="`/media${company.logo}`" />
          </nuxt-link>
          <div class="th__brand-line" :style="`background: ${home.primary_color}`"></div>
        </b-row>
    </b-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import companyJSON from '~/content/data/company.json'
import homeJSON from '~/content/data/home.json'

export default {
    data () {
        return {
            company: companyJSON,
            home: homeJSON
        }
    },
    components: {
        Logo
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
  &__header {
    .row {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  &__brand {
    max-height: 100px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 200px;
    }
    &-line {
      height: 1px;
      width: 80px;
    }
  }
  &__nav {
    // flex-grow: 0;
    // margin-top: 45px;
    &_links {
      align-items: stretch;
    }
  }
  &__btn {
    width: 100%;
    border: none;
  }
}
</style>