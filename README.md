中文:这是一个只有200多行代码的文本基于原生JS的文字漂流特效, 文字会div四周向中间汇集之后会消失,反复运动,本人学习前端也没多久，如果有上面错误还希望大神能够指出或者有更好的实现也可以分享下，后面如果有时间的话，我会继续研究一些有点特色的文字动画，下面我介绍下一些主要参数的含义:

wrap: 最外层的container的类名,该元素的position不能是static，默认该插件我们赋予的类名是 'flow-content'
flowClock: 漂流的文字块 该元素的position 必须是absolute, 默认该插件我们赋予的类名是 'flowClock'
scale: 文字块的缩放比范围
iTimer： 在0 ~ iTimer秒后开始运动
finishTime: 文字块完成时间
direction: 文字块在视口(wrap的范围)外的初始位置
isPause:  onmousever/onmouseout的时候是否pause
isRandomBackgroundColor: 文字块是否随机改变背景颜色
isRandomColor： 文字块是否随机改变颜色


Chinese: This is a text drifting effect based on native JS with only 200 lines of code. The text will disappear and move around in the middle. I haven't learned the front end for a long time. If there are any mistakes mentioned above, I hope God can point them out or have a better implementation, I can share them with you. If there is time in the future. I'll continue to study some of the more distinctive character animations, and I'll show you the meaning of the following main parameters:

Wrap: The outermost container class name whose position cannot be static. By default, the plug-in gives us the class name'flow-content'.

FloClock: A drifting text block. The position of the element must be absolute. By default, the plug-in gives us the class name'flowClock'.

Scaling range of scale: text block

ITimer: starts motion after 0 to iTimer seconds.

FinishTime:  text block completion time
direction：  The initial position of the direction text block outside the viewport (wrap).
isPause:   onmousever/onmouseout suspended?
isRandomBackgroundColor:  block randomly change background color?
isRandomColor:  block change color randomly?


