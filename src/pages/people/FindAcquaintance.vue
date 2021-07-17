<template>
  <div class="FindAcquaintance">
    <SlideRowList>
      <SlideItem>
        <Search class="vue"></Search>
        <People v-for="item in list " :people="item"></People>
      </SlideItem>
      <SlideItem>
        <Search class="vue"></Search>
        <Search class="vue" @click="findAddressListDialog = true"></Search>
      </SlideItem>
    </SlideRowList>

    <div v-if="findAddressListDialog" class="dialog find-address-list">
      <div class="content">
        <div class="body">
          <div>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
          <span class="title">发现通讯录好友</span>
          <span class="desc">
            授权通讯录，看看哪些好友在使用抖音。具体使用场景及撤回授权方式详见
            <span class="link" @click="$nav('/service-protocol')">《隐私政策》</span>
        </span>
        </div>
        <div class="footer">
          <div @click="findAddressListDialog = false">暂时不要</div>
          <div @click="$nav('/address-list')">发现好友</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import People from './components/People'
import Search from '../../components/Search'

export default {
  name: "FindAcquaintance",
  components: {
    People,
    Search
  },
  data() {
    return {
      findAddressListDialog: false,
      list: [
        {
          type: 1,
        },
        {
          type: 2,
        },
        {
          type: 3,
        },
        {
          type: 4,
        },
        {
          type: 5,
        },
      ]
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.FindAcquaintance {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;

  .content {

  }

  .dialog {
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
    color: black;

    .content {
      background: white;
      width: 70%;
      border-radius: 2px;
      box-sizing: border-box;
      font-size: 1.5rem;

      .body {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          height: 6rem;
          margin-bottom: 2rem;
        }

        .title {
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .desc {
          font-size: 1rem;
          color: gray;
        }

        .link {
          color: rgb(18, 100, 149);
        }
      }

      $footer-border-color: #eaeaf1;

      .footer {
        margin-top: 2rem;
        display: flex;
        height: 4rem;
        border-top: 1px solid $footer-border-color;
        font-size: 1.4rem;

        div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 49%;
          text-align: center;
          border-right: 1px solid $footer-border-color;
          opacity: .5;

          &:nth-last-child(1) {
            border-right: none;
            opacity: 1;
          }
        }
      }

    }

  }
}
</style>
