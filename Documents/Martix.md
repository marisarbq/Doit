# 关于Martix 

## 疑问


### 关于 Array 和 Float32Array 的使用
来自互联网：

使用Float32Array代替浏览器应用程序的标准JavaScript数组时，什么时候有意义？
这个performance test显示了Float32Array通常更慢 – 如果我正确理解了一个标准数组将数字存储为64位 – 所以精度没有优势。

除了任何可能的性能命中，Float32Array还具有可读性的缺点 – 必须使用构造函数：

a = new Float32Array(2);
a[0] = 3.5;
a[1] = 4.5;
而是一个数组文字

a = [3.5, 4.5];
我问这个是因为我正在使用默认为Float32Array的库glMatrix – 并且想知道是否有任何理由我不应该强制它使用Array，而这将允许我使用数组文字。

我通过电子邮件发送了glMatrix的开发者，我的答案包括他的意见(点2和3)：
> 创建一个新对象通常比Float32Array更快。该增益对于小型阵列是重要的，但是与较大的阵列相比较少(环境依赖)。

> 从TypedArray访问数据(例如Float32Array)通常比普通数组更快，这意味着TypedArrays中大多数数组操作(除了创建新对象)都更快。

> 如@emidander所述，glMatrix主要用于WebGL，它需要向量和矩阵作为Float32Array传递。因此，对于WebGL应用程序，从Array到Float32Array的潜在昂贵的转换将需要包含在任何性能测量中。

所以，毫不奇怪，最好的选择是依赖于应用程序：

> 如果数组通常较小，并且/或它们上的操作数量很少，因此构造函数时间是数组寿命的很大一部分，请使用Array。>如果代码可读性与性能一样重要，则使用Array(即使用[]而不是构造函数)。>如果数组非常大，并且/或用于许多操作，则使用TypedArray。>对于WebGL应用程序(或其他需要类型转换的应用程序)，请使用Float32Array(或其他TypedArray)。