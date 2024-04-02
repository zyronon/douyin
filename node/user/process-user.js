import fs from 'fs'

let fileName = './data.json'
let saveFileStr = fs.readFileSync(fileName, 'utf8')
let inputData = JSON.parse(saveFileStr)

inputData.map((v) => {
  Object.keys(v).map((k) => {
    if (
      ![
        'avatar_168x168',
        'avatar_300x300',
        'aweme_count',
        'birthday_hide_level',
        'can_show_group_card',
        'commerce_user_level',
        'province',
        'city',
        'country',
        'district',
        'favoriting_count',
        'follow_status',
        'follower_count',
        'follower_request_status',
        'follower_status',
        'following_count',
        'forward_count',
        'public_collects_count',
        'share_info',
        'mplatform_followers_count',
        'nickname',
        'max_follower_count',
        'gender',
        'cover_colour',
        'cover_url',
        'commerce_info',
        'commerce_user_info',
        'short_id',
        'signature',
        'total_favorited',
        'uid',
        'unique_id',
        'user_age',
        'white_cover_url',
        'card_entries',
        'cover_and_head_image_info',
        'ip_location',
      ].includes(k)
    ) {
      delete v[k]
    }
  })
})

// saveFileData = saveFileData.concat(inputData.aweme_list)
// fs.writeFileSync(
//   "./ouput.json",
//   JSON.stringify(inputData.aweme_list, null, 2)
// );
fs.writeFileSync(
  // fileName,
  './data.json',
  JSON.stringify(inputData, null, 2),
)
