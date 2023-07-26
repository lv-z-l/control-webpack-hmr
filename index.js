#!/usr/bin/env node

const { writeFileSync, existsSync, readFileSync } = require('fs')

const path = require('path')

const watchpackdir = '../watchpack/lib'

if (existsSync(path.resolve(watchpackdir))) {
  try {
    const DecrateWatchpack = require('./src/DecrateWatchpack.js')
    const watchpack = readFileSync(path.resolve('src/watchpack.js'), { encoding: 'utf-8' })
    writeFileSync(path.resolve(watchpackdir + '/DecrateWatchpack.js'), DecrateWatchpack.toString())
    writeFileSync(path.resolve(watchpackdir + '/watchpack.js'), watchpack)
  } catch (error) {
    console.log(error)
  }
}