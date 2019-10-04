<template>
  <div class="container">
    <div class="circle" :style="{'background-color':home.primary_color}"></div>
    <div v-html="home.cta"></div>
    <div v-html="home.body"></div>
  </div>
</template>

<script>
import homeJSON from '~/content/data/home.json'

export default {
  data () {
    return {
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
