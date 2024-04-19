export default {
  REDIRECT: 'redirect',
  // 请求方法
  POST: 'post',
  GET: 'get',
  PATCH: 'patch',
  DELETE: 'delete',
  PUT: 'put',
  PAGE_NUMBER: 1,
  PAGE_SIZE: 10,
  DELAY_TIME: 250,
  SUCCESS: 200,
  RELATE_ENUM: {
    RECOMMEND_NO_REMOVE: -2, //推荐,不能移除
    RECOMMEND: -1, //推荐
    FOLLOW_ME: 1, //只关注我
    FOLLOW_EACH_OTHER: 2, //互相关注
    FOLLOW_HE: 3, //我关注他
    REQUEST_FOLLOW: 4 //关注请求
  }
}
export const SlideType = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  VERTICAL_INFINITE: 2
}

/*图集操作状态*/
export const SlideAlbumOperationStatus = {
  Normal: 'Normal',
  Zooming: 'Zooming',
  Look: 'Look',
  Detail: 'Detail'
}
/*图集播放状态*/
export const SlideAlbumPlayStatus = {
  HORIZONTAL: 0,
  VERTICAL: 1
}

/*播放状态*/
export const SlideItemPlayStatus = {
  Play: 'Play',
  Stop: 'Stop',
  Pause: 'Pause'
}

export const DefaultUser = {
  nickname: '',
  unique_id: '',
  certification: '',
  short_id: '',
  province: '',
  city: '',
  school: {},
  uid: '',
  signature: '', //签名
  mplatform_followers_count: '', //粉丝
  following_count: '', //关注
  total_favorited: '', //获赞
  follow_status: '', //1是已关注，0是未关注
  user_age: -1,
  gender: '', //1是男，0是女
  ip_location: '', //ip地址
  aweme_count: '', //视频数量
  //卡片
  card_entries: [
    {
      icon_dark: {
        url_list: []
      },
      icon_light: {
        url_list: []
      },
      sub_title: '',
      title: '',
      type: -1
    }
  ],
  cover_url: [
    {
      url_list: []
    }
  ],
  avatar_168x168: {
    url_list: []
  },
  avatar_300x300: {
    url_list: []
  }
}
