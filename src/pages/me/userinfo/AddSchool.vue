<template>
  <div class="school">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span class="f16">添加学校</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged ? 'save-yes' : 'save-no'" @click="save">保存</span>
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="row" @click="$nav('/me/choose-school')">
        <div class="left">学校</div>
        <div class="right">
          <span>{{ isEmpty(localSchool.name) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="checkGo('/me/choose-department')">
        <div class="left">院系</div>
        <div class="right">
          <span>{{ isEmpty(localSchool.department) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="showJoinTimeDialog">
        <div class="left">入学时间</div>
        <div class="right">
          <span>{{ isEmpty(localSchool.joinTime) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
          <div v-show="false" id="trigger1"></div>
        </div>
      </div>
      <div class="row" @click="showEducationDialog">
        <div class="left">学历</div>
        <div class="right">
          <span>{{ isEmpty(localSchool.education) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="$nav('/me/display-type', { displayType: localSchool.displayType })">
        <div class="left">展示范围</div>
        <div class="right">
          <span>{{ displayType }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import enums from '../../../utils/enums'
import { inject } from 'vue'
import MobileSelect from '../../../components/mobile-select/mobile-select'
import { useBaseStore } from '@/store/pinia'

//TODO 年份选择器没做
export default {
  name: 'AddSchool',
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  data() {
    return {
      mitt: inject('mitt'),
      localSchool: this.$clone(this.baseStore.userinfo.school),
      educationList: [
        { id: 1, name: '专科' },
        { id: 2, name: '本科' },
        { id: 3, name: '硕士' },
        { id: 4, name: '博士' }
      ]
    }
  },
  created() {
    let school = localStorage.getItem('changeSchool')
    let department = localStorage.getItem('changeDepartment')
    let displayType = localStorage.getItem('changeDisplayType')
    let joinTime = localStorage.getItem('changeJoinTime')
    let education = localStorage.getItem('changeEducation')
    if (school !== null) this.localSchool.name = school
    if (department !== null) this.localSchool.department = department
    if (displayType !== null) this.localSchool.displayType = ~~displayType
    if (joinTime !== null) this.localSchool.joinTime = ~~joinTime
    if (education !== null) this.localSchool.education = education
    // localStorage.clear()
  },
  computed: {
    ...mapState(useBaseStore, ['userinfo']),
    isChanged() {
      if (this.school.name !== this.localSchool.name) return true
      if (this.school.department !== this.localSchool.department) return true
      if (this.school.joinTime !== this.localSchool.joinTime) return true
      if (this.school.education !== this.localSchool.education) return true
      return this.school.displayType !== this.localSchool.displayType
    },
    displayType() {
      if (this.localSchool.displayType === enums.DISPLAY_TYPE.ALL) return '公开可见'
      if (this.localSchool.displayType === enums.DISPLAY_TYPE.SCHOOL) return '校友可见'
      if (this.localSchool.displayType === enums.DISPLAY_TYPE.ME) return '仅自己可见'
      return ''
    },
    school() {
      return this.userinfo.school
    }
  },
  methods: {
    showJoinTimeDialog() {
      new MobileSelect({
        trigger: '#trigger1',
        title: '学历',
        wheels: [
          {
            data: Array.apply(null, { length: 50 }).map((v, i) => new Date().getFullYear() - i)
          }
        ],
        callback: (indexArr, data) => {
          localStorage.setItem('changeJoinTime', data[0])
          this.localSchool.joinTime = ~~data[0]
        }
      }).show()
    },
    showEducationDialog() {
      this.$showSelectDialog(this.educationList, (e) => {
        localStorage.setItem('changeEducation', e.name)
        this.localSchool.education = e.name
      })
    },
    isEmpty(val) {
      if (val) return val
      return '点击设置'
    },
    checkGo(path) {
      if (!this.localSchool.name) return this.$notice('请先选择学校 ')
      this.$nav(path)
    },
    back() {
      if (this.isChanged) {
        this.$showSimpleConfirmDialog(
          '学校信息30天内只允许修改一次，是否保存修改',
          this.save,
          () => {
            localStorage.clear()
            this.$back()
          }
        )
      } else {
        localStorage.clear()
        this.$back()
      }
    },
    async save() {
      if (!this.isChanged) return
      this.$showLoading()
      let data = { ...this.userinfo, ...{ school: this.localSchool } }
      this.baseStore.setUserinfo(data)
      await this.$sleep(500)
      this.$hideLoading()
      localStorage.clear()
      this.$back()
      this.$notice('修改成功')
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.school {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;

  .content {
    padding-top: 60rem;
  }
}

.save-yes {
  color: var(--primary-btn-color);
}

.save-no {
  color: var(--disable-primary-btn-color);
}
</style>
