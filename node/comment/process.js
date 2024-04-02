import fs from 'fs'

let read = './data/detail_comments_2024-03-29.json'

let video_ids = [
  '7260749400622894336',
  '7128686458763889956',
  '7293100687989148943',
  '6923214072347512068',
  '7005490661592026405',
  '7161000281575148800',
  '7267478481213181238',
  '6686589698707590411',
  '7321200290739326262',
  '7194815099381484860',
  '6826943630775831812',
  '7110263965858549003',
  '7295697246132227343',
  '7270431418822446370',
  '6882368275695586568',
  '7000587983069957383',
]
let saveFileStr = fs.readFileSync(read, 'utf8')
let data = JSON.parse(saveFileStr)
video_ids.map((v) => {
  let video_comments = data.filter((a) => a.aweme_id == v)
  console.log('v', v, 'c', video_comments.length)
  fs.writeFileSync(
    `./video_id_${v}.json`,
    JSON.stringify(video_comments, null, 2),
  )
})
console.log('data', data.length)
