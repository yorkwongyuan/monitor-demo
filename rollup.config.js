import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import cleanup from 'rollup-plugin-cleanup'
import size from 'rollup-plugin-sizes'
import { visualizer } from 'rollup-plugin-visualizer'

const path = require('path')
const fs = require('fs')

// 如果没有指定包
if (!process.env.TARGET) {
  throw new Error('Target package must be specified')
}

// 是否需要声明文件
const isDeclaration = process.env.TYPES !== 'false'

// 主包版本号
const masterVersion = require('./package.json').version

// 路径
// packages的绝对路径
const packagesDir = path.resolve(__dirname, './packages')
// 子包文件夹路径
const packageDir = path.resolve(packagesDir, process.env.TARGET)
// 打包后的路径
const packageDirDist = process.env.LOCALDIR === 'undefined' ? `${packageDir}/dist` : process.env.LOCALDIR

const name = path.basename(packageDir)