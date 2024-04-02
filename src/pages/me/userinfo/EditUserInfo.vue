<template>
  <div class="edit">
    <BaseHeader>
      <template v-slot:center>
        <div class="title">
          <span class="f16">编辑资料</span>
          <span class="sub f10">已完成85%</span>
        </div>
      </template>
    </BaseHeader>
    <div class="userinfo">
      <div class="change-avatar">
        <div class="avatar-ctn" @click="showAvatarDialog">
          <img class="avatar" :src="_checkImgUrl(userinfo.cover_url[0].url_list[0])" alt="" />
          <img class="change" src="../../../assets/img/icon/me/camera-light.png" alt="" />
        </div>
        <span>点击更换头像</span>
      </div>
      <div class="row" @click="$nav('/me/edit-userinfo-item', { type: 1 })">
        <div class="left">名字</div>
        <div class="right">
          <span>{{ isEmpty(userinfo.nickname) }}</span>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="$nav('/me/edit-userinfo-item', { type: 2 })">
        <div class="left">抖音号</div>
        <div class="right">
          <span>{{ isEmpty(_getUserDouyinId({ author: userinfo })) }}</span>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="$nav('/me/edit-userinfo-item', { type: 3 })">
        <div class="left">简介</div>
        <div class="right">
          <span>{{ isEmpty(userinfo.signature) }}</span>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="showSexDialog">
        <div class="left">性别</div>
        <div class="right">
          <span>{{ sex }}</span>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="showBirthdayDialog">
        <div class="left">生日</div>
        <div class="right">
          <span>{{ isEmpty(userinfo.user_age) }}</span>
          <div v-show="false" id="trigger1"></div>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="$nav('/me/choose-location')">
        <div class="left">所在地</div>
        <div class="right">
          <span v-if="userinfo.province || userinfo.city">
            {{ userinfo.province }}
            <template v-if="userinfo.province && userinfo.city"> - </template>
            {{ userinfo.city }}
          </span>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="$nav('/me/add-school')">
        <div class="left">学校</div>
        <div class="right">
          <span>{{ isEmpty(userinfo.school?.name) }}</span>
          <dy-back scale=".8" direction="right"></dy-back>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="preview-img" v-if="previewImg" @click="previewImg = ''">
        <img class="resource" :src="previewImg" alt="" />
        <img
          class="download"
          src="../../../assets/img/icon/components/video/download.png"
          alt=""
          @click.stop="$no"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import MobileSelect from '../../../components/mobile-select/mobile-select'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _getUserDouyinId } from '../../../utils'

export default {
  name: 'EditUserInfo',
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  components: {},
  data() {
    return {
      sexList: [
        { id: 1, name: '男' },
        { id: 2, name: '女' },
        { id: 3, name: '不展示' }
      ],
      avatarList: [
        { id: 1, name: '拍一张' },
        { id: 2, name: '从相册选择' },
        { id: 3, name: '查看大图' },
        { id: 4, name: '取消' }
      ],
      previewImg: ''
    }
  },
  computed: {
    ...mapState(useBaseStore, ['userinfo']),
    sex() {
      switch (this.userinfo.gender) {
        case 1:
          return '男'
        case 2:
          return '女'
        default:
          return ''
      }
    }
  },
  methods: {
    _checkImgUrl,
    _getUserDouyinId,
    isEmpty(val) {
      if (val && val !== -1) return val
      return '点击设置'
    },
    showSexDialog() {
      this.$showSelectDialog(this.sexList, async (e) => {
        this.$showLoading()
        await this.$sleep(500)
        this.baseStore.setUserinfo({ ...this.userinfo, gender: e.id })
        this.$hideLoading()
      })
    },
    showAvatarDialog() {
      this.$showSelectDialog(this.avatarList, (e) => {
        switch (e.id) {
          case 1:
          case 2:
            return this.$no()
          case 3:
            this.previewImg = _checkImgUrl(this.userinfo.cover_url[0].url_list[0])
            break
        }
      })
    },
    showBirthdayDialog() {
      new MobileSelect({
        trigger: '#trigger1',
        title: '生日',
        connector: '生日',
        wheels: [
          {
            data: Array.apply(null, { length: 100 }).map((v, i) => new Date().getFullYear() - i)
          },
          {
            data: Array.apply(null, { length: 12 }).map((v, i) => 12 - i)
          },
          {
            data: Array.apply(null, { length: 31 }).map((v, i) => 31 - i)
          }
        ],
        callback: async (indexArr, data) => {
          console.log(data)
          this.$showLoading()
          await this.$sleep(500)
          this.baseStore.setUserinfo({
            ...this.userinfo,
            birthday: data.join('-')
          })
          this.$hideLoading()
          // this.localSchool.joinTime = ~~data[0]
        }
      }).show()
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.edit {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 14rem;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  .sub {
    color: var(--second-text-color);
  }
}

.preview-img {
  z-index: 9;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;

  .resource {
    width: 100vw;
    max-height: 100vw;
  }

  .download {
    position: absolute;
    bottom: 20rem;
    right: 20rem;
    padding: 3rem;
    background: var(--second-btn-color-tran);
    width: 20rem;
  }
}

.userinfo {
  padding-top: 60rem;
  color: white;

  .change-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30rem 0;
    @avatar-width: 80rem;

    .avatar-ctn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10rem;

      width: @avatar-width;
      height: @avatar-width;

      .avatar {
        opacity: 0.5;
        position: absolute;
        width: @avatar-width;
        height: @avatar-width;
        border-radius: 50%;
      }

      .change {
        width: 28rem;
        z-index: 9;
        position: relative;
      }
    }
  }
}

.change-dialog {
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    background: white;
    width: 80%;
    padding: 5rem 0;
    border-radius: 2px;
    box-sizing: border-box;

    .item {
      font-size: 15rem;
      padding: 15rem 20rem;
      transition: all 0.2s;

      &:active {
        background: darkgray;
      }
    }
  }
}
</style>
