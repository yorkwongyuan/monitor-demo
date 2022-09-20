const { getArgv, targets: allTargets, binRun } = require('./utils')
const path = require('path')

let buildTypes = true
let LOCALDIR = ''
let rollupWatch = false

run()
function run () {
  const argv = getArgv()
  // 无符号参数
  let paramsTarget = argv._
  LOCALDIR = argv.local
  buildTypes = argv.types !== 'false'
  // 是否开启了watch模式
  rollupWatch = argv.watch === 'true'
  // 具备无符号参数
  if (paramsTarget.length === 0) {
    buildAll(allTargets)
  } else {
    buildAll(paramsTarget)
  }
}

// 构建所有
function buildAll (params) {
  console.log('🚀 ~ file: build.js ~ line 30 ~ buildAll ~ params', params)
  runParallel(params, rollupBuild)
}

// 组装方法数组
function runParallel (sources, fn) {
  const ret = []
  // 循环组装
  for (let item of sources ) {
    const p = Promise.resolve().then(() => fn(item))
    ret.push(p)
  }
  return Promise.all(ret)
}

// 构建方法
async function rollupBuild (target) {
  const pkg = path.resolve(__dirname, `../packages/${target}`)
  const pkgJson = require(`${pkg}/package.json`)
  if (pkgJson.private) {
    return
  }
  const args = [
    '-c',
    '--environment',
    [
      `TARGET:${target}`,
      `TYPES:${buildTypes}`,
      `LOCALDIR:${LOCALDIR}`
    ]
    .filter(Boolean)
    .join(',')
  ]
  rollupWatch && args.push('--watch')
  await binRun('rollup', args)
}


