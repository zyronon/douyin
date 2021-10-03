<template>
  <div class="Share2Friend">
    <BaseHeader
        backMode="light"
        backImg="back" style="z-index: 7;">
      <template v-slot:center>
        <span class="f16">已加入的群聊</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="selectFriends.length?'save-yes':'save-no'" @click="save">
            完成{{ selectFriends.length ? `(${selectFriends.length})` : '' }}
          </span>
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="list">
        <div class="local-row" v-for="item of friends.all" @click="toggleSelect(item);">
          <Check mode="red" v-model="item.select"/>
          <img :src="$imgPreview(item.avatar)" alt="">
          <div class="desc">
            <span class="name">{{ item.name.length > 20 ? item.name.substr(0, 20) + '...' : item.name }}</span>
            <span class="num">(3)</span>
          </div>
        </div>
      </div>
      <NoMore></NoMore>
    </div>
  </div>
</template>
<script>
import Search from "../../components/Search";
import {mapState} from "vuex";
import axios from "axios";
import Check from "../../components/Check";
import {forIn} from "lodash";

export default {
  name: "Share2Friend",
  components: {Search, Check},
  props: {},
  computed: {
    // ...mapState(['friends']),
  },
  data() {
    return {
      friends: {
        all: {},
        recent: [],
        eachOther: [],
      },
      selectFriends: [],
    }
  },
  created() {
    this.getFriends()
  },
  methods: {
    save() {
      if (!this.selectFriends.length) return
      this.$back()
    },
    toggleSelect(item) {
      let resIndex = this.selectFriends.findIndex(v => v.name === item.name)
      if (resIndex !== -1) {
        item.select = false
        this.selectFriends.splice(resIndex, 1)
      } else {
        item.select = true
        this.selectFriends.push(item)
      }
    },
    async getFriends() {
      let res = await this.$api.user.friends()
      if (res.code === this.SUCCESS) {
        this.friends = res.data
        this.friends.all = this.friends.all.sort((a, b) => {
          if (a.pinyin < b.pinyin) return -1;
          if (a.pinyin > b.pinyin) return 1;
          return 0;
        })
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

.Share2Friend {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }


  .save-yes {
    color: @primary-btn-color;
  }

  .save-no {
    color: @disable-primary-btn-color;
  }

  .list {

    .local-row {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;

      &:active {
        background: rgb(35, 41, 58);
      }

      .check {
        height: 2.2rem;
        width: 2.2rem;
        margin-right: 1.5rem;
      }

      img {
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 50%;
        margin-right: 1.5rem;
      }

      .desc {
        .num {
          margin-left: .5rem;
          color: @second-text-color;
        }
      }
    }
  }

}
</style>
