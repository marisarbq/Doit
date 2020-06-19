# 初步学习Rollup.js 构建webgl项目

> 感觉配合ES Module 爽飞,不用我以前Gulp一把梭，什么东西都塞在一起了！

## CLI的使用记忆

- argv[0] => rollup
- argv[1] => 打包的入口文件
- argv(--file) => bundle.js
- argv(--format) => 格式

### 格式 --format
- cjs CommonJS
- es ES2015
- umd
- amd
- iife 这个会打包成匿名函数然后自执行，LayaAir的项目最终打包就采用了此种。

 


