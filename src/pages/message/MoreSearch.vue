<template>
  <div id="MoreSearch">
    <div class="content">
      <Search v-model="searchKey"
              right-text="取消"
              right-text-color="white"
              @notice="$back"
              :isShowRightText="true"/>
      <People v-for="(item,index) in searchFriendsAll"
              :key="item.id"
              mode="search"
              :searchKey="searchKey"
              :people="item"/>

    </div>
  </div>
</template>
<script>
import Search from "../../components/Search";
import {mapState} from "vuex";
import People from "../people/components/People";

export default {
  name: "MoreSearch",
  components: {
    Search,
    People
  },
  data() {
    return {
      searchKey: ''
    }
  },
  computed: {
    ...mapState(['friends', 'userinfo']),
    searchFriendsAll() {
      return this.friends.all.filter(v => {
        return v.name.search(this.searchKey) !== -1 || v.account.search(this.searchKey) !== -1
      })
    }
  },
  watch: {},
  created() {
    this.searchKey = this.$route.query.key
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

#MoreSearch {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding: @padding-page;
  }
}
</style>
