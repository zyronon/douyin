import fs from 'fs'

let read = './xhs/imgs/'
let save = './xhs/imgs2/'

const dirs = fs.readdirSync(read)
dirs.forEach((dictName) => {
  formatDict(read, dictName)
})

function formatDict(dir, name) {
  let filePath = dir + name
  fs.copyFile(filePath, save + name.replace('.jpg', '.png'), () => {})
}
