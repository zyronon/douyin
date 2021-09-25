<template>
  <div id="home-index">
    <SlideRowList key1="子" direction="column">
      <SlideItem style="background: white">
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
      </SlideItem>
      <SlideItem style="background: red;">
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
        <p>222222222222</p>
      </SlideItem>
      <SlideItem style="background: yellow">
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
        <p>3333333333333</p>
      </SlideItem>
    </SlideRowList>
    <Footer/>
  </div>
</template>

<script>
import Comment from '../../components/Comment.vue'
import Share from '../../components/Share.vue'
import Footer from "../../components/Footer.vue"

export default {
  name: "HomeIndex",
  components: {Footer, Comment, Share,},
  data() {
    return {
      height: 0,
      width: 0,
    }
  },
  mounted() {
    // this.height = document.body.clientHeight
    // this.width = document.body.clientWidth
  },
  methods: {},
  created() {

  },

}
</script>
<style scoped lang="less">
#home-index {
  height: 100%;
  width: 100%;
}
</style>