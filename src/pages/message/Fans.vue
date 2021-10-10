<template>
  <div class="Fans">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">粉丝</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Scroll @pulldown="loadData">
        <People v-for="item in friends.all" :people="item" mode="fans"></People>
        <div class="line mt1r"></div>
        <div class="title">
          <span>朋友推荐</span>
          <img src="../../assets/img/icon/about-gray.png" alt="">
        </div>
        <transition-group name="list-complete" tag="div" class="people-wrapper">
          <People v-for="(item,index) in recommend"
                  :key="item.id"
                  :people="item"
                  @remove="remove(index)"
                  mode="recommend"/>
        </transition-group>
        <Loading :is-full-screen="false" v-if="loading"/>
      </Scroll>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import People from "../people/components/People";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";

export default {
  name: "Fans",
  components: {
    Scroll,
    People,
    Loading
  },
  data() {
    return {
      loading: false,
      recommend: []
    }
  },
  computed: {
    ...mapState(['userinfo', 'friends'])
  },
  created() {
    this.recommend = this.$clone(this.friends.all)
  },
  methods: {
    remove(index) {
      this.$notice('将不会再为你推荐该用户')
      this.recommend.splice(index, 1)
    },
    async loadData() {
      if (this.loading) return
      this.loading = true
      await this.$sleep(500)
      this.loading = false
      this.recommend = this.recommend.concat(this.friends.all)
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

.Fans {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

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
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      display: flex;
      align-items: center;

      img {
        margin-left: .5rem;
        width: 1.3rem;
      }
    }
  }
}
</style>
