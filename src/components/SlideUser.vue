<template>
  <div id="SlideUser">
    <div class="content">
      <img class="close" src="../assets/img/icon/components/gray-close-full2.png" alt="">
      <img class="avatar" :src="user.avatar">
      <div class="name">{{ user.name }}</div>
      <div class="age">{{ user.age }}岁</div>
      <div class="realName">通讯录朋友{{ user.realName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SlideUser",
  components: {},
  props: {
    modelValue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      user: {
        type: 'user',
        "id": "224e9a00-ffa0-4bc1-bb07-c318c7b02fa5",
        "avatar": new URL('../assets/img/icon/avatar/1.png', import.meta.url).href,
        "name": "何以为家",
        "realName": "王小二",
        "sex": "",
        "age": 25,
        "idCard": null,
        "phone": "",
        "address": null,
        "wechat": "",
        "password": null,
        "lastLoginTime": "1629993515",
        "createTime": "1630035089",
        "isDelete": 0,
        "account": "234",
        "pinyin": "H",
        "select": false,
      }
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  methods: {}
}
</script>

<style scoped lang="less">
#SlideUser {
  width: 100%;
  height: 100%;
  background: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 85%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    box-shadow: 0 0 2rem 0 #b3b3b3;
    padding: 1rem;
    color: black;
    position: relative;

    .close {
      top: 1.5rem;
      right: 1.5rem;
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
    }

    .avatar {
      width: 12rem;
      border-radius: 50%;
    }

    .name {
      margin-top: 2rem;
      margin-bottom: 2rem;
      font-weight: bold;
      font-size: 1.6rem;
    }

    .age {
      font-size: 1rem;
      background: #f1f1f1;
      padding: 3px;
      border-radius: 2px;
    }

    .realName {
      text-align: center;
      color: gray;
      border-top: 1px solid #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
      padding: 1rem 0;
      margin: 1.5rem 0;
      width: 90%;
    }
  }
}

</style>
