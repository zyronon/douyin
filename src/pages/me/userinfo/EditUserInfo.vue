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
        <div class="avatar-ctn" @click="changeAvatarDialog = true">
          <img class="avatar" src="../../../assets/img/icon/head-image.jpeg" alt="">
          <img class="change" src="../../../assets/img/icon/back.png" alt="">
        </div>
        <span>点击更换头像</span>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item',{type:1})">
        <div class="left">名字</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item',{type:2})">
        <div class="left">抖音号</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item',{type:3})">
        <div class="left">简介</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="changeSexDialog = true">
        <div class="left">性别</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row">
        <input type="date" style="opacity: 0;left: 0;
    position: absolute;
    right: 0;
    width: 98%;
    height: 50px;"/>

        <div class="left">生日</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item')">
        <div class="left">所在地</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/add-school')">
        <div class="left">学校</div>
        <div class="right">
          <span>B</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="changeAvatarDialog" class="change-dialog" @click="changeAvatarDialog = false">
        <div class="content">
          <div class="item">拍一张</div>
          <div class="item">从相册选择</div>
          <div class="item">查看大图</div>
          <div class="item">取消</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="changeSexDialog" class="change-dialog" @click="changeSexDialog = false">
        <div class="content">
          <div class="item">男</div>
          <div class="item">女</div>
          <div class="item">不展示</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "EditUserInfo",
  data() {
    return {
      changeAvatarDialog: false,
      changeSexDialog: false,
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

.edit{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  .sub {
    color: $second-text-color;
  }
}

.userinfo {
  color: white;

  .change-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3rem 0;
    $avatar-width: 7rem;

    .avatar-ctn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;

      width: $avatar-width;
      height: $avatar-width;

      .avatar {
        opacity: .5;
        position: absolute;
        width: $avatar-width;
        height: $avatar-width;
        border-radius: 50%;
      }

      .change {
        z-index: 9;
        position: relative;
      }
    }

  }

  .row {
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    font-size: 1.4rem;

    &:active {
      background: $active-main-bg;
    }

    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $second-text-color;


      img {
        margin-left: 1rem;
        width: 15px;
      }
    }
  }
}

.mask {
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
    width: 60%;
    padding: .5rem 0;
    box-sizing: border-box;

    .item {
      padding: 1.5rem 2rem;
      transition: all .2s;

      &:active {
        background: darkgray;
      }
    }

  }

}
</style>