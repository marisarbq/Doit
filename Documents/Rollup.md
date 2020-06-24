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

 
## 关于Rollup-plugin-marisa
一个简单的文本处理插件，把一个glsl与ts混写代码的单文本，处理分开字符串然后再转换成对应的esModule加入到项目中去

关于vscode插件如何解析多种语法混合的字符串文件，参考了一些其他混合语法文件插件的实现思路，其实也就是一开始
提取出不同的问题，然后分成不同的小字符串逐一处理完后会返回处理之后的字符串重新拼接起来即可。

