<template>
  <div class="dashboard-container">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
    background:url("../../image/back1.png") no-repeat;
  width:100%;
  height:100%;
  position:fixed;
  background-size:99% 93.5%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
