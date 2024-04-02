import fs from 'fs'
import request from 'request'
import { nanoid } from 'nanoid'

let fileName = './user.json'
let saveFileStr = fs.readFileSync(fileName, 'utf8')
let inputData = JSON.parse(saveFileStr)

const downloadImage = async (src, dest, callback) => {
  console.log('下载:', src, dest, Date.now())
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
            setTimeout(resolve, 1000)
            callback && callback(null, dest)
          })
    })
  })
}

let saveFilePath = './user-imgs/'

async function test(list) {
  for (let j = 0; j < list.length; j++) {
    let a = list[j]
    let coverUrl = a.url_list[a.url_list.length - 1]
    a.url_list = [coverUrl]
    if (coverUrl.includes('http')) {
      let name = nanoid() + '.png'
      await downloadImage(coverUrl, saveFilePath + name, () => {
        // console.log('close', name)
        a.url_list = [name]
        fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2))
      })
    }
  }
}

async function test2(list) {
  for (let j = 0; j < list.length; j++) {
    let coverUrl = list[list.length - 1]
    if (coverUrl.includes('http')) {
      let name = nanoid() + '.png'
      await downloadImage(coverUrl, saveFilePath + name, () => {
        // console.log('close', name)
        fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2))
      })
      return [name]
    }
    return []
  }
}

for (let i = 0; i < inputData.slice(0, 1111).length; i++) {
  let v = inputData[i]
  await test(v.cover_url)
  await test(v.white_cover_url)
  delete v.cover_and_head_image_info
  fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2))
  if (v.share_info && v.share_info.share_image_url && v.share_info.share_image_url.url_list) {
    let r = await test2(v.share_info.share_image_url.url_list)
    if (r.length) {
      v.share_info.share_image_url.url_list = r
      fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2))
    }
  }
}
