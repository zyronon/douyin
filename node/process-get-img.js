import fs from 'fs'
import request from 'request'
import path from 'path'
import axios from 'axios'
import {nanoid} from 'nanoid'

let fileName = './data2.json'
let saveFileStr = fs.readFileSync(fileName, "utf8");
let inputData = JSON.parse(saveFileStr);


const downloadImage = (src, dest, callback) => {
  request.head(src, (err, res, body) => {
    if (err) {
      console.log(err);
      return;
    }
    src &&
    request(src)
      .pipe(fs.createWriteStream(dest))
      .on("close", () => {
        callback && callback(null, dest);
      });
  });
};

let saveFilePath = './imgs/'

async function sleep(val) {
  return new Promise(resolve => {
    setTimeout(resolve, val)
  })
}

inputData.slice(0, 2).map(async v => {
  await v.cover_url.map(async a => {
    let coverUrl = a.url_list[a.url_list.length - 1]
    a.url_list = [coverUrl]
    console.log('coverUrl', coverUrl)
    await sleep(1500)
    downloadImage(coverUrl, saveFilePath + nanoid() + '.png')
  })
})

fs.writeFileSync(fileName, JSON.stringify(inputData, null, 2));