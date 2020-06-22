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

### VBO的使用

- VBO允许usage标示符取以下9种值：

GL_STATIC_DRAW_ARB

GL_STATIC_READ_ARB

GL_STATIC_COPY_ARB

GL_DYNAMIC_DRAW_ARB

GL_DYNAMIC_READ_ARB

GL_DYNAMIC_COPY_ARB

GL_STREAM_DRAW_ARB

GL_STREAM_READ_ARB

GL_STREAM_COPY_ARB

“Static”意味着VBO中的数据不会被改变（一次修改，多次使用），”dynamic”意味着数据可以被频繁修改（多次修改，多次使用），”stream”意味着数据每帧都不同（一次修改，一次使用）。”Draw”意味着数据将会被送往GPU进行绘制，”read”意味着数据会被用户的应用读取，”copy”意味着数据会被用于绘制和读取。注意在使用VBO时，只有draw是有效的，而copy和read主要将会在像素缓冲区（PBO）和帧缓冲区（FBO）中发挥作用。


### TEXTURE_WRAP 纹理参数
GL_REPEAT: 超出纹理范围的坐标整数部分被忽略，形成重复效果。

GL_MIRRORED_REPEAT: 超出纹理范围的坐标整数部分被忽略，但当整数部分为奇数时进行取反，形成镜像效果。

GL_CLAMP_TO_EDGE:超出纹理范围的坐标被截取成0和1，形成纹理边缘延伸的效果。

GL_CLAMP_TO_BORDER: 超出纹理范围的部分被设置为边缘色。
