# WEBGL2学习记录

## 一些根源性问题

### 兼容性
webgl2对标opengl es3.0，但是3.2开始就很多东西并没有支持的样子。
> 首先glsl 只能支持到 300，330 core貌似最新版本的chrome就不支持了。所以暂时未关注更多支持情况，所以采用glsl 300

### 与webgl1的差异性
主要也是opengl 和opengl es 的变动带来的。关键词的变动，现在采用的in/out 来替换了attribute/varying。texture替换了texture开头的api，只能化
多了createVertexBuffer

## 图形学问题

### 绘制模式

- 绘制模式(GLenum mode)。模式有如下几种：

GL_POINTS

GL_LINES

GL_LINE_LOOP

GL_LINE_STRIP

GL_TRIANGLES

GL_TRIANGLE_STRIP

GL_TRIANGLE_FAN


- docs.gl 查到的api说明

mode,
Specifies what kind of primitives to render. Symbolic constants 

GL_POINTS, 

GL_LINE_STRIP, 

GL_LINE_LOOP, 

GL_LINES, 

GL_TRIANGLE_STRIP, 

GL_TRIANGLE_FAN, 

GL_TRIANGLES