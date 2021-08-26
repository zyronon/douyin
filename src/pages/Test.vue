<template>
  <div class="Test">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">申报学校信息</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Share :isSharing="true"/>
    </div>
  </div>
</template>
<script>
import SlideColumnList from "../components/slide/SlideColumnList";
import SlideRowList from "../components/slide/SlideRowList";
import Video1 from "../components/Video";
import Comment from "../components/Comment";
import Share from "../components/Share";
import Me from "./me/Me";

export default {
  name: "Test",
  props: {},
  components: {SlideColumnList, SlideRowList, Video1, Comment, Share, Me},
  data() {
    return {
      videos: [
        {
          "id": "d2f55373-80dd-4c14-93a7-7a40e9cbf049",
          "posterUrl": "images/20210815/0.png",
          "videoUrl": "http://qy9rc9xff.hn-bkt.clouddn.com/9.mp4",
          "title": "",
          "likeNum": null,
          "commentNum": null,
          "sharedNum": null,
          "duration": null,
          "musicId": "126f9654-450b-466c-8003-085199a7f9b9",
          "browseCount": 0,
          "createTime": "1629683008",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1
        }
      ],
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }
}
</style>
