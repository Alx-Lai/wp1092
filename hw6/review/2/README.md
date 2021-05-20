# Web Programming HW6
<img width="500" alt="截圖 2021-05-18 下午6 17 14" src="https://user-images.githubusercontent.com/44222693/118762562-fdfa7c00-b8a8-11eb-9e2a-0d3bda461aa5.png">

### How to run
* git pull/clone下來後，`cd frontend`及`cd backend`然後`yarn install`/`npm install`需要的套件
* 主要架構參考ref code，所以前端有用第三方套件
     * 前端套件如果還缺什麼，可能是:<br>
        * `npm install @material-ui/core`  /  `yarn add @material-ui/core`<br>
        * `npm install @material-ui/data-grid`  /  `yarn add @material-ui/data-grid`<br>
     * 後端套件就參照ref code或作業說明
* .env.defaults要打上自己的url!

---
### UI/UX的改變
* 改成下拉式選單選擇query type
* 下方空白分成兩個部分：上面message box顯示個動作回傳的訊息，下方的table顯示query result
* 可以有第二個query condition
### 進階/新增功能
* add/update card:
  * 就跟原本作業基本要求一樣
* query:
  * 如果選擇的query type是score，就會多出現一個可以選擇compare條件的選單(=, >=, >,...)，default是score = ${num}
  <img width="400" alt="截圖 2021-05-18 下午8 14 38" src="https://user-images.githubusercontent.com/44222693/118765457-b0ccd900-b8ad-11eb-8ee7-c28428822571.png"><br>
  
  * 因為畫面有限所以就只有支援多一個query條件(AND/OR)
  * 如果有搜尋到，message box會是regular message的顏色，並顯示Query result: xxx
  * 如果沒有符合query string就會是紅色的message，並顯示 xxx not found! (xxx是parse完query的結果)
  * 如果第二列其中一個項目（AND/OR, queryType, queryString為空），就只會用第一個條件搜尋。一開始load網頁，條件二皆沒有default的值(如最上面的圖所示)。
  * table有支援paging(我設一頁顯示5筆)，及filtering功能
  * 單一與組合搜尋範例如下：
  <img width="400" alt="截圖 2021-05-18 下午6 19 06" src="https://user-images.githubusercontent.com/44222693/118765025-094fa680-b8ad-11eb-897f-fce708732f63.png">
  <img width="400" alt="截圖 2021-05-18 下午6 19 23" src="https://user-images.githubusercontent.com/44222693/118765040-0f458780-b8ad-11eb-992e-f60418f85201.png">
