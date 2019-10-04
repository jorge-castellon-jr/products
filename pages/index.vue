<template>
  <div>
    <!-- <HomeData /> -->
  </div>
</template>

<script>
import HomeData from "~/components/HomeData.vue";

export default {
  components: {
    HomeData
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-left: 400px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.circle {
  height: 25vw;
  width: 25vw;
  border-radius: 100%;
}

</style>
