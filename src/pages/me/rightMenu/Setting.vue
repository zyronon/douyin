<template>
  <div class="Setting">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="title">帐号</div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/user.png" alt="" />
          <span>帐号与安全</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/lock.png" alt="" />
          <span>隐私设置</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>

      <div class="line"></div>
      <div class="title">通用</div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/remind.png" alt="" />
          <span>通知设置</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/dynamics.png" alt="" />
          <span>动态壁纸</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/setting-two.png" alt="" />
          <span>通用设置</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="line"></div>

      <div class="title">帐号互通</div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/toutiao.png" alt="" />
          <span>头条主页</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="line"></div>

      <div class="title">关于</div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/adddddddd.png" alt="" />
          <span>广告反馈与设置</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/book.png" alt="" />
          <span>用户协议</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/bookmark.png" alt="" />
          <span>社区自律公约</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/personal-privacy.png" alt="" />
          <span>隐私政策</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/protect.png" alt="" />
          <span>应用权限</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/ring.png" alt="" />
          <span>第三方SDK列表</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/about.png" alt="" />
          <span>关于抖音</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/feedback.png" alt="" />
          <span>反馈与帮助</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/delete.png" alt="" />
          <span>清理占用空间</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="line"></div>

      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/switch.png" alt="" />
          <span>切换空间</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="@/assets/img/icon/newicon/left_menu/logout.png" alt="" />
          <span>退出登录</span>
        </div>
        <div class="right">
          <dy-back direction="right"></dy-back>
        </div>
      </div>

      <div class="version">抖音 {{ gitLastCommitHash }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const gitLastCommitHash = ref(LATEST_COMMIT_HASH)

defineOptions({
  name: 'ChooseSchool'
})
</script>

<style scoped lang="less">
@import '@/assets/less/index';

.Setting {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;

    .title {
      color: var(--second-text-color);
      font-size: 13rem;
      margin: 20rem 0 0 20rem;
    }

    .version {
      color: var(--second-text-color);
      font-size: 13rem;
      margin: 40rem;
      text-align: center;
    }

    .line {
      width: calc(100% - 30rem);
      margin-left: 15rem;
      background: var(--line-color);
    }
  }
}
</style>
