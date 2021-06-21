## hw7 Chatroom

[Initial]
1.  <code>cd backend</code> && <code>npm install</code> && 
    <code>npm install dotenv-defaults --save </code>
2.  Adding /.env, <code>cd ..</code>
3.  <code>cd frontend</code> && <code>npm install</code> && <code>cd ..</code>
4.  In "own", <code>yarn start</code> && <code>yarn server</code>



[完成的進階]
• 盡可能 cover 各種錯誤操作：
    ✓ 未輸入名字就按 “Sign In”
    ✓ 未開啟任何 ChatBox 就送出訊息
    ✓ 創建 ChatBox 時沒有輸入對話者名字，或者是與對話者之 ChatBox 已開啟
• 處理 “Line Wrapping” 