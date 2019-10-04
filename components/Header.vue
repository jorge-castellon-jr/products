<template>
    <b-navbar fixed="top" type="light" variant="light" class="w-25 th__header">
      <nuxt-link to="/">
        <b-navbar-brand tag="h1" class="th__brand">
            <Logo />
            {{ company.company_name }}
        </b-navbar-brand>
      </nuxt-link>
      <b-nav-text>{{ company.desc }}</b-nav-text>

      <b-collapse is-nav class="th__nav">
        <b-nav vertical class="th__nav_links">
          <b-nav-item :href="`https://www.google.com/maps/search/${decodeURI( company.address )}`" >
            <b-button variant="outline-dark" class="th__btn">Address</b-button>
          </b-nav-item>
          <b-nav-item v-if="company.phone_" :href="`tel:${company.phone}`" >
            <b-button variant="outline-dark" class="th__btn">Phone</b-button>
          </b-nav-item>
          <b-nav-item v-if="company.email_" :href="`mailto:${company.email}`" >
            <b-button variant="outline-dark" class="th__btn">Email</b-button>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import Logo from '~/components/Logo.vue'
import companyJSON from '~/content/data/company.json'

export default {
    data () {
        return {
            company: companyJSON
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
    height: 100vh;
    flex-direction: column;
    box-shadow: 5px 0 38px rgba(0,0,0,.24);
  }
  &__brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__nav {
    flex-grow: 0;
    margin-top: 45px;
    &_links {
      align-items: stretch;
    }
  }
  &__btn {
    width: 100%;
    border: none;
  }
}
// .title {
//   font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//   display: block;
//   font-weight: 300;
//   font-size: 100px;
//   color: #35495e;
//   letter-spacing: 1px;
// }

// .subtitle {
//   font-weight: 300;
//   font-size: 42px;
//   color: #526488;
//   word-spacing: 5px;
//   padding-bottom: 15px;
// }

// .links {
//   padding-top: 15px;
// }
</style>