import fs from 'fs'
import { users } from './user/data.js'

let read = './post/data/'

let max = 0
let map = []

//判断是不是目录
const dirs = fs.readdirSync(read)
dirs.forEach((dictName) => {
  formatDict(read, dictName)
})

function formatDict(dir, name) {
  let filePath = dir + name
  let saveFileStr = fs.readFileSync(filePath, 'utf8')
  let inputData = JSON.parse(saveFileStr)
  map.push({
    userId: name,
    list: inputData,
  })
  if (max < inputData.length) max = inputData.length
}

let newList = []
// max = 5
for (let i = 0; i < max; i++) {
  map.map((v) => {
    if (v.list.length > i) {
      let data = v.list[i]
      newList.push(data)
    }
  })
}

// console.log(newList)

let data = newList.slice(0, 6)
data.map((v) => {
  let u = users.find((a) => a.uid == v.author_user_id)
  if (u) {
    v.author = u
  }
})
fs.writeFileSync('./posts6.json', JSON.stringify(data, null, 2))
fs.writeFileSync('./posts.json', JSON.stringify(newList.slice(6), null, 2))
