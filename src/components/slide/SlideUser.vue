<template>
  <div id="SlideUser">
    <div class="content">
      <img
        @click="$emit('close')"
        class="close"
        src="../../assets/img/icon/components/gray-close-full.png"
        alt=""
      />
      <img class="avatar" :src="modelValue.avatar" />
      <div class="name">{{ modelValue.name }}</div>
      <div class="desc">
        <div class="tag">{{ modelValue.age }}岁</div>
        <div class="tag">成都</div>
        <div class="tag">清华大学</div>
      </div>
      <div class="realName">通讯录朋友{{ modelValue.realName }}</div>
      <div class="poster-wrapper">
        <div
          class="poster-item"
          :key="index"
          v-for="(i, index) in modelValue.videos.slice(0, 3)"
          @click="_no"
        >
          <img class="poster" :src="_checkImgUrl(i.cover)" />
          <div class="num">
            <img class="love" src="../../assets/img/icon/love.svg" alt="" />
            <span>{{ _formatNumber(i.digg_count) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <base-button type="info">换一个</base-button>
      <base-button type="primary">关注</base-button>
    </div>
  </div>
</template>
<script>
import { _checkImgUrl, _formatNumber, _no } from '../../utils'
import BaseButton from '../BaseButton'

export default {
  name: 'SlideUser',
  components: {
    BaseButton
  },
  props: {
    modelValue: {
      type: Object,
      default() {
        return {
          type: 'user',
          id: '224e9a00-ffa0-4bc1-bb07-c318c7b02fa5',
          avatar: new URL('../../assets/img/icon/avatar/1.png', import.meta.url).href,
          name: '何以为家',
          realName: '王小二',
          sex: '',
          age: 25,
          idCard: null,
          phone: '',
          address: null,
          wechat: '',
          password: null,
          lastLoginTime: '1629993515',
          createTime: '1630035089',
          isDelete: 0,
          account: '234',
          pinyin: 'H',
          select: false,
          videos: [
            {
              id: '13b462dd-8d81-4744-93ed-815941f4ed3e',
              cover:
                'http://p6.douyinpic.com/img/tos-cn-p-0015/efebaff8e1df46928522e1ac5583d059~c5_300x400.jpeg?from=4257465056_large',
              dynamic_cover:
                'http://p29.douyinpic.com/obj/tos-cn-p-0015/efebaff8e1df46928522e1ac5583d059?from=4257465056_large',
              origin_cover:
                'http://p3.douyinpic.com/tos-cn-p-0015/d834cf36d4be462f92206543306ff362_1623571220~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover',
              video:
                'http://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c32rloe8vall584jaad0&line=1&file_id=d6daaa72874445f5a71c2a671ec9abd4&sign=62621a8cd9f89bab74fb31daa201e148&is_play_url=1&source=PackSourceEnum_PUBLISH',
              video_data_size: 8569489,
              duration: 148612,
              desc: '几分钟看科幻片《徐福》 #我的观影报告  #抖音电影',
              allow_download: 1,
              allow_duet: 0,
              allow_react: 0,
              allow_music: 1,
              allow_douplus: 1,
              allow_share: 1,
              digg_count: 55,
              comment_count: 0,
              download_count: 0,
              play_count: 0,
              share_count: 0,
              forward_count: 0,
              collect_count: 0,
              sort: 24,
              is_top: 0,
              city: '350100',
              musicId: '286f9f80-d497-4914-a5be-65686916e3fe',
              create_time: '1630391775',
              creator_id: '54884802577',
              status: 1,
              topics: [
                {
                  id: '41821c6d-e14f-47f1-a391-f0b1f42afbe1',
                  name: '抖音电影',
                  creator_id: '54884802577',
                  create_time: '1630391758',
                  status: 1
                },
                {
                  id: 'c10178eb-441f-4dc7-93b6-eaae1b6248cc',
                  name: '我的观影报告',
                  creator_id: '54884802577',
                  create_time: '1630391758',
                  status: 1
                }
              ],
              music: {
                id: '8ce2cb26-4772-4c7b-91d9-a2580c667c21',
                cover:
                  'http://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172',
                mp3: 'http://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3',
                title: '@喵嗷污说电影创作的原声',
                creator_id: '54884802577',
                create_time: '1630391758',
                status: 1
              }
            },
            {
              id: '1f6871da-73ab-40cc-9481-37ad83b63bde',
              cover:
                'http://p3.douyinpic.com/img/tos-cn-p-0015/ba34a7304d6e44cfb159b838e1a6c980~c5_300x400.jpeg?from=4257465056_large',
              dynamic_cover:
                'http://p3.douyinpic.com/obj/tos-cn-p-0015/ba34a7304d6e44cfb159b838e1a6c980?from=4257465056_large',
              origin_cover:
                'http://p26.douyinpic.com/tos-cn-p-0015/25898d01cf9c44c2ae63874546d75640_1623570870~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover',
              video:
                'http://api.amemv.com/aweme/v1/play/?video_id=v0d00fg10000c32rhslhtod769sv81r0&line=1&file_id=b16315d063594519a6b9102905da92a7&sign=eef97e748e50854547d9cd10b29e2ead&is_play_url=1&source=PackSourceEnum_PUBLISH',
              video_data_size: 10901859,
              duration: 188250,
              desc: '科学家为永生改造人类基因，结果创造出能力逆天的新物种完虐人类 #我的观影报告',
              allow_download: 1,
              allow_duet: 0,
              allow_react: 0,
              allow_music: 1,
              allow_douplus: 1,
              allow_share: 1,
              digg_count: 24,
              comment_count: 0,
              download_count: 0,
              play_count: 0,
              share_count: 0,
              forward_count: 0,
              collect_count: 0,
              sort: 25,
              is_top: 0,
              city: '350100',
              musicId: '5ce6dd54-62eb-46d4-8d71-40b3776bee50',
              create_time: '1630391775',
              creator_id: '54884802577',
              status: 1,
              topics: [
                {
                  id: 'c10178eb-441f-4dc7-93b6-eaae1b6248cc',
                  name: '我的观影报告',
                  creator_id: '54884802577',
                  create_time: '1630391758',
                  status: 1
                }
              ],
              music: {
                id: '8ce2cb26-4772-4c7b-91d9-a2580c667c21',
                cover:
                  'http://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172',
                mp3: 'http://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3',
                title: '@喵嗷污说电影创作的原声',
                creator_id: '54884802577',
                create_time: '1630391758',
                status: 1
              }
            },
            {
              id: 'f7657f21-5fee-4f1f-9d88-ec8411ea009b',
              cover:
                'http://p3.douyinpic.com/img/tos-cn-p-0015/ef15ae6839104e80871f521447a97b0a~c5_300x400.jpeg?from=4257465056_large',
              dynamic_cover:
                'http://p11.douyinpic.com/obj/tos-cn-p-0015/ef15ae6839104e80871f521447a97b0a?from=4257465056_large',
              origin_cover:
                'http://p5-ipv6.douyinpic.com/tos-cn-p-0015/70f6b5f352d4425e8944c038b932c8fd_1623570188~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover',
              video:
                'http://api.amemv.com/aweme/v1/play/?video_id=v0d00fg10000c32rdevdoca093n6gtn0&line=1&file_id=6bd8e6e959b44d83b5ebbd486134aafc&sign=f592f3089c2a3ddae2042ff85bf9ec6f&is_play_url=1&source=PackSourceEnum_PUBLISH',
              video_data_size: 19324714,
              duration: 300655,
              desc: '科学家为永生改造人类基因，结果创造出能力逆天的新物种完虐人类 #我的观影报告',
              allow_download: 0,
              allow_duet: 0,
              allow_react: 0,
              allow_music: 1,
              allow_douplus: 1,
              allow_share: 1,
              digg_count: 19,
              comment_count: 1,
              download_count: 0,
              play_count: 0,
              share_count: 0,
              forward_count: 0,
              collect_count: 0,
              sort: 26,
              is_top: 0,
              city: '350100',
              musicId: '8170be64-2950-425d-aa7f-b8b6100ed51b',
              create_time: '1630391775',
              creator_id: '54884802577',
              status: 1,
              topics: [
                {
                  id: 'c10178eb-441f-4dc7-93b6-eaae1b6248cc',
                  name: '我的观影报告',
                  creator_id: '54884802577',
                  create_time: '1630391758',
                  status: 1
                }
              ],
              music: {
                id: '8ce2cb26-4772-4c7b-91d9-a2580c667c21',
                cover:
                  'http://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172',
                mp3: 'http://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3',
                title: '@喵嗷污说电影创作的原声',
                creator_id: '54884802577',
                create_time: '1630391758',
                status: 1
              }
            }
          ]
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log('modelValue', this.modelValue)
  },
  methods: { _formatNumber, _checkImgUrl, _no }
}
</script>

<style scoped lang="less">
@p: 15rem;
#SlideUser {
  width: 100%;
  height: 100%;
  //background: #e1e1e1;
  background: linear-gradient(to bottom, rgb(49, 75, 98), rgb(65, 48, 40));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 @p;
  box-sizing: border-box;

  .content {
    width: 100%;
    background: linear-gradient(to bottom, rgb(71, 90, 110), rgb(97, 84, 75));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15rem;
    //box-shadow: 0 0 2rem 0 #b3b3b3;
    padding: 15rem;
    color: black;
    position: relative;

    .close {
      top: 15rem;
      right: 15rem;
      width: 25rem;
      height: 25rem;
      position: absolute;
    }

    .avatar {
      width: 120rem;
      border-radius: 50%;
    }

    .name {
      margin-top: 20rem;
      margin-bottom: 20rem;
      font-size: 20rem;
      letter-spacing: 4rem;
      color: white;
    }

    .desc {
      display: flex;

      .tag {
        margin: 0 3rem;
        font-size: 10rem;
        background: rgba(161, 158, 156, 0.3);
        color: gainsboro;
        padding: 3rem 5rem;
        border-radius: 4rem;
      }
    }

    .realName {
      text-align: center;
      color: gainsboro;
      border-top: 1px solid #5e5a5a;
      border-bottom: 1px solid #5e5a5a;
      padding: 10rem 0;
      margin: 15rem 0;
      font-size: 14rem;
      letter-spacing: 1.5rem;
      width: 90%;
    }

    .poster-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 31%);

      grid-column-gap: 3.5%;
      grid-row-gap: 2%;
    }

    .poster-item {
      border-radius: 8rem;
      overflow: hidden;
      position: relative;

      .poster {
        width: 100%;
        height: 100%;
        display: block;
      }

      .num {
        color: white;
        position: absolute;
        bottom: 5rem;
        left: 5rem;
        display: flex;
        align-items: center;
        font-size: 12rem;

        .love {
          width: 12rem;
          height: 12rem;
          margin-right: 5rem;
        }
      }
    }
  }

  .options {
    position: absolute;
    bottom: 20rem;
    display: flex;
    justify-content: space-between;
    left: @p;
    right: @p;

    .button {
      width: 48%;
    }
  }
}
</style>
