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


## GPU 相关


### Batch

NVIDIA 在 GDC 曾提出，25K batchs/sec 会吃满 1GHz 的 CPU，100的使用率。所以他们推出了一条公式，来预估游戏中大概可以 Run 多少个 Batch：

浅谈Draw Call和Batch的区别

举个例子：如果你的目标是游戏跑30FPS、使用2GHz的CPU、20š„工作量拨给Draw Call来使用，那你每秒可以有多少Draw Call呢？

 333 Batchs/Frame = 25K * 2 * (0.2/30)

那既然 Batch 是个箱子，里头装着物件的顶点资料，再依据我们上面的描述，那表示同样材质或 Shader 的物件，可以合并成一个 Batch 送往 GPU，这样就是最省事的方法！

----

Draw call之间切换Texture、Shader或者Material参数会导致CPU至少两方面的时间消耗：

1.把Draw call及渲染状态切换的API调用转换成设备无关命令耗费的时间（其中还包括命令检查等操作）。

2.刷新Command Buffer导致CPU由用户模式切换到内核模式带来的时间消耗。

第一点的时间消耗其实并不大。关键的时间消耗在于第二点。所以一般情况下我们希望Command Buffer缓存尽可能多的命令，然后一次全部提交给GPU执行。

到这里大家应该就能明白为什么前面说的实验程序要在每次Draw call之间进行渲染状态的切换了。执行了渲染状态的切换强制Runtime在每次Draw call之后都要进行一次Command Buffer的刷新。如果使用相同的渲染状态，那么Command Buffer会缓存很多Draw call的命令，最后一起发送给Driver执行。这样的话我们就无法测试出每个Batch处理的真实开销了。

#### 优化

在产品研发的过程中我们可以预先针对目标平台先设计一个可接受的每帧Batch数量，然后后续美术资源的生产和场景的设计都尽量保证Batch数量不会超标。

在设计Batch数量的时候可以参考以下几个因素：

1.目标平台的CPU性能。

2.我们期望的帧率。

3.Batch提交操作所能够占用的CPU性能百分比（为其他CPU任务留出资源）。


Y = 0.299R+0.587G+0.114B

U = -0.169R-0.331G+0.5B+128

V = 0.5R-0.419G-0.081B+128