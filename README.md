COSCUP 2011 布景主題
===================

## 目录配置

### assets

共用 CSS / JS / 图片，
各种网站的布景主题应该连到 http://coscup.org/2011-theme/assets/
共用这些资料（不然每次修改会 port 的很辛苦）。

### mockup

假页面，从 empty.html 这边开始抄需要的HTML做布景主题。

请在 mockup 搜寻 "assets" 这个字取代路径 + 把引用的 script 加上 .min.js。
*最后请记得上 Google Analytics*。

### deploy

php 程序，自动从 github 用 svn 下载文件到 shared hosting 环境

### drupal

赞助表单用的布景主题

### blogger

COSCUP blog 用的布景主題

### marksite

主网站用布景主题

### wordpress

今年不会用到（希望不会）

### 其他

* 报名系统也是 https://code.google.com/p/eva-fun/

## 原则

1. assets 共用（如上述）
2. 沒有用 CSS Reset，故內文的 HTML 会以浏览器预设值呈现。
不够用的话当然欢迎自己加 site-specific style
3. style.css 用 SASS 做，手动修的话我会人工 port 回 scss。
（当然还是建议从 scss 改啦）
4. Script minify 使用 Closure Complier，可用 http://closure-compiler.appspot.com/home 
或是 https://github.com/gugod/bin/raw/master/closure-compiler.pl

## Commit Rule

觉得不用 review 的就自己 commit，觉得需要就送 pull request，
*自由心证*。我也有可能會 review 完之后叫你自己 push 上來。

### 自动 Deploy

上述的 deploy script 已经设定在 Github 的 post-receive URL：
http://help.github.com/post-receive-hooks/
所以 commit 会直接 live。