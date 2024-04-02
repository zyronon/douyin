import fs from 'fs'

let fileName = './post/user-81069823274.json'
const str = fs.readFileSync('./input.json', 'utf8')
let inputData = JSON.parse(str)

const saveFileStr = fs.readFileSync(fileName, 'utf8')
let saveFileData = JSON.parse(saveFileStr)
// console.log('list', inputData.has_more)

// console.log('f', fs)

inputData.aweme_list.map((v) => {
  Object.keys(v).map((k) => {
    if (
      ![
        'aweme_id',
        'desc',
        'create_time',
        'music',
        'video',
        'share_url',
        'statistics',
        'status',
        'text_extra',
        'is_top',
        'share_info',
        'duration',
        'image_infos',
        'risk_infos',
        'position',
        'author_user_id',
        'prevent_download',
        'long_video',
        'aweme_control',
        'images',
        'suggest_words',
      ].includes(k)
    ) {
      delete v[k]
    }
  })

  Object.keys(v.music).map((k) => {
    if (
      ![
        'id',
        'title',
        'author',
        'cover_medium',
        'cover_thumb',
        'play_url',
        'duration',
        'user_count',
        'owner_id',
        'owner_nickname',
        'is_original',
      ].includes(k)
    ) {
      delete v.music[k]
    }
  })
  Object.keys(v.video).map((k) => {
    if (
      ![
        'play_addr',
        'cover',
        'height',
        'width',
        'ratio',
        'use_static_cover',
        'duration',
        'horizontal_type',
        'animated_cover',
      ].includes(k)
    ) {
      delete v.video[k]
    }
  })
})

saveFileData = saveFileData.concat(inputData.aweme_list)
fs.writeFileSync('./ouput.json', JSON.stringify(inputData.aweme_list, null, 2))
fs.writeFileSync(fileName, JSON.stringify(saveFileData, null, 2))
