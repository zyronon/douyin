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
    RECOMMEND_NO_REMOVE: -2,//推荐,不能移除
    RECOMMEND: -1,//推荐
    FOLLOW_ME: 1,//只关注我
    FOLLOW_EACH_OTHER: 2,//互相关注
    FOLLOW_HE: 3,//我关注他
    REQUEST_FOLLOW: 4//关注请求
  }
}
export const SlideType = {
  HORIZONTAL:0,
  VERTICAL:1,
}
