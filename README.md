- # **[109-2] Web Programming Final** 

    ### **(Group 11) Fake Gartic**

    - #### Demo Link: https://youtu.be/T1EIi8VVUwU

    - #### **服務內容**

      這是一個仿造gartic.io的多人線上你畫我猜遊戲。

    - #### **使用與參考之框架/模組/原始碼**

      Frontend: react, javascripts, antd , CSS, html

      Backend: nodeJS, express, websocket

      Database: mongoDB

    - #### **Deploy Link: ** https://alx-lai.github.io/gartic-frontend/ 

      **重要：因為伺服器好像不會一直開著，depoly連結若閒置一段時間server就會自動關閉，並出現"Server connection error"的警告，是正常的，請先開啟 https://fake-garticio.herokuapp.com/ 連結，看到題庫後再打開該連結。**

    - #### 專題製作心得

      **B09902088 資工一 傅樂芸**

      我沒想到經過一學期我能從連javascript都不太會寫，到能夠和同學合作寫一個完整的全端網路服務，甚至是一個可以同時多人連線遊玩的網路遊戲，我自己都覺得不可思議。自己從零開始寫一個網路遊戲之後才發現，要同時處理多個玩家的各種 request非常不容易，除了要應付隨時新有玩家加入，還要考慮各種玩家隨時可能離線的狀況，並包持遊戲正常運作，真的不是想像中的簡單。為了讓遊戲正常運作，我們必須想盡各種辦法測試所有可能出bug的情況，並設法處理每一種情況。除此之外，遊戲的UI為了讓使用者舒服的使用，我們也做了很多優化，例如畫畫時拖移滑鼠不能讓它亂選取文字、進度條的隨著時間改變顏色等。這次專題製作也讓我更熟悉如何用git進行與他人進行合作，包括處理conflict、找回之前的版本、合併等。整題而言，製作的過程中將所學應用出來真的很有趣，也學到怎麼處理很多只有自己做才會遇到的問題，雖然途中也會有一直冒出新bug，總覺得bug永遠de不完的時候，但還是很慶幸自己選了這們課。

      **B09902135 資工一 賴豊彰**

      我發現其實網路服務並沒有想像中好做，除了基礎功能要正常以外，還要去考慮使用者本身會不會有什麼出乎意料的操作，進而導致server端出錯，而且因為我參與過跟同學做專題的次數不多，在這個專題裡面還可以順便熟悉分工的部分，在這個課中獲益良多!!!

    - #### 如何在 localhost 安裝與測試之詳細步驟

      首先clone repo

      ```
      git clone https://github.com/Alx-Lai/wp1092.git
      ```

      然後install 該有的東西

      ```
      cd wp1092/final
      cd frontend
      npm install
      cd ../backend
      npm install
      ```

      開兩個command line / terminal， 一個在frontend 一個在backend （請先開啟backend）

      ```
      //backend
      npm run server
      //frontend 
      npm start
      開啟localhost:3000
      // 等到 backend的console顯示 “Mongo database connected!” 再開始遊戲
      ```

    - #### 詳細功能介紹：

      - **登入頁面**
        - 點擊頭像左側的icon可切換頭像顏色（會保留到遊戲中）
        - 空白的名字或太長的名字不能成功進入房間，顯示警告
        - 按play 或按enter進入遊戲頁面
      - **遊戲頁面**
        - 進入遊戲介面後，若進入到一個已經在遊戲的房間，會等到下一輪才能進入遊戲；若進入到人數還不夠的房間（<3人），則會等待到湊滿三人遊戲才開始
        - 每個房間最多十個人，若再有新的人加入會進入另一個房間
        - 左邊顯示目前在此房間的玩家列表
          - 顯示分數及名字
          - 自己會上列表最上端以淺綠色顯示，其他人則是較暗沈的顏色
        - 每輪有人猜對答案時會分數會增加，猜對的玩家旁會顯示一個綠色小勾，到下一輪時會消失
        - 當輪的畫畫的人名字旁邊會加上(Drawer)的文字
        - 右邊上方為主畫面，遊戲分為兩種時間：
          - **準備時間**：會顯示一些遊戲相關文字資訊，例如：
            - 除了最後一輪每輪都會在下方顯示你下一輪的角色（"You are drawing" 或"You are guessing"）
            - 第一輪準備時間時會顯示"Game is about to start" 
            - 其他輪則會顯示上一輪的答案： "The answer of last round is (answer)"
            - 最後一輪則會顯示贏家，以及根據你是否為贏家顯示鼓勵文字（"Well done!"或"It's ok! You got it next time"）。
          - **畫畫時間**：drawer可以在螢幕上用滑鼠拖移作畫，guesser則會即時看見他畫的圖
            - drawer會看到一個工具列，預設是選取畫筆工具，也可以切換成橡皮擦工具，目前在使用的工具會顯示綠色
            - 點擊最左邊的icon可以更改顏色，點擊最右邊的掃把icon會清空整個圖
          - 當所有人都猜對會結束畫畫時間，並在準備時間顯示“Everybody hit the answer!”
        - 右下方分為兩個部分：
          - **訊息欄**：畫畫時間的 guesser 可以在下方輸入想猜的答案
            - 答案太長或包含非字母不能成功送出，會出現警告
            - 只有在畫畫時間且為guesser才能輸入，猜對答案後的guesser也不能再輸入
            - 對話框中可以看見別人的猜測，猜對的訊息會被包裝成綠色的"(name) hits the answer!"
            - 若自己猜對：則會顯示綠色的"You hit the answer!"
          - **計時欄**：一個顯示所剩時間的圓圈進度條
            - 只有在畫畫時間會顯示
            - drawer的圓圈中會顯示題目，是從題庫中隨機產生的
            - 預設是綠色，當時間少於40％進度條會變成黃色；當時間少於20％進度條會變成紅色
        - 遊戲結束後，所有人會回到登入畫面，會保留上次輸入的名字選取的顏色，按play 或按enter可再次進入另一場遊戲
      - **玩家離線處理**：
        - 若有玩家在遊戲中離線，左方的列表會移除該玩家
        - 若在遊戲中只剩一個玩家，會顯示"Everyone else disconnected"並將該玩家移除遊戲
        - 若drawer在畫畫時間離線會結束畫畫時間，並在準備時間顯示“Drawer disconnected...”
        - 若在準備時間下一輪的 drawer離線，也會在準備時間顯示“Drawer disconnected...”，並且會自動分發給另一個drawer。（若新分發的 drawer也離線，或再次分發，直到剩一個人為止）
      - 若Server斷線，會顯示“Please refresh the page”的提示訊息
      - **後端新增題目**：
        - 開啟localhost:8080，會顯示題目列表，它們會隨機出現在遊戲中
        - 在下方輸入框中輸入想新增的題目，並按下create，若沒有被新增過，會加入到題庫中並在上方題目列表中顯示（往下滑即可看到，若沒有出現代表已經被新增過）

    - #### 每位組員之負責項目 

      **B09902088 資工一 傅樂芸**

      前端部分為主
      包含前端畫面及效果設計，React hook及與後端溝通
      以及error測試及Demo影片

      ##### **B09902135 資工一 賴豊彰**

      後端部分為主
      包含後端連接db、處理client的房間分配，遊戲的回合控制及與前端溝通
      以及部屬至雲端
