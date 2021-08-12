import Mock from 'mockjs'

Mock.setup({
  timeout: '500-1000'
})

Mock.Random.extend({
  imgs: function (date) {
    return this.pick([
      require('../assets/img/poster/1.jpg'),
      require('../assets/img/poster/2.jpg'),
      require('../assets/img/poster/3.jpg'),
      require('../assets/img/poster/4.jpg'),
      require('../assets/img/poster/5.jpg'),
      require('../assets/img/poster/6.jpg'),
      require('../assets/img/poster/7.jpg'),
      require('../assets/img/poster/8.jpg'),
      require('../assets/img/poster/9.jpg'),
      require('../assets/img/poster/10.jpg'),
      require('../assets/img/poster/11.jpg'),
    ])
  }
})
!(function me() {
  let my = {total: Mock.Random.natural(1, 20)}
  my[`list|${my.total > 10 ? 10 : my.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]

  let private1 = {total: Mock.Random.natural(1, 20)}
  private1[`list|${private1.total > 10 ? 10 : private1.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]

  let like = {total: Mock.Random.natural(1, 20)}
  like[`list|${like.total > 10 ? 10 : like.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]

  let collect = {total: Mock.Random.natural(1, 20)}
  collect[`list|${collect.total > 10 ? 10 : collect.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]

  const data = Mock.mock({
    'data': {
      my,
      private: private1,
      like,
      collect
    },
    code: 200,
    msg: '',
  })
  Mock.mock('me', data)
}())

let pageSize = 15
!(function my() {
  // let data = {total: Mock.Random.natural(1, 20)}
  // data[`list|${data.total > pageSize ? pageSize : data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  let data = {total: 8}
  data[`list|${data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  Mock.mock(/my/, Mock.mock({data, code: 200, msg: '',}))
}())

!(function private1() {
  // let data = {total: Mock.Random.natural(1, 20)}
  // data[`list|${data.total > pageSize ? pageSize : data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  let data = {total: 4}
  data[`list|${data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  Mock.mock(/private/, Mock.mock({data, code: 200, msg: '',}))
}())

!(function like() {
  // let data = {total: Mock.Random.natural(1, 20)}
  // data[`list|${data.total > pageSize ? pageSize : data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  let data = {total: 11}
  data[`list|${data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  Mock.mock(/like/, Mock.mock({data, code: 200, msg: '',}))
}())
!(function collect() {
  // let data = {total: Mock.Random.natural(1, 20)}
  // data[`list|${data.total > pageSize ? pageSize : data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  let data = {total: 5}
  data[`list|${data.total}`] = [{'like|10000-990000': 1000000, src: '@imgs'}]
  Mock.mock(/collect/, Mock.mock({data, code: 200, msg: '',}))
}())
