<template>
  <div class="school">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">添加学校</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged?'save-yes':'save-no'">保存</span>
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="row" @click="$nav('/choose-school')">
        <div class="left">学校</div>
        <div class="right">
          <span>{{ isEmpty(localSchool.name) }}</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="checkGo('/choose-department')">
        <div class="left">院系</div>
        <div class="right">
          <span>{{ isEmpty(localSchool.department) }}</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item',{type:1})">
        <div class="left">入学时间</div>
        <div class="right">
          <span>{{ isEmpty(school.joinTime) }}</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item',{type:1})">
        <div class="left">学历</div>
        <div class="right">
          <span>{{ isEmpty(school.education) }}</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
      <div class="row" @click="$nav('/edit-userinfo-item',{type:1})">
        <div class="left">展示范围</div>
        <div class="right">
          <span>{{ displayType }}</span>
          <img src="../../../assets/img/icon/back.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import enums from '../../../utils/enums'
import {inject} from "vue";

export default {
  name: "AddSchool",
  data() {
    return {
      mitt: inject('mitt'),
      localSchool: this.$clone(this.$store.state.userinfo.school)
    }
  },
  created() {
    let school = localStorage.getItem('changeSchool')
    let department = localStorage.getItem('changeDepartment')
    if (school) this.localSchool.name = school
    if (department) this.localSchool.department = department
    localStorage.clear()
  },
  computed: {
    isChanged() {
      if (this.school.name !== this.localSchool.name) return true
      if (this.school.department !== this.localSchool.department) return true
      if (this.school.joinTime !== this.localSchool.joinTime) return true
      if (this.school.education !== this.localSchool.education) return true
      return this.school.displayType !== this.localSchool.displayType;
    },
    displayType() {
      if (this.school.displayType === enums.DISPLAY_TYPE.ALL) return '公开可见'
      if (this.school.displayType === enums.DISPLAY_TYPE.SCHOOL) return '校友可见'
      if (this.school.displayType === enums.DISPLAY_TYPE.ME) return '仅自己可见'
    },
    ...mapState({
      userinfo: 'userinfo',
      school: state => state.userinfo.school,
    })
  },
  methods: {
    isEmpty(val) {
      if (val) return val
      return '点击设置'
    },
    checkGo(path) {
      if (!this.localSchool.name) return this.$notice('请先选择学校 ')
      this.$nav(path)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

.school {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;

  .content {
    padding-top: 6rem;

  }

  .row {
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    font-size: 1.4rem;
    transition: all .1s;
    background: $main-bg;

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


.save-yes {
  color: $primary-btn-color;
}

.save-no {
  color: $disable-primary-btn-color;
}
</style>