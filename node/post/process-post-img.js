import fs from 'fs'
import request from 'request'
import { nanoid } from 'nanoid'

let fileName = './data/user-SUNMENG333.json'
let saveFileStr = fs.readFileSync(fileName, 'utf8')
let inputData = JSON.parse(saveFileStr)
let saveFilePath = './imgs/'

const downloadImage = async (src, dest) => {
  console.log('下载：', src)
  return new Promise((resolve) => {
    request.head(src, (err) => {
      if (err) {
        console.log(err)
        return
      }
      src &&
        request(src)
          .pipe(fs.createWriteStream(dest))
          .on('close', () => {
            setTimeout(() => resolve(true), 1500)
          })
    })
  })
}

async function test3(list) {
  let url = list.pop()
  if (url.includes('http')) {
    let name = nanoid() + '.png'
    await downloadImage(url, saveFilePath + name)
    return [name]
  }
  return [url]
  // fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2));
}

inputData = inputData.slice(0, 70)
console.log(inputData.length)
for (let i = 0; i < inputData.length; i++) {
  let v = inputData[i]
  console.log(`处理：第${i}个视频:`, v.desc)

  if (v.video?.play_addr?.url_list) {
    v.video.play_addr.url_list = [v.video.play_addr.url_list.pop()]
  }
  try {
    if (v.video?.cover?.url_list) {
      v.video.cover.url_list = await test3(v.video?.cover?.url_list)
    }
    if (v.video?.animated_cover) {
      delete v.video.animated_cover
    }
    fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2))
  } catch (e) {
    console.log('出错了', e)
  }
}
