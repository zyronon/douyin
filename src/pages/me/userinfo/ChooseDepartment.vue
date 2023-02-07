<template>
  <div class="choose-school">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">选择院系</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/me/declare-school',{type:2})">没有找到?</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="nearby">
        <div class="item"
             v-for="item in departments"
             @click="setDepartment(item)"
        >{{ item }}
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
      departments: [],
      schoolName: '',
    }
  },
  computed: {},
  created() {
    for (let i = 0; i < 5; i++) {
      this.departments.push('院系' + i)
    }
  },
  methods: {
    setDepartment(val) {
      localStorage.setItem('changeDepartment', val)
      this.$back()
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/less/index";

.choose-school {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  overflow: auto;


  .content {
    padding-top: 60rem;

    .item {
      padding: 0 20rem;
      font-size: 14rem;
      height: 50rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all .1s;
      background: @main-bg;

      &:active {
        background: @active-main-bg;
        color: @second-text-color;
      }
    }
  }
}

</style>