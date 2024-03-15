import fs from 'fs'
import request from 'request'
import {nanoid} from 'nanoid'

let read = './post/data/'
let save = "./format/";

let max = 0
let map = []

//判断是不是目录
const dirs = fs.readdirSync(read)
dirs.forEach(dictName => {
  formatDict(read, dictName)
})

function formatDict(dir, name) {
  let filePath = dir + name
  let saveFileStr = fs.readFileSync(filePath, "utf8");
  let inputData = JSON.parse(saveFileStr);
  map.push(inputData)
  if (max < inputData.length) max = inputData.length
}

let newList = []
// max = 5
for (let i = 0; i < max; i++) {
  map.map(v => {
    if (v.length > i) {
      newList.push(v[i])
    }
  })
}

// console.log(newList)

fs.writeFileSync('./posts5.json', JSON.stringify(newList.slice(0, 5), null, 2));
fs.writeFileSync('./posts.json', JSON.stringify(newList.slice(5), null, 2));
