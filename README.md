COSCUP 2011 佈景主題
===================

## 目錄配置

### assets

共用 CSS / JS / 圖片，
各個網站的佈景主題應該連到 http://coscup.org/2011-theme/assets/
共用這些資料（不然每次修改會 port 的很辛苦）。

### mockup

假頁面，從 empty.html 這邊開始抄需要的 HTML 做佈景主題。

請在 mockup 搜尋 "assets" 這個字取代路徑 + 把引用的 script 加上 .min.js。

### deploy

php 程式，自動從 github 用 svn 拉檔案到 shared hosting 環境

### drupal

贊助表單用的佈景主題

### blogger

COSCUP blog 用的佈景主題

### wordpress

今年不會用到（希望不會）

### 其他

* 主網站的佈景主題放在自己的 https://github.com/COSCUP/coscup2011-src
* 報名系統也是 https://code.google.com/p/eva-fun/

## 原則

1. assets 共用（如前述）
2. 沒有用 CSS Reset，故內文的 HTML 會以瀏覽器預設值呈現。
不夠用的話當然歡迎自己加 site-specific style
3. style.css 用 SASS 做，手動修的話我會人工 port 回 scss。
（當然還是建議從 scss 改啦）
4. Script minify 使用 Closure Complier，可用 http://closure-compiler.appspot.com/home 
或是 https://github.com/gugod/bin/raw/master/closure-compiler.pl

## Commit Rule

覺得不用 review 的就自己 commit，覺得需要就送 pull request，
*自由心證*。我也有可能會 review 完之後叫你自己 push 上來。

### 自動 Deploy

前述的 deploy script 已經設定在 Github 的 post-receive URL：
http://help.github.com/post-receive-hooks/
所以 commit 會直接 live。