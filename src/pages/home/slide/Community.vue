<template>
  <div id="Community">
    <Scroll class="Scroll"
            @pulldown="loadData">
      <div v-masonry class="goods-list"
           transition-duration="0s"
           item-selector=".goods">
        <div v-masonry-tile class="goods"
             @click="$nav('album-detail')"
             v-for="(item, index) in  data">
          <div class="card">
            <!--          <img class="poster" v-lazy="Utils.$imgPreview(item.src)"/>-->
            <img class="poster" :src="Utils.$imgPreview(item.note_card.cover.url_default)"/>
            <div class="bottom">
              <div class="title">
                {{ item.note_card.display_title }}
              </div>
              <div class="b2">
                <div class="user">
                  <img class="avatar" :src="Utils.$imgPreview(item.note_card.user.avatar)"/>
                  <div class="name">{{ item.note_card.user.nickname }}</div>
                </div>
                <div class="star">
                  <img src="@/assets/img/icon/components/like-gray-small.png" alt="" class="love-image">
                  <div class="num">{{ item.note_card.interact_info.liked_count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import Utils, {$no, _formatNumber} from "@/utils";
import Scroll from "@/components/Scroll.vue";


const data = [
  {
    "ignore": false,
    "id": "65f65eb000000000120358a7",
    "model_type": "note",
    "note_card": {
      "cover": {
        "height": 1920,
        "width": 1440,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/b25b558e0520f0b4b30b83ed3879eb99/1040g2sg310e99lh2mg005o11389g8lflgga7gm0!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/719bd40172834e4a67c77cc3c0f7b39c/1040g2sg310e99lh2mg005o11389g8lflgga7gm0!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/b25b558e0520f0b4b30b83ed3879eb99/1040g2sg310e99lh2mg005o11389g8lflgga7gm0!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/719bd40172834e4a67c77cc3c0f7b39c/1040g2sg310e99lh2mg005o11389g8lflgga7gm0!nc_n_webp_mw_1",
        "file_id": ""
      },
      "type": "normal",
      "display_title": "雍正登基时为何放过了八爷党的敦亲王？",
      "user": {
        "nick_name": "慢歌吟游",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30t0joeifjs005o11389g8lflq541nvg",
        "user_id": "60211a1300000000010055f5",
        "nickname": "慢歌吟游"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo"
  },
  {
    "model_type": "note",
    "note_card": {
      "type": "video",
      "display_title": "就这样和你走遍全世界",
      "user": {
        "user_id": "5b1ccd45e8ac2b7ae5ac310b",
        "nickname": "王总kk",
        "nick_name": "王总kk",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/613409df6e99b1131978b41f.jpg"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "file_id": "",
        "height": 1440,
        "width": 1080,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/366235c2212e5cbdb54c7d747594e5d4/1040g008310d00t5oma704a64k56kac8b8p0n560!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/a0f955c552c25a5143572e52e372f156/1040g008310d00t5oma704a64k56kac8b8p0n560!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/366235c2212e5cbdb54c7d747594e5d4/1040g008310d00t5oma704a64k56kac8b8p0n560!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/a0f955c552c25a5143572e52e372f156/1040g008310d00t5oma704a64k56kac8b8p0n560!nc_n_webp_mw_1"
      },
      "video": {
        "capa": {
          "duration": 11
        }
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f50ca50000000013025447"
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65e12f4000000000040026e4",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "晨跑+野百合也有春天",
      "user": {
        "nick_name": "北斗",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/5d1171b6000000001203318e.jpg",
        "user_id": "5d1171b6000000001203318e",
        "nickname": "北斗"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/5720f8905557af46c39defbbdae8d2a3/1040g00830vpj8c8am26g5n8he6r4mccek898lg8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/1f4384829a9c5f6a2235aac961dbac28/1040g00830vpj8c8am26g5n8he6r4mccek898lg8!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1707,
        "width": 1280,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/5720f8905557af46c39defbbdae8d2a3/1040g00830vpj8c8am26g5n8he6r4mccek898lg8!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/1f4384829a9c5f6a2235aac961dbac28/1040g00830vpj8c8am26g5n8he6r4mccek898lg8!nc_n_webp_mw_1"
          }
        ]
      }
    }
  },
  {
    "id": "65dbfcf5000000000702417c",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "不懂pdd这是在欺骗消费者吗？",
      "user": {
        "nickname": "一口啃个大胖子～",
        "nick_name": "一口啃个大胖子～",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30r76k4u61m005oduqru41niqmr663qg",
        "user_id": "61bed6fc000000001000de5a"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "height": 2532,
        "width": 1170,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/a15e6948298da3c6cbc5c07fd88f8239/1040g2sg30vkgru2hlq005oduqru41niqok2j44g!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/3740ff67e5acaa6357feb3d279462056/1040g2sg30vkgru2hlq005oduqru41niqok2j44g!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/a15e6948298da3c6cbc5c07fd88f8239/1040g2sg30vkgru2hlq005oduqru41niqok2j44g!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/3740ff67e5acaa6357feb3d279462056/1040g2sg30vkgru2hlq005oduqru41niqok2j44g!nc_n_webp_mw_1",
        "file_id": ""
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f4b0c50000000012030dad",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "我好勇啊…………穿这样都敢去买lv🥹",
      "user": {
        "nick_name": "momo",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/600e732cd813e5d5cf842006.jpg",
        "user_id": "5ff4655a000000000101cb5a",
        "nickname": "momo"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/64b30a0680aa2ebea3209755789425d9/1040g2sg310ckmqn66k3g5nvkcld0biqqsihhhrg!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/73f629bf8fdf1a1f3c08e24050a36e1a/1040g2sg310ckmqn66k3g5nvkcld0biqqsihhhrg!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/64b30a0680aa2ebea3209755789425d9/1040g2sg310ckmqn66k3g5nvkcld0biqqsihhhrg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/73f629bf8fdf1a1f3c08e24050a36e1a/1040g2sg310ckmqn66k3g5nvkcld0biqqsihhhrg!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2560
      }
    }
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f6755300000000130279f3",
    "model_type": "note",
    "note_card": {
      "interact_info": {
        "liked_count": "100+",
        "liked": false
      },
      "cover": {
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/14f9595a9dfdf249768d86448ac130b3/1040g2sg310ec23u36k605p8jod895s0ci6sb1p8!nc_n_webp_prv_1"
          },
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/6f8c33334da7ffa3eb9a96ae7611450e/1040g2sg310ec23u36k605p8jod895s0ci6sb1p8!nc_n_webp_mw_1",
            "image_scene": "WB_DFT"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/14f9595a9dfdf249768d86448ac130b3/1040g2sg310ec23u36k605p8jod895s0ci6sb1p8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/6f8c33334da7ffa3eb9a96ae7611450e/1040g2sg310ec23u36k605p8jod895s0ci6sb1p8!nc_n_webp_mw_1",
        "file_id": "",
        "height": 639,
        "width": 448
      },
      "type": "normal",
      "display_title": "去年才考进我们银行的00后，今天辞职了....",
      "user": {
        "nick_name": "封涵",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pgvrlg7mm605p8jod895s0c8no3t3o",
        "user_id": "6513c350000000002402f00c",
        "nickname": "封涵"
      }
    }
  },
  {
    "id": "65d571410000000007025ea4",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "春孔雀 ",
      "user": {
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/63eb9c07e9f88e4ccdf8ed5b.jpg",
        "user_id": "5d3673f7000000001101f494",
        "nickname": "小米想吃大米",
        "nick_name": "小米想吃大米"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/4c1e4844c5fcaa7494b7b4bcff81cf7c/1040g00830ve4a6k962105n9mefrkbt4ktgres0o!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/e3da05f9157151de49821fe43660f1a1/1040g00830ve4a6k962105n9mefrkbt4ktgres0o!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/4c1e4844c5fcaa7494b7b4bcff81cf7c/1040g00830ve4a6k962105n9mefrkbt4ktgres0o!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/e3da05f9157151de49821fe43660f1a1/1040g00830ve4a6k962105n9mefrkbt4ktgres0o!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1919,
        "width": 1439
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65ee71dd0000000012034e02",
    "model_type": "note",
    "note_card": {
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "file_id": "",
        "height": 1707,
        "width": 1280,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/0b07c16eb07d601660c7b6a3c69722b1/1040g2sg3106hkj985s004a6kc7vuk11hjds87ao!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/0edfd318cf64f8eddd01522724bc822a/1040g2sg3106hkj985s004a6kc7vuk11hjds87ao!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/0b07c16eb07d601660c7b6a3c69722b1/1040g2sg3106hkj985s004a6kc7vuk11hjds87ao!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/0edfd318cf64f8eddd01522724bc822a/1040g2sg3106hkj985s004a6kc7vuk11hjds87ao!nc_n_webp_mw_1"
      },
      "type": "normal",
      "display_title": "山里的小胖橘真会享受",
      "user": {
        "nick_name": "阿丽丽Alili",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/651c32f90226271fc0074b64.jpg",
        "user_id": "5b333feaf7e8b970bada0431",
        "nickname": "阿丽丽Alili"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65d55462000000000700545b",
    "model_type": "note",
    "note_card": {
      "type": "video",
      "display_title": "目标90，我拼了 ",
      "user": {
        "user_id": "64e4e9b2000000000100e4e9",
        "nickname": "林老师的轻食餐",
        "nick_name": "林老师的轻食餐",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30ol7p0ib2c005p74t6p09p79tb7e780"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/ca7eb0b476b5e9e28998eacd7a2e6831/1040g2sg30ve0per7ls005p74t6p09p79bjtrdfg!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/479e3c6f13f7e8254fa55a89b667002b/1040g2sg30ve0per7ls005p74t6p09p79bjtrdfg!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/ca7eb0b476b5e9e28998eacd7a2e6831/1040g2sg30ve0per7ls005p74t6p09p79bjtrdfg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/479e3c6f13f7e8254fa55a89b667002b/1040g2sg30ve0per7ls005p74t6p09p79bjtrdfg!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1312,
        "width": 984,
        "url": ""
      },
      "video": {
        "capa": {
          "duration": 6
        }
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65f2804a000000001203d6ee",
    "model_type": "note",
    "note_card": {
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "height": 1756,
        "width": 1317,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/e656a244a254855f57c5f62e95609f3b/1040g2sg310afrupsme104a3449575t994i3j3j0!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/366281ec52884a7940d7f50ac7e83cf5/1040g2sg310afrupsme104a3449575t994i3j3j0!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/e656a244a254855f57c5f62e95609f3b/1040g2sg310afrupsme104a3449575t994i3j3j0!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/366281ec52884a7940d7f50ac7e83cf5/1040g2sg310afrupsme104a3449575t994i3j3j0!nc_n_webp_mw_1",
        "file_id": ""
      },
      "type": "normal",
      "display_title": "一点点甘蔗新品。。后悔点了",
      "user": {
        "nick_name": "叶总早上好",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/6457bb651300c5cf9d39c631.jpg",
        "user_id": "5a9cca72e8ac2b719134f529",
        "nickname": "叶总早上好"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65e001be0000000004000041",
    "model_type": "note",
    "note_card": {
      "user": {
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30n7i9f1b5cd05onpvimkhim2jt0hk8o",
        "user_id": "62f9fcad000000001200cac2",
        "nickname": "康盼盼",
        "nick_name": "康盼盼"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/0116f1d1f6b57b99582170ced1711a08/1040g2sg30voeek5alu605onpvimkhim23vejk00!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/e162bde8a7f3d8f654dbbaaf66ecc6f3/1040g2sg30voeek5alu605onpvimkhim23vejk00!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/0116f1d1f6b57b99582170ced1711a08/1040g2sg30voeek5alu605onpvimkhim23vejk00!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/e162bde8a7f3d8f654dbbaaf66ecc6f3/1040g2sg30voeek5alu605onpvimkhim23vejk00!nc_n_webp_mw_1"
      },
      "type": "normal",
      "display_title": "不是…没人敢说嘛 "
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "ignore": false,
    "id": "65e7f5020000000003036971",
    "model_type": "note",
    "note_card": {
      "user": {
        "nick_name": "天亮就睡",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/60d4365bc7baa57f7d912db4.jpg",
        "user_id": "5dd112f70000000001003ad5",
        "nickname": "天亮就睡"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "file_id": "",
        "height": 1920,
        "width": 1440,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/31e5921ff1c808094558f448eda02d47/1040g2sg31006smo3ls0g5neh2brg8emls2i71v0!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/8d3db7fa9c27ce69aa8b6a2d8c42a6cd/1040g2sg31006smo3ls0g5neh2brg8emls2i71v0!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/31e5921ff1c808094558f448eda02d47/1040g2sg31006smo3ls0g5neh2brg8emls2i71v0!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/8d3db7fa9c27ce69aa8b6a2d8c42a6cd/1040g2sg31006smo3ls0g5neh2brg8emls2i71v0!nc_n_webp_mw_1"
      },
      "type": "normal",
      "display_title": "可颂包🥐 "
    },
    "track_id": "2d03b4zu9s4myx94zg5lo"
  },
  {
    "note_card": {
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/a47636d49ea3a631d535d1dbaf8594cb/1040g2sg310a162ok6o004a68a1f44gfbn5ru1jg!nc_n_webp_prv_1"
          },
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/17e0b75a01d11888eb96f467170ec6d5/1040g2sg310a162ok6o004a68a1f44gfbn5ru1jg!nc_n_webp_mw_1",
            "image_scene": "WB_DFT"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/a47636d49ea3a631d535d1dbaf8594cb/1040g2sg310a162ok6o004a68a1f44gfbn5ru1jg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/17e0b75a01d11888eb96f467170ec6d5/1040g2sg310a162ok6o004a68a1f44gfbn5ru1jg!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2560
      },
      "type": "normal",
      "display_title": "朋友说我戴上墨镜比不带好看",
      "user": {
        "nick_name": "AT",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30oklqkmniu004a68a1f44gfbro8tho0",
        "user_id": "5b21de42f7e8b967042541eb",
        "nickname": "AT"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f203a900000000140065dd",
    "model_type": "note"
  },
  {
    "id": "65ed32c30000000013027077",
    "model_type": "note",
    "note_card": {
      "display_title": "求求Pxx的强推好物！！（啥都行）",
      "user": {
        "nick_name": "鹅",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1000g2jo2jer8v2uim06g5nj92k20875jm078a5g",
        "user_id": "5e6915040000000001001cb3",
        "nickname": "鹅"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "width": 1101,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/83b70115e3948ee1f82706638f6c2231/1040g0083105am46pm2005nj92k20875j1mtb3gg!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/565c8d51400b3b457a8cd9a38711e1c0/1040g0083105am46pm2005nj92k20875j1mtb3gg!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/83b70115e3948ee1f82706638f6c2231/1040g0083105am46pm2005nj92k20875j1mtb3gg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/565c8d51400b3b457a8cd9a38711e1c0/1040g0083105am46pm2005nj92k20875j1mtb3gg!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1429
      },
      "type": "normal"
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65ea21670000000003036639",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "春天里最贵的菜 ",
      "user": {
        "nick_name": "POPEYE教练",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/6421b56b8d4f36b74656d6db.jpg",
        "user_id": "5fc0447b00000000010055c0",
        "nickname": "POPEYE教练"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "10+"
      },
      "cover": {
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/54f04c1ead57528b575a3d3e6c8158c6/1040g0083102aqa28lq5g5nu08htg8le0e59e1m0!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/42c6f4d225228287c9c9f15f87f964b4/1040g0083102aqa28lq5g5nu08htg8le0e59e1m0!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/54f04c1ead57528b575a3d3e6c8158c6/1040g0083102aqa28lq5g5nu08htg8le0e59e1m0!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/42c6f4d225228287c9c9f15f87f964b4/1040g0083102aqa28lq5g5nu08htg8le0e59e1m0!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2560
      }
    }
  },
  {
    "id": "65f675190000000012036db5",
    "model_type": "note",
    "note_card": {
      "cover": {
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/3b014b909665fac5f38cde499ad9e971/1040g008310ec17v76c0049o701tatc20gba7dg8!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/2e319e5b4cb4d556e4b02e645a432047/1040g008310ec17v76c0049o701tatc20gba7dg8!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/3b014b909665fac5f38cde499ad9e971/1040g008310ec17v76c0049o701tatc20gba7dg8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/2e319e5b4cb4d556e4b02e645a432047/1040g008310ec17v76c0049o701tatc20gba7dg8!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1920,
        "width": 1440
      },
      "video": {
        "capa": {
          "duration": 9
        }
      },
      "type": "video",
      "display_title": "好正 ",
      "user": {
        "nick_name": "小椰🥥",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/61223ee6a8ccf4451c5a0ff9.jpg",
        "user_id": "59963aae5e87e765842bb040",
        "nickname": "小椰🥥"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f3c156000000001203040a",
    "model_type": "note",
    "note_card": {
      "display_title": "哥们儿，这是奏嘛呢 ",
      "user": {
        "user_id": "5e16b39b0000000001005ae5",
        "nickname": "charis",
        "nick_name": "charis",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo310be749tmg005ngmmedg8mn52720hbo"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/305706e0d97a0a1e416e9f3b2d8cc77f/1040g2sg310bnisf46g005ngmmedg8mn5m4f6fdo!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/9bb1b22ea3c579b7ef97bf83affaf60f/1040g2sg310bnisf46g005ngmmedg8mn5m4f6fdo!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/305706e0d97a0a1e416e9f3b2d8cc77f/1040g2sg310bnisf46g005ngmmedg8mn5m4f6fdo!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/9bb1b22ea3c579b7ef97bf83affaf60f/1040g2sg310bnisf46g005ngmmedg8mn5m4f6fdo!nc_n_webp_mw_1"
      },
      "type": "normal"
    }
  },
  {
    "id": "65f26687000000001203cf25",
    "model_type": "note",
    "note_card": {
      "cover": {
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/f5c07bb64987a4a55e932fbe77d9fdb0/1040g008310ad89076e005pbmg856adbpbsj4ad8!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/dae6f9a26e1e0ac49c1e46b651103482/1040g008310ad89076e005pbmg856adbpbsj4ad8!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/f5c07bb64987a4a55e932fbe77d9fdb0/1040g008310ad89076e005pbmg856adbpbsj4ad8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/dae6f9a26e1e0ac49c1e46b651103482/1040g008310ad89076e005pbmg856adbpbsj4ad8!nc_n_webp_mw_1",
        "file_id": ""
      },
      "type": "normal",
      "display_title": "申遗吧，消的天崩地裂！！！(去泛红)",
      "user": {
        "nick_name": "脆薯饼",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31080805a66005pbmg856adbpd0q4dd0",
        "user_id": "6576820a0000000019013579",
        "nickname": "脆薯饼"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "10+"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65deab13000000000b01412b",
    "model_type": "note",
    "note_card": {
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/305c52e881d560704cdc1e07fb7af0cd/1040g00830vn4k0krlq6g5pc95i8n878gokfkfv0!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1439,
        "width": 1080,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/d3cc9082bd01cbd96fd4ed5e2d77ade7/1040g00830vn4k0krlq6g5pc95i8n878gokfkfv0!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/305c52e881d560704cdc1e07fb7af0cd/1040g00830vn4k0krlq6g5pc95i8n878gokfkfv0!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/d3cc9082bd01cbd96fd4ed5e2d77ade7/1040g00830vn4k0krlq6g5pc95i8n878gokfkfv0!nc_n_webp_prv_1"
      },
      "type": "normal",
      "display_title": "八下物理第七章：力🔥开学同步必看",
      "user": {
        "user_id": "65892c91000000001d001d10",
        "nickname": "莫莫讲物理",
        "nick_name": "莫莫讲物理",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30t52in1jk06g5pc95i8n878ggovl2i8"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65df813a0000000001028d16",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "原来夜市花钱请的呀 ",
      "user": {
        "nick_name": "一只小奶喵",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30upaq2h758605o38clo088if2j8je6g",
        "user_id": "60686570000000000100224f",
        "nickname": "一只小奶喵"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/293af0359fa692632a3db39fb047ae5b/1040g00830vnuoju6646g5o38clo088ifa2i491o!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/0836348c598e91a3ea5df97db345beb0/1040g00830vnuoju6646g5o38clo088ifa2i491o!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1920,
        "width": 1080,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/293af0359fa692632a3db39fb047ae5b/1040g00830vnuoju6646g5o38clo088ifa2i491o!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/0836348c598e91a3ea5df97db345beb0/1040g00830vnuoju6646g5o38clo088ifa2i491o!nc_n_webp_mw_1"
          }
        ]
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "这种类型的电影是被淘汰了吗？",
      "user": {
        "nick_name": "Ricebamboo",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/610823b5b5552d6c8e53bfae.jpg",
        "user_id": "5db2d1b900000000010066b3",
        "nickname": "Ricebamboo"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "file_id": "",
        "height": 882,
        "width": 1280,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/2a4811bdd0d8679fb85645b789d7ad71/1040g008310doknoh6e005ndiq6sg8pljb9jm5g8!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/c29562807eacd61db17296f38a0ad8d0/1040g008310doknoh6e005ndiq6sg8pljb9jm5g8!nc_n_webp_mw_1",
            "image_scene": "WB_DFT"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/2a4811bdd0d8679fb85645b789d7ad71/1040g008310doknoh6e005ndiq6sg8pljb9jm5g8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/c29562807eacd61db17296f38a0ad8d0/1040g008310doknoh6e005ndiq6sg8pljb9jm5g8!nc_n_webp_mw_1"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f5d640000000000d00fa13"
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f5ed900000000012023e77",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "王思聪在杭州带新女友买包，小羽跑泰国去了",
      "user": {
        "nick_name": "Mellisa",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo310joqjku6e005peain0iavv5t1er2b0",
        "user_id": "65ca95c10000000009017fe5",
        "nickname": "Mellisa"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "width": 1031,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/f7653c5938cd88541ca9f21e9a27d89f/1040g2sg310drfptdmo005peain0iavv5opja3f8!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/d35b86c6ff9c43ff46bd595b6ff284cc/1040g2sg310drfptdmo005peain0iavv5opja3f8!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/f7653c5938cd88541ca9f21e9a27d89f/1040g2sg310drfptdmo005peain0iavv5opja3f8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/d35b86c6ff9c43ff46bd595b6ff284cc/1040g2sg310drfptdmo005peain0iavv5opja3f8!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1328
      }
    }
  },
  {
    "note_card": {
      "display_title": "往前走向着光 ",
      "user": {
        "nick_name": "Splendor（摄影师",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/5e78cf4dd17099000181e0e8.jpg",
        "user_id": "59f49f984eacab39bd714032",
        "nickname": "Splendor（摄影师"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/0466f6552434852122215763d9fdf2ba/1040g2sg310blkaiemk5g49uvlpfpgg1iouotm7o!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/a690c2da6183cd18508bec914d413a69/1040g2sg310blkaiemk5g49uvlpfpgg1iouotm7o!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/0466f6552434852122215763d9fdf2ba/1040g2sg310blkaiemk5g49uvlpfpgg1iouotm7o!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/a690c2da6183cd18508bec914d413a69/1040g2sg310blkaiemk5g49uvlpfpgg1iouotm7o!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1920,
        "width": 1440,
        "url": ""
      },
      "video": {
        "capa": {
          "duration": 14
        }
      },
      "type": "video"
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f3c078000000001203e82f",
    "model_type": "note"
  },
  {
    "id": "65f386b7000000001202018d",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "这是泼天的富贵呀，幸福感满满。",
      "user": {
        "user_id": "64d23358000000000b00b284",
        "nickname": "鸡腿姑娘爱喝粥",
        "nick_name": "鸡腿姑娘爱喝粥",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30nh4l89in2005p6i6dc2pck4jrd6vb8"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/bb62edb6eb7f9074bc488b0fd9159cff/1040g008310bge1u16a005p6i6dc2pck40pbhv80!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/dbb9a2eb71f6ef84983ae65442cf149d/1040g008310bge1u16a005p6i6dc2pck40pbhv80!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/bb62edb6eb7f9074bc488b0fd9159cff/1040g008310bge1u16a005p6i6dc2pck40pbhv80!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/dbb9a2eb71f6ef84983ae65442cf149d/1040g008310bge1u16a005p6i6dc2pck40pbhv80!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1707,
        "width": 1280,
        "url": ""
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "南极攻略🇦🇶南极船票什么时候买更划算？",
      "user": {
        "nick_name": "muyi_南极北极",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/5be9822e85ed130001863ebb.jpg",
        "user_id": "5be98178d1534100018aaa78",
        "nickname": "muyi_南极北极"
      },
      "interact_info": {
        "liked_count": "1k+",
        "liked": false
      },
      "cover": {
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/280d6591aeb95fbf4ebb94a04623a8d5/1040g00830vo8brho62004bq8eu0nhajogs4kco0!nc_n_webp_prv_1"
          },
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/58024cbccdf05bcd5b3ed2ea0d333a58/1040g00830vo8brho62004bq8eu0nhajogs4kco0!nc_n_webp_mw_1",
            "image_scene": "WB_DFT"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/280d6591aeb95fbf4ebb94a04623a8d5/1040g00830vo8brho62004bq8eu0nhajogs4kco0!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/58024cbccdf05bcd5b3ed2ea0d333a58/1040g00830vo8brho62004bq8eu0nhajogs4kco0!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2560,
        "width": 1920
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65dfcfeb000000000b022c28"
  },
  {
    "id": "65f25429000000001203cb11",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "遛弯 ",
      "user": {
        "nick_name": "rdouddd",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30rco6g7fhc005n90ljikb7io8fpgrno",
        "user_id": "5d20ace50000000011019e58",
        "nickname": "rdouddd"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/c0f4aae98513aa478cc2f6e22c7283b8/1040g2sg310ab0dr1mo705n90ljikb7io3lqoip8!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/55ccdc36a65420822c77720aff0ebff9/1040g2sg310ab0dr1mo705n90ljikb7io3lqoip8!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/c0f4aae98513aa478cc2f6e22c7283b8/1040g2sg310ab0dr1mo705n90ljikb7io3lqoip8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/55ccdc36a65420822c77720aff0ebff9/1040g2sg310ab0dr1mo705n90ljikb7io3lqoip8!nc_n_webp_mw_1"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "model_type": "note",
    "note_card": {
      "cover": {
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/5c82bee34f3e3d180fc4ec20ceff5b88/1040g2sg31042gp8tm4005nhnoqig8leq6upcl90!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/3c9c219f0845d76e22d97dd8e3175cd5/1040g2sg31042gp8tm4005nhnoqig8leq6upcl90!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/5c82bee34f3e3d180fc4ec20ceff5b88/1040g2sg31042gp8tm4005nhnoqig8leq6upcl90!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/3c9c219f0845d76e22d97dd8e3175cd5/1040g2sg31042gp8tm4005nhnoqig8leq6upcl90!nc_n_webp_mw_1"
      },
      "type": "normal",
      "display_title": "我看裸妆也是风韵犹存。",
      "user": {
        "nick_name": "滑蛋果盘。",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/63a1f2bb9c088b1a1d9157b7.jpg",
        "user_id": "5e37c6a500000000010055da",
        "nickname": "滑蛋果盘。"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65ebe9b9000000000303618f"
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65ee4c1a000000001203ce4c",
    "model_type": "note",
    "note_card": {
      "cover": {
        "file_id": "",
        "height": 1440,
        "width": 1080,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/56c5a6019fe0466fa4c0867ea8b40311/1040g0083106d128k5s005nr658m092113qqlepg!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/53e5cc275da110a12a6fd2ef91a7fa6d/1040g0083106d128k5s005nr658m092113qqlepg!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/56c5a6019fe0466fa4c0867ea8b40311/1040g0083106d128k5s005nr658m092113qqlepg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/53e5cc275da110a12a6fd2ef91a7fa6d/1040g0083106d128k5s005nr658m092113qqlepg!nc_n_webp_mw_1"
      },
      "type": "normal",
      "display_title": "父亲说只要能和他们其中一个人联姻",
      "user": {
        "nick_name": "九碗饭饭饭",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/641c7b41e38146c980feb5a1.jpg",
        "user_id": "5f662a2c0000000001008821",
        "nickname": "九碗饭饭饭"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      }
    }
  },
  {
    "id": "65f2339d000000001203e696",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "一路的颠沛流离终于结束了",
      "user": {
        "nick_name": "猴猴爱吃🦐",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30s6f8ess2g005obm64k0katmnrab2og",
        "user_id": "617631280000000002022bb6",
        "nickname": "猴猴爱吃🦐"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/feca23af0b4e695e5c8e643236820f36/1040g2sg310a71dcs6m005obm64k0katmikjbeb8!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/90e139701dde9a3d233965879e2ed781/1040g2sg310a71dcs6m005obm64k0katmikjbeb8!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/feca23af0b4e695e5c8e643236820f36/1040g2sg310a71dcs6m005obm64k0katmikjbeb8!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/90e139701dde9a3d233965879e2ed781/1040g2sg310a71dcs6m005obm64k0katmikjbeb8!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": ""
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "ignore": false,
    "id": "65ddc44f000000000b00cf63",
    "model_type": "note",
    "note_card": {
      "cover": {
        "file_id": "",
        "height": 1920,
        "width": 1440,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/06d2abe9b8f031f50d2a57500ad208cc/1040g2sg30vm8eldlm0004a11nr17udf32f0iidg!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/ec50505340387131766f6ff9e9e4fc76/1040g2sg30vm8eldlm0004a11nr17udf32f0iidg!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/06d2abe9b8f031f50d2a57500ad208cc/1040g2sg30vm8eldlm0004a11nr17udf32f0iidg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/ec50505340387131766f6ff9e9e4fc76/1040g2sg30vm8eldlm0004a11nr17udf32f0iidg!nc_n_webp_mw_1"
      },
      "video": {
        "capa": {
          "duration": 121
        }
      },
      "type": "video",
      "display_title": "来翻包喽~ ",
      "user": {
        "nick_name": "卢昱晓",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/5dcff044c0185e00013540d7.jpg",
        "user_id": "5a67827f4eacab25721a35e3",
        "nickname": "卢昱晓"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo"
  },
  {
    "id": "65f3cd3d000000001203c23a",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "韩宥拉如果不提出结婚是不是就不会死了",
      "user": {
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30veaif7om6505ni2mqkg90a9po9821g",
        "user_id": "5e42b6a90000000001008149",
        "nickname": "嗝～",
        "nick_name": "嗝～"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "width": 918,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/b11e79e91da5b676e7f5dcf51374fa52/1040g2sg310bp1gk4mi5g5ni2mqkg90a96sihtrg!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/a485beb9e2242d7553b8a0107979dd95/1040g2sg310bp1gk4mi5g5ni2mqkg90a96sihtrg!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/b11e79e91da5b676e7f5dcf51374fa52/1040g2sg310bp1gk4mi5g5ni2mqkg90a96sihtrg!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/a485beb9e2242d7553b8a0107979dd95/1040g2sg310bp1gk4mi5g5ni2mqkg90a96sihtrg!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1224
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "id": "65e15f16000000000102a491",
    "model_type": "note",
    "note_card": {
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "width": 1440,
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/1d51857aa729b637789bffc74459a645/1040g2sg30vpp383alo005nk53u5g854a8425qpo!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/e1e92077b2e329a2345a0ce9e1518221/1040g2sg30vpp383alo005nk53u5g854a8425qpo!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/1d51857aa729b637789bffc74459a645/1040g2sg30vpp383alo005nk53u5g854a8425qpo!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/e1e92077b2e329a2345a0ce9e1518221/1040g2sg30vpp383alo005nk53u5g854a8425qpo!nc_n_webp_mw_1",
        "file_id": "",
        "height": 1920
      },
      "type": "normal",
      "display_title": "两个月宝宝睡整觉 ",
      "user": {
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30qh0ngso00005nk53u5g854alah8b80",
        "user_id": "5e851f8b000000000100148a",
        "nickname": "小妙妤🌷",
        "nick_name": "小妙妤🌷"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65e29d960000000004000ea1",
    "model_type": "note",
    "note_card": {
      "type": "normal",
      "display_title": "puppy ",
      "user": {
        "nick_name": "Yumiii",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/624cbb2f2230eb56bd331299.jpg",
        "user_id": "5be941a3deaaa800011b489b",
        "nickname": "Yumiii"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1w+"
      },
      "cover": {
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/eaae261b2d6c67dd97dcb10f2ddca682/1040g2sg30vqvvc5466004bq6m40q6i4r9ksnkn0!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/0feba094c9395beeff099afb7ae369a8/1040g2sg30vqvvc5466004bq6m40q6i4r9ksnkn0!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/eaae261b2d6c67dd97dcb10f2ddca682/1040g2sg30vqvvc5466004bq6m40q6i4r9ksnkn0!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/0feba094c9395beeff099afb7ae369a8/1040g2sg30vqvvc5466004bq6m40q6i4r9ksnkn0!nc_n_webp_mw_1"
          }
        ]
      }
    }
  },
  {
    "id": "65efc8f10000000014007eff",
    "model_type": "note",
    "note_card": {
      "interact_info": {
        "liked": false,
        "liked_count": "100+"
      },
      "cover": {
        "url": "",
        "info_list": [
          {
            "image_scene": "WB_PRV",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/ed46b0a2b2f611af3a97d986d5289e3b/1040g2sg3107rgnvnlu004bseu65m66k1lleh37g!nc_n_webp_prv_1"
          },
          {
            "image_scene": "WB_DFT",
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/2f5f282bb01bac687eb84d988f8fe6a1/1040g2sg3107rgnvnlu004bseu65m66k1lleh37g!nc_n_webp_mw_1"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/ed46b0a2b2f611af3a97d986d5289e3b/1040g2sg3107rgnvnlu004bseu65m66k1lleh37g!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/2f5f282bb01bac687eb84d988f8fe6a1/1040g2sg3107rgnvnlu004bseu65m66k1lleh37g!nc_n_webp_mw_1",
        "file_id": "",
        "height": 2556,
        "width": 1179
      },
      "type": "normal",
      "display_title": "99年宝妈靠利息生活的第10天😀",
      "user": {
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30vq2qco9lu004bseu65m66k1jricfs8",
        "user_id": "5bf44b63b116ec0001021a81",
        "nickname": "猫猫【求稳版】",
        "nick_name": "猫猫【求稳版】"
      }
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false
  },
  {
    "note_card": {
      "user": {
        "nick_name": "汐岙",
        "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30rnvr4as2i6g5pas9n54fv3uav48hro",
        "user_id": "655c4dca000000001103fc7e",
        "nickname": "汐岙"
      },
      "interact_info": {
        "liked": false,
        "liked_count": "1k+"
      },
      "cover": {
        "file_id": "",
        "height": 2560,
        "width": 1920,
        "url": "",
        "info_list": [
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/d14df30e17764a0ec03f4aef2c83ad0a/1040g0083108v0bal6a6g5pas9n54fv3ukdiql2o!nc_n_webp_prv_1",
            "image_scene": "WB_PRV"
          },
          {
            "url": "http://sns-webpic-qc.xhscdn.com/202403220027/783fa4bf3b24a9fad39717f69c077eee/1040g0083108v0bal6a6g5pas9n54fv3ukdiql2o!nc_n_webp_mw_1",
            "image_scene": "WB_DFT"
          }
        ],
        "url_pre": "http://sns-webpic-qc.xhscdn.com/202403220027/d14df30e17764a0ec03f4aef2c83ad0a/1040g0083108v0bal6a6g5pas9n54fv3ukdiql2o!nc_n_webp_prv_1",
        "url_default": "http://sns-webpic-qc.xhscdn.com/202403220027/783fa4bf3b24a9fad39717f69c077eee/1040g0083108v0bal6a6g5pas9n54fv3ukdiql2o!nc_n_webp_mw_1"
      },
      "type": "normal",
      "display_title": "盒马的青团不能蒸吗？蒸完躺平了"
    },
    "track_id": "2d03b4zu9s4myx94zg5lo",
    "ignore": false,
    "id": "65f0eba80000000013025272",
    "model_type": "note"
  }
]
const state = reactive({
  list: [],
  listEl: null
})

function loadData() {
  console.log('loadData')
}

onMounted(() => {

})
</script>

<style scoped lang="less">


#Community {
  font-size: 14rem;
  color: white;
  padding-top: var(--common-header-height);
  background: rgb(21, 23, 36);

  .Scroll {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height) - var(--footer-height)) !important;
  }

  @p: 1rem;

  .goods-list {
    padding: @p;
    box-sizing: border-box;
  }

  .goods {
    width: calc(50% - @p);
    padding: 3rem;
    box-sizing: border-box;

    .card {
      border-radius: 4rem;
      overflow: hidden;
      background: var(--main-bg);

      img {
        width: 100%;
      }

      .bottom {
        color: gainsboro;
        padding: 10rem;

        .title {
          font-size: 16rem;
          margin-bottom: 8rem;
        }

        .b2 {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .user {
            display: flex;
            font-size: 12rem;

            img {
              width: 15rem;
              border-radius: 50%;
              margin-right: 10rem;
            }
          }

          .star {
            display: flex;

            img {
              width: 15rem;
              margin-right: 5rem;
            }

            .num {
              font-size: 13rem;
            }
          }
        }
      }
    }
  }
}
</style>