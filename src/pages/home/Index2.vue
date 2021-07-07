<template>
  <div id="home-index">
    <SlideListVirtual direction="column"
                      ref="ssss"
                      :virtual="true"
                      :list="videos"
                      :renderSlide="render"
                      v-model:active-index="videoActiveIndex"
                      @end="end"
    >
    </SlideListVirtual>
    <Comment v-model:is-commenting="isCommenting"/>
    <Share v-model:is-sharing="isSharing" ref="share"/>
  </div>
</template>

<script>
import SlideListVirtual from './SlideListVirtual'
import src1Bg from '../../assets/img/poster/src1-bg.png'
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

export default {
  name: "HomeIndex",
  components: {SlideListVirtual, Video1, Comment, Share,},
  data() {
    return {
      videos1: [
        {
          // videoUrl: mp40,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/0.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp41,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/1.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp42,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/2.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp43,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/3.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp44,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/4.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp45,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/5.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp46,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/6.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp47,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/7.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp48,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/8.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp49,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/9.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp410,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/10.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
      ],
      videos: [
        {
          videoUrl: mp40,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/0.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp41,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/1.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp42,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/2.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp43,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/3.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp44,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/4.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp45,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/5.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp46,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/6.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp47,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/7.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp48,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/8.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp49,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/9.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp410,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/10.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
      ],
      isCommenting: false,
      isSharing: false,
      videoActiveIndex: 0,
      render: (item, itemIndex) => {
        return (
            <div className="base-slide-item" data-index={itemIndex}>
              <Video1 disabled={itemIndex !== 0}
                      video={item}
                      index={itemIndex}
                      onShowComments={e => this.isCommenting = true}
                      onShowShare={e => this.isSharing = true}
                      v-model={[this.videos[itemIndex], 'video']}
              />
            </div>
        )
      }
    }
  },
  watch: {
    videoActiveIndex(newVal) {
      // console.log(newVal)
      $(".base-slide-item").each(function () {
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
      // if (newVal >= this.videos.length - 3) {
      if (false) {
        [{
          videoUrl: mp40,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
          {
            videoUrl: mp41,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: true,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
          {
            videoUrl: mp42,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: false,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
          {
            videoUrl: mp43,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: false,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
          {
            videoUrl: mp44,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: false,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
        ].map(v => {
          this.videos.push(v)
        })

      }
    }
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  },
  methods: {
    t(e) {
      console.log(e)
    },
    end(){
      console.log('end')
      setTimeout(()=>{
        [{
          videoUrl: mp40,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
          {
            videoUrl: mp41,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: true,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
          {
            videoUrl: mp42,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: false,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
          {
            videoUrl: mp43,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: false,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
          {
            videoUrl: mp44,
            // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
            videoPoster: src1Bg,
            isLoved: false,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },
        ].map(v => {
          this.videos.push(v)
        })
      },5000)
    }

  }
}
</script>
<style scoped lang="scss">
#home-index {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>