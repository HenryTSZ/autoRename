#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const process = require('process')
const images = require('images')

const cwd = process.cwd()
const readDir = fs.readdirSync(cwd)
let len = readDir.length
console.log('🚀 ~ file: index.js ~ line 8 ~ len', len)

chokidar.watch(cwd, { ignoreInitial: true }).on('add', filePath => {
  const { name, ext } = path.parse(filePath)
  const fileExt = ext === '.webp' ? '.jpg' : ext
  const fileName = len.toString().padStart(3, 0)
  if (isNaN(+name) || Math.abs(name - fileName) > 1) {
    tinyImg(filePath, `${fileName}${fileExt}`)
    fs.unlinkSync(filePath)
    len++
  }
})

const tinyImg = (filePath, fileName) => {
  images(filePath).save(fileName, {
    quality: 80
  })
  // [是否在保存图片的时候可以加个完成回调？ · Issue #77 · zhangyuanwei/node-images](https://github.com/zhangyuanwei/node-images/issues/77)
}
