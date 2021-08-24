<template>
  <transition name="comment">
    <div class="comment f14" v-if="isCommenting">
      <div class="title mt1r">
        <p>2.7w条评论</p>
        <back mode="dark" img="close" direction="right" @click.stop="$emit('update:is-commenting',false)"/>
      </div>
      <div class="items">
        <div class="item pl1r pr1r mb1r  oh"
             v-for="item in 2"
        >
          <div class="content pull-left ">
            <img src="../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
            <div class="pull-right comment-container">
              <div class="name">@ttentau</div>
              <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
              <div class="time mt10p">10-02</div>
            </div>
          </div>
          <div class="love pull-right">
            <img src="../assets/img/icon/love-gray.svg" alt="" class="love-image">
            <span class="f14 block">3453</span>
          </div>
        </div>
        <p class="no-more">暂时没有更多了</p>
      </div>
      <div class="input-comment">
        <AutoInput v-model="commit"></AutoInput>
        <div class="options">
          <img src="../assets/img/icon/add.svg" alt="" @click="call">
          <img src="../assets/img/icon/add.svg" alt="">
          <img src="../assets/img/icon/add.svg" alt="">
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import AutoInput from "./AutoInput";

export default {
  name: "Comment",
  components: {AutoInput},
  props: ['isCommenting'],
  data() {
    return {
      commit: ''
    }
  },
  methods: {
    // showComment() {
    //     this.isCommenting = !this.isCommenting;
    //     console.log(666)
    // }
    call() {
      console.log(this.commit)
    }
  }
}
</script>

<style lang="less" scoped>

.comment {
  position: fixed;
  /*top: 200px;*/
  width: 100%;
  bottom: 0;
  background: #fff;
  z-index: 5;
  border-radius: 10px 10px 0 0;

  .title {
    position: relative;

    p {
      text-align: center;
    }

    img {
      width: 15px;
      height: 15px;
      position: absolute;
      right: 20px;
      top: 0;
    }
  }

  .items {
    overflow-y: scroll;
    height: 60vh;

    .item {
      .head-image {
        width: 40px;
        border-radius: 50%;
        float: left;
      }

      .content {
        float: left;
        width: 85%;

        .head-image {
          width: 15%;
        }

        .comment-container {
          width: 80%;

          .time {
            color: gray;
          }
        }

      }

      .love {
        text-align: center;

        .love-image {
          width: 30px;
          border-radius: 50%;
        }
      }
    }

    .no-more {
      margin: 10px;
      text-align: center;
      color: #ccc;
    }
  }

  .input-comment {
    padding: 10px;
    border-top: 1px solid #e2e1e1;
    display: flex;
    align-items: center;

    .options {
      display: flex;

      img {
        width: 20px;
        height: 20px;
        margin: 0 5px;

        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
  }
}

.comment-enter-active,
.comment-leave-active {
  transition: all .15s ease;
}

.comment-enter-from, .comment-leave-to {
  transform: translateY(60vh);
}

</style>
