const fs = require('fs')
const chalk = require('chalk')
const execa = require('execa')
const targets = (exports.targets= fs.readdirSync('packages').filter(pkg => {
  // 如果目标不是文件夹
  if (!fs.statSync(`packages/${pkg}`).isDirectory()) {
    return false
  }
  if (pkg === 'company') {
    return false
  }
  const pkgJson = require(`../packages/${pkg}/package.json`)
  if (pkgJson.private && !pkgJson.buildOptions) {
    return false
  }
  return true
}))


exports.getArgv = () => {
  let argv = require('minimist')(process.argv.slice(2))
  return argv
}

exports.binRun = (bin, args, opts = {}) => {
  return execa(bin, args, {stdio: 'inherit', ...opts})
}
