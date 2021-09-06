<template>
  <div id="home-index">
    <SlideRowList
        name="baseSlide"
        v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideRowList
            v-model:active-index="activeIndex"
            :showIndicator="true"
            :useHomeLoading="true"
        >
          <SlideItem>
            <SlideColumnList>
              <SlideItem style="background: tan">
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
            </SlideColumnList>
          </SlideItem>
          <SlideItem>
            <SlideColumnVirtualList
                ref="slideList"
                :list="videos"
                :renderSlide="render"
                v-model:active-index="videoActiveIndex"
                v-model:active-index1="videoActiveIndex"
                @end="end"
            >
            </SlideColumnVirtualList>
          </SlideItem>
        </SlideRowList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem style="font-size: 40px;overflow:auto;">
        <Uploader/>
      </SlideItem>
    </SlideRowList>

    <Comment v-model="isCommenting"/>

    <Share v-model="isSharing"
           ref="share"
           @dislike="dislike"
           :videoId="videos[videoActiveIndex]?.id"
           :canDownload="videos[videoActiveIndex]?.canDownload"
           @play-feedback="showPlayFeedback = true"
           @showShareDuoshan="showShareDuoshan = true"
           @showDouyinCode="showDouyinCode = true"
           @showShare2WeChatZone="shareType = 2"
           @share2WeChat="shareType = 3"
           @share2QQZone="shareType = 4"
           @share2QQ="shareType = 5"
           @share2Webo="shareType = 8"
           @download="shareType = 9"
    />
    <PlayFeedback v-model="showPlayFeedback"/>

    <DouyinCode v-model="showDouyinCode"></DouyinCode>

    <Duoshan v-model="showShareDuoshan"/>

    <ShareTo v-model:type="shareType"
             :videoId="videos[videoActiveIndex]?.id"
             :canDownload="videos[videoActiveIndex]?.canDownload"
    />
  </div>
</template>
<script>
import Video1 from "../../components/Video.vue";
import mp40 from "../../assets/video/0.mp4";
import mp41 from "../../assets/video/1.mp4";
import mp42 from "../../assets/video/2.mp4";
import mp43 from "../../assets/video/3.mp4";
import mp44 from "../../assets/video/4.mp4";
import mp45 from "../../assets/video/5.mp4";
import mp46 from "../../assets/video/6.mp4";
import mp47 from "../../assets/video/7.mp4";
import mp48 from "../../assets/video/8.mp4";
import mp49 from "../../assets/video/9.mp4";
import mp410 from "../../assets/video/10.mp4";
import Comment from "../../components/Comment";
import Share from "../../components/Share";
import SlideColumnList from "../../components/slide/SlideColumnList";
import SlideRowList from "../../components/slide/SlideRowList";
import PlayFeedback from "./components/PlayFeedback";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import Duoshan from "./components/Duoshan";
import ShareTo from "./components/ShareTo";
import DouyinCode from "../../components/DouyinCode";
import Uploader from "../me/Uploader";

export default {
  name: "HomeIndex",
  components: {
    FromBottomDialog,
    SlideColumnList,
    SlideRowList,
    Video1,
    Comment,
    Share,
    Uploader,
    PlayFeedback,
    Duoshan,
    ShareTo,
    DouyinCode
  },
  data() {
    return {
      webVideos: [
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
      videos: [
        // {
        //   "id": "d2f55373-80dd-4c14-93a7-7a40e9cbf049",
        //   "posterUrl": "images/20210815/0.png",
        //   "videoUrl": "http://qy9rc9xff.hn-bkt.clouddn.com/29.mp4",
        //   "title": "",
        //   "likeNum": null,
        //   "commentNum": null,
        //   "sharedNum": null,
        //   "duration": null,
        //   "musicId": "126f9654-450b-466c-8003-085199a7f9b9",
        //   "browseCount": 0,
        //   "createTime": "1629683008",
        //   "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
        //   "status": 1
        // }
      ],
      localVideos: [
        {
          "id": "64e630f4-4dde-4f36-904c-d5ac87a603cb",
          "posterUrl": "images/20210815/9.png",
          "videoUrl": mp40,
          "title": "",
          "likeNum": "2974815",
          "commentNum": "18643",
          "sharedNum": "56",
          "duration": null,
          "musicId": "162e69b5-e7fa-4901-b8c2-642ec5120aaf",
          "browseCount": 10,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "e59e3bf5-5ef7-4d9e-b697-5f9793cbcbbf",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp41,
          "title": "",
          "likeNum": "6845576",
          "commentNum": "13878",
          "sharedNum": "23",
          "duration": null,
          "musicId": "9f84ace3-fb8c-4425-9497-0ead5552d3bd",
          "browseCount": 12,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "21c4d0e6-4895-44cf-abae-1ad6d4e51cfe",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp42,
          "title": "",
          "likeNum": "4312856",
          "commentNum": "14431",
          "sharedNum": "46",
          "duration": null,
          "musicId": "d0ed8333-f5dd-450d-8601-8680fd000b1a",
          "browseCount": 16,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "064641ac-ad85-4bf4-8635-cf551c1c8e72",
          "posterUrl": "images/20210815/1.png",
          "videoUrl": mp43,
          "title": "",
          "likeNum": "9138571",
          "commentNum": "11676",
          "sharedNum": "44",
          "duration": null,
          "musicId": "1b6adc43-bde8-49ce-8189-85c628d4e581",
          "browseCount": 17,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "390fa5ba-c818-4f07-bcc2-9131c632f4e0",
          "posterUrl": "images/20210815/6.png",
          "videoUrl": mp44,
          "title": "",
          "likeNum": "2110846",
          "commentNum": "14968",
          "sharedNum": "89",
          "duration": null,
          "musicId": "d7bc93e8-5855-4493-a2b7-a102331e2af4",
          "browseCount": 17,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "7bb2ba92-5d84-4182-8bd5-961adcec7ea0",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp45,
          "title": "",
          "likeNum": "4969051",
          "commentNum": "27551",
          "sharedNum": "68",
          "duration": null,
          "musicId": "29bdd695-dff5-47cc-8757-6de238d41fbf",
          "browseCount": 18,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "5556b24d-ac38-4528-87eb-2ac98c202202",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp46,
          "title": "",
          "likeNum": "6497884",
          "commentNum": "13283",
          "sharedNum": "50",
          "duration": null,
          "musicId": "f11ca116-cce4-489f-a2d5-2564f12fe26f",
          "browseCount": 31,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "37d1300e-6051-471b-9b10-80a171a23564",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp47,
          "title": "",
          "likeNum": "2686730",
          "commentNum": "50",
          "sharedNum": "44",
          "duration": null,
          "musicId": "5065d308-04f9-4bd5-9a41-87f18669462c",
          "browseCount": 33,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "5c0dc10a-2d21-41de-9055-d5e6f071391a",
          "posterUrl": "images/20210815/2.png",
          "videoUrl": mp48,
          "title": "",
          "likeNum": "1844972",
          "commentNum": "5841",
          "sharedNum": "83",
          "duration": null,
          "musicId": "de466ede-b5aa-4d6d-80ca-b14e8adfa70b",
          "browseCount": 33,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "e489d928-bd07-4767-8ca2-67ebe10086cd",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp49,
          "title": "",
          "likeNum": "7449972",
          "commentNum": "5261",
          "sharedNum": "75",
          "duration": null,
          "musicId": "3cba7f06-8641-4a1b-8462-027024c7ae0c",
          "browseCount": 33,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
        {
          "id": "e489d928-bd07-4767-8ca2-67ebe10086cd1",
          "posterUrl": "images/20210815/11.png",
          "videoUrl": mp410,
          "title": "",
          "likeNum": "7449972",
          "commentNum": "5261",
          "sharedNum": "75",
          "duration": null,
          "musicId": "3cba7f06-8641-4a1b-8462-027024c7ae0c",
          "browseCount": 33,
          "createTime": "1630175885",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1,
          "canDownload": true
        },
      ],
      isCommenting: false,
      isSharing: false,

      shareType: -1,

      showPlayFeedback: false,
      showShareDuoshan: false,
      showShareDialog: false,
      showShare2WeChatZone: false,
      showDouyinCode: false,

      videoActiveIndex: 0,
      baseActiveIndex: 0,
      activeIndex: 1,
      totalSize: 52,
      pageSize: 10,
      pageNo: 1,
      loading: false,
      render: (item, itemIndex, play) => {
        return (
            <div className="base-slide-item video-slide-item" data-index={itemIndex}>
              <Video1
                  play={play}
                  video={item}
                  index={itemIndex}
                  onShowComments={e => this.isCommenting = true}
                  onShowShare={e => this.isSharing = true}
                  onGoUserInfo={e => this.baseActiveIndex = 1}
                  v-model={[this.videos[itemIndex], 'video']}
              />
            </div>
        )
      }
    }
  },
  watch: {
    videoActiveIndex(newVal) {
      $(".video-slide-item").each(function () {
        let video = $(this).find('video')
        if ($(this).data('index') === newVal) {
          video.trigger('play')
        } else {
          video.trigger('pause')
          setTimeout(() => {
            video[0].currentTime = 0
          }, 100)
        }
      })
      if (newVal >= this.videos.length - 3 && newVal < this.totalSize) {
        if (this.loading) return
        this.pageNo++
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  },
  methods: {
    dislike() {
      this.$notice('操作成功，将减少此类视频的推荐')
    },
    async getData() {
      if (process.env.NODE_ENV !== 'development') {
        this.totalSize = 11
        return this.videos = this.$clone(this.localVideos)
      }
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.count
        this.videos = this.videos.concat(res.data.list)
        // this.videos = this.$clone(this.localVideos)
      } else {
        this.pageNo--
      }
    },
    t(e) {
      console.log(e)
    },
    end() {
      this.$notice('暂时没有更多了')
    }
  }
}
</script>
<style scoped lang="less">
#home-index {
  height: 100%;
  width: 100%;
  //z-index: 4;
  position: relative;
}
</style>