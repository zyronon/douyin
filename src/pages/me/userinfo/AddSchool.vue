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
      <div class="row" @click="nav('/me/choose-school')">
        <div class="left">学校</div>
        <div class="right">
          <span>{{ isEmpty(data.localSchool.name) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="checkGo('/me/choose-department')">
        <div class="left">院系</div>
        <div class="right">
          <span>{{ isEmpty(data.localSchool.department) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
      <div class="row" @click="showJoinTimeDialog">
        <div class="left">入学时间</div>
        <div class="right">
          <span>{{ isEmpty(data.localSchool.joinTime) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
          <div v-show="false" id="trigger1"></div>
        </div>
      </div>
      <div class="row" @click="showEducationDialog">
        <div class="left">学历</div>
        <div class="right">
          <span>{{ isEmpty(data.localSchool.education) }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="row"
        @click="nav('/me/display-type', { displayType: data.localSchool.displayType })"
      >
        <div class="left">展示范围</div>
        <div class="right">
          <span>{{ displayType }}</span>
          <dy-back scale="1" direction="right"></dy-back>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import enums from '../../../utils/enums'
import { computed, onMounted, reactive } from 'vue'
import MobileSelect from '../../../components/mobile-select/mobile-select'
import { useBaseStore } from '@/store/pinia'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav.js'
import {
  _hideLoading,
  _notice,
  _showLoading,
  _showSelectDialog,
  _showSimpleConfirmDialog,
  _sleep,
  cloneDeep
} from '@/utils'

//TODO 年份选择器没做

defineOptions({
  name: 'AddSchool'
})

const store = useBaseStore()
const router = useRouter()
const nav = useNav()
const data = reactive({
  localSchool: cloneDeep(store.userinfo.school),
  educationList: [
    { id: 1, name: '专科' },
    { id: 2, name: '本科' },
    { id: 3, name: '硕士' },
    { id: 4, name: '博士' }
  ]
})

onMounted(() => {
  let school = localStorage.getItem('changeSchool')
  let department = localStorage.getItem('changeDepartment')
  let displayType = localStorage.getItem('changeDisplayType')
  let joinTime = localStorage.getItem('changeJoinTime')
  let education = localStorage.getItem('changeEducation')
  if (school !== null) data.localSchool.name = school
  if (department !== null) data.localSchool.department = department
  if (displayType !== null) data.localSchool.displayType = ~~displayType
  if (joinTime !== null) data.localSchool.joinTime = ~~joinTime
  if (education !== null) data.localSchool.education = education
})

const school = computed(() => {
  return store.userinfo.school
})
const isChanged = computed(() => {
  if (school.value.name !== data.localSchool.name) return true
  if (school.value.department !== data.localSchool.department) return true
  if (school.value.joinTime !== data.localSchool.joinTime) return true
  if (school.value.education !== data.localSchool.education) return true
  return school.value.displayType !== data.localSchool.displayType
})

const displayType = computed(() => {
  if (data.localSchool.displayType === enums.DISPLAY_TYPE.ALL) return '公开可见'
  if (data.localSchool.displayType === enums.DISPLAY_TYPE.SCHOOL) return '校友可见'
  if (data.localSchool.displayType === enums.DISPLAY_TYPE.ME) return '仅自己可见'
  return ''
})

function showJoinTimeDialog() {
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
      data.localSchool.joinTime = ~~data[0]
    }
  }).show()
}

function showEducationDialog() {
  _showSelectDialog(data.educationList, (e) => {
    localStorage.setItem('changeEducation', e.name)
    data.localSchool.education = e.name
  })
}

function isEmpty(val) {
  if (val) return val
  return '点击设置'
}

function checkGo(path) {
  if (!data.localSchool.name) return _notice('请先选择学校 ')
  nav(path)
}

function back() {
  if (isChanged.value) {
    _showSimpleConfirmDialog('学校信息30天内只允许修改一次，是否保存修改', save, () => {
      localStorage.clear()
      router.back()
    })
  } else {
    localStorage.clear()
    router.back()
  }
}

async function save() {
  if (!isChanged.value) return
  _showLoading()
  store.userinfo = { ...store.userinfo, ...{ school: data.localSchool } }
  await _sleep(500)
  _hideLoading()
  localStorage.clear()
  router.back()
  _notice('修改成功')
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
