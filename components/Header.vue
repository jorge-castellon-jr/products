<template>
    <div class="container">
      <Logo />
      <nuxt-link to="/">
        <h1 class="title">
          {{ company.company_name }}
        </h1>
      </nuxt-link>
      <h2 class="subtitle">
        {{ company.desc }}
      </h2>
      <div class="links">
        <a
          :href="`https://www.google.com/maps/search/${decodeURI( company.address )}`"
          class="button--green"
        >
          {{ company.address }}
        </a>
        <a
          v-if="company.phone_"
          :href="`tel:${company.phone}`"
          class="button--grey"
        >
          {{ company.phone }}
        </a>
        <a
          v-if="company.email_"
          :href="`mailto:${company.email}`"
          class="button--grey"
        >
          {{ company.email }}
        </a>
      </div>
    </div>
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
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>