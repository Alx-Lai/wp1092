- ## 期末專題報告
    - #### 遊戲簡介：

        多人線上你畫我猜遊戲

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
        開兩個command line / terminal 一個在frontend 一個在backend （請先開啟backend）
        ```
        //backend
        npm run server
        //frontend 
        npm start
        // 等到 backend的console顯示 “Mongo database connected!” 再開始遊戲
        ```
        
    - #### 功能介紹：

        - **登入頁面**
            - 點擊頭像左側的icon可切換頭像顏色（會保留到遊戲中）
            - 空白的名字或太長的名字不能成功進入房間，顯示警告
            - 按play 或按enter進入遊戲頁面
        - **遊戲頁面**
            - 進入遊戲介面後，若進入到一個已經在遊戲的房間，會等到下一輪才能進入遊戲；若進入到人數還不夠的房間（<3人），則會等待到湊滿三人遊戲才開始
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
                    - drawer的圓圈中會顯示題目
                    - 預設是綠色，當時間少於40％進度條會變成黃色；當時間少於20％進度條會變成紅色
        - 遊戲結束後，所有人會回到登入畫面，會保留上次輸入的名字選取的顏色，按play 或按enter可再次進入另一場遊戲
        - **玩家離線處理**：
            - 若有玩家在遊戲中離線，左方的列表會移除該玩家
            - 若在遊戲中只剩一個玩家，會顯示"Everyone else disconnected"並將該玩家移除遊戲
            - 若drawer在畫畫時間離線會結束畫畫時間，並在準備時間顯示“Drawer disconnected...”
            - 若在準備時間下一輪的 drawer離線，也會在準備時間顯示“Drawer disconnected...”，並且會自動分發給另一個drawer。（若新分發的 drawer也離線，或再次分發，直到剩一個人為止）

    - #### 組員負責項目 

        ##### 傅樂芸 B09902088

        前端部分為主
        包含前端畫面及效果設計，React hook及與後端溝通
        以及極端情況測試

        ##### 賴豊彰 B09902135

        後端部分為主
        包含後端連接db、處理client的房間分配，遊戲的回合控制及與前端溝通
        以及部屬至雲端
