<template>
  <div class="choose-school">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">添加学校</span>
      </template>
      <template v-slot:right>
        <span class="f14">没有找到?</span>
      </template>
      <template v-slot:bottom>
        <div class="search-ctn">
          <Search placeholder="搜索大学名称" v-model="schoolName" @clear="isSearch = false"></Search>
          <span class="search-btn" @click="search">搜索</span>
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="nearby" v-if="!isSearch">
        <div class="title">
          <img src="../../../assets/img/icon/location.svg" alt="">
          <span>离我最近</span>
        </div>
        <div v-if="nearby.length"
             class="item"
             v-for="item in nearby"
             @click="setSchool(item)"
        >{{ item }}
        </div>
        <div v-else class="item">无法获取</div>
      </div>
      <div class="schools" v-if="!isSearch">
        <div class="item" v-for="item in schools"
             @click="setSchool(item)"
        >{{ item }}
        </div>
      </div>
      <div v-if="isSearch">
        <div v-if="searchSchools.length" class="item" v-for="item in searchSchools"
             @click="setSchool(item)"
        >
          <span v-if="item.indexOf(schoolName) > -1">
          {{ item.substr(0, item.indexOf(schoolName)) }}
          <span style="color: #f50">{{ schoolName }}</span>
          {{ item.substr(item.indexOf(schoolName) + schoolName.length) }}
        </span>
          <span v-else>{{ item }}</span>
        </div>
        <div v-else class="empty">
          <img src="../../../assets/img/icon/head-image.jpeg" alt="">
          <div class="title">搜索结果为空</div>
          <div class="sub-title">没有搜索到相关的内容</div>
          <div class="btn">没有学校信息？去申报</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Search from '../../../components/Search'
import {inject} from "vue";

export default {
  name: "ChooseSchool",
  components: {
    Search
  },
  data() {
    return {
      isSearch: false,
      nearby: [],
      schools: [],
      searchSchools: [],
      schoolName: '',
      mitt: inject('mitt')
    }
  },
  computed: {
    ...mapState({
      userinfo: 'userinfo',
      school: state => state.userinfo.school,
    })
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.nearby.push('附件大学' + i)
      this.schools.push('所有大学' + i)
    }
  },
  methods: {
    setSchool(val) {
      localStorage.setItem('changeSchool', val)
      this.$back()
    },
    search() {
      if (!this.schoolName.length) return this.isSearch = false
      this.isSearch = true
      let all = this.nearby.concat(this.schools)
      this.searchSchools = all.filter(v => v.includes(this.schoolName))
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

.choose-school {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  overflow: auto;

  .search-ctn {
    background: $main-bg;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;

    .search {
      flex: 1;
    }

    .search-btn {
      font-size: 1.4rem;
      margin-left: 2rem;
      color: $primary-btn-color;
    }
  }

  .content {
    padding-top: 12rem;

    .nearby {
      border-bottom: 1px solid $line-color;

      .title {
        padding: 1rem 2rem;

        img {
          width: 1rem;
          height: 1rem;
          margin-right: .2rem;
        }
      }

    }

    .item {
      padding: 0 2rem;
      font-size: 1.4rem;
      height: 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all .1s;
      background: $main-bg;

      &:active {
        background: $active-main-bg;
        color: $second-text-color;
      }
    }

    .empty {
      text-align: center;

      .title {
        margin-top: 6rem;
        font-size: 1.8rem;
      }

      .sub-title {
        color: $second-text-color;
        margin-top: 2rem;
        font-size: 1.4rem;
      }

      img {
        margin-top: 6rem;
        height: 10rem;
        border-radius: 50%;
      }

      .btn {
        margin-top: 15rem;
        display: inline-block;
        background: $second-btn-color;
        padding: 1.5rem 4rem;
        border-radius: 2px;
      }
    }

  }
}

</style>