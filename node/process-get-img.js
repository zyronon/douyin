import fs from 'fs'
import request from 'request'
import path from 'path'
import axios from 'axios'
import {nanoid} from 'nanoid'

let fileName = './data2.json'
let saveFileStr = fs.readFileSync(fileName, "utf8");
let inputData = JSON.parse(saveFileStr);


const downloadImage = async (src, dest, callback) => {
  console.log('下载:', src, dest, Date.now())
  return new Promise(resolve => {
    request.head(src, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      src &&
      request(src)
        .pipe(fs.createWriteStream(dest))
        .on("close", () => {
          setTimeout(resolve, 1000)
          callback && callback(null, dest);
        });
    });
  })
};

let saveFilePath = './imgs/'

async function sleep(val) {
  return new Promise(resolve => {
    setTimeout(resolve, val)
  })
}

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
        fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2));
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
        fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2));
      })
    }
    return [coverUrl]
  }
}

for (let i = 0; i < inputData.slice(0, 111).length; i++) {
  let v = inputData[i]
  await test(v.cover_url)
  await test(v.white_cover_url)
  fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2));
  if (v.share_info && v.share_info.share_image_url && v.share_info.share_image_url.url_list) {
    let r = await test2(v.share_info.share_image_url.url_list)
    v.share_info.share_image_url.url_list = r
    fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2));
  }
}

