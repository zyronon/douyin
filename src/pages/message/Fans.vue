<template>
  <div id="Fans">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">粉丝</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Loading v-if="loading"/>
      <Scroll ref="mainScroll" @pulldown="loadData" v-else>
        <Peoples v-model:list="fans"
                 :loading="loadingMore"
                 mode="fans"/>
        <div class="title">
          <span>朋友推荐</span>
          <img src="../../assets/img/icon/about-gray.png" alt="">
        </div>
        <Peoples v-model:list="recommend"
                 :loading="loadingMore"
                 mode="recommend"/>
        <Loading :is-full-screen="false" v-if="loadingMore"/>
      </Scroll>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import People from "../people/components/People";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";
import Peoples from "../people/components/Peoples";
import BasePage from "../BasePage";

export default {
  extends: BasePage,
  name: "Fans",
  components: {
    Scroll,
    People,
    Loading,
    Peoples
  },
  data() {
    return {
      loading: false,
      loadingMore: false,
      recommend: [],
      fans: [],
    }
  },
  computed: {
    ...mapState(['userinfo', 'friends'])
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      await this.$sleep(500)
      this.loading = false

      this.recommend = this.$clone(this.friends.all)
      this.fans = this.$clone(this.friends.all)
      this.recommend.map(v => {
        v.type = -1
      })
    },
    async loadData() {
      if (this.loadingMore) return
      this.loadingMore = true
      await this.$sleep(500)
      this.loadingMore = false
      let temp = this.$clone(this.friends.all)
      temp.map(v => {
        v.type = -1
      })
      this.recommend = this.recommend.concat(temp)
    }
  }
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";


.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}

#Fans {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding: @padding-page;
    padding-top: @header-height;

    .scroll {
      height: calc(100vh - @header-height);
    }

    .people-wrapper {
      position: relative;
    }

    .title {
      margin-top: 15rem;
      margin-bottom: 10rem;
      font-size: 12rem;
      display: flex;
      align-items: center;

      img {
        margin-left: 5rem;
        width: 13rem;
      }
    }
  }
}
</style>
