import fs from 'fs'
import request from 'request'
import { nanoid } from 'nanoid'

let fileName = './xhs.json'
let savefileName = './xhs-save.json'
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
            setTimeout(resolve, 1500)
            callback && callback(null, dest)
          })
    })
  })
}

let saveFilePath = './imgs/'

let imgList = []

async function test(list) {
  for (let j = 0; j < list.length; j++) {
    let a = list[j]
    let coverUrl = a.info_list[0].url

    let rIndex = imgList.findIndex((v) => v.url === coverUrl)
    if (rIndex === -1) {
      if (coverUrl.includes('http')) {
        let name = nanoid() + '.png'
        imgList.push({
          name,
          url: coverUrl
        })
        await downloadImage(coverUrl, saveFilePath + name, () => {
          // console.log('close', name)
          list[j] = {
            info_list: [
              {
                url: name
              }
            ]
          }
          fs.writeFileSync(savefileName, JSON.stringify(inputData, null, 2))
        })
      }
    } else {
      list[j] = {
        info_list: [
          {
            url: imgList[rIndex].name
          }
        ]
      }
      console.log('重复')
      fs.writeFileSync(savefileName, JSON.stringify(inputData, null, 2))
    }
  }
}

for (let i = 0; i < inputData.slice(0, 111111).length; i++) {
  let v = inputData[i]

  if (v.note_card?.cover) {
    let url = v.note_card?.cover?.url_default
    let name = nanoid() + '.png'
    imgList.push({
      name,
      url: url
    })
    await downloadImage(url, saveFilePath + name, () => {
      // console.log('close', name)
      v.note_card.cover = { url_default: name }
      fs.writeFileSync(savefileName, JSON.stringify(inputData, null, 2))
    })
  }

  if (v.note_card?.image_list) {
    await test(v.note_card.image_list)
  }
}
