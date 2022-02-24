# Vue 直播班 2022春

## Contents
- [week1：從函式拆解認識設計模式](#week1從函式拆解認識設計模式)
- [week2：RESTful API 串接](#week2restful-api-串接)
- [week3：熟練 Vue.js](#week3熟練-vuejs)
- [week4：元件化](#week4元件化)

## week1：從函式拆解認識設計模式
* Demo：https://elaineliu7598.github.io/Vue-Live/week1/
* 使用課程版型
* 學習：
    * Vue 初始化
    * 設計模式
    * 關注點分離
* 任務：
    * 使用者可以查看產品列表
    * 使用者可以點擊單一產品，查看詳細資訊

## week2：RESTful API 串接
* Demo：https://elaineliu7598.github.io/Vue-Live/week2/login.html
* 學習：
    * Vue 的運作
    * Promise
    * API 串接
    * token 取得和儲存到 cookie
    * cookie  
* 任務：
    * 使用者可以從登入頁面登入，並轉到後台商品頁面
    * 使用者若無登入直接進入商品頁面，會被導回登入頁面
    * 使用者可以查看產品列表
    * 使用者可以點擊單一產品，查看詳細資訊

## week3：熟練 Vue.js
* Demo：https://elaineliu7598.github.io/Vue-Live/week3/login.html
* 學習：
    * 熟悉 Vue.js 的各項語法及指令
    * 物件傳參考
    * Watch 和 Computed
* 任務：
    * 使用者可以新增、編輯、刪除商品
    * 商品啟用、關閉可以使用不同的顏色標示
    * 不使用 Bootstrap 資料屬性，改用 JavaScript 開啟 modal

## week4：元件化
* Demo：https://elaineliu7598.github.io/Vue-Live/week4/login.html
* 學習：
  * 元件註冊：全域、區域、模組化
  * 元件樣板：template、x-template
  * 元件運用
  * 元件資料的傳遞：
    * Props：外層元件資料向內層元件傳遞
    * Emit：內層元件資料向外層元件傳遞
    * Slot：內層元件開一個缺口給外層元件使用，讓外層元件可以操作內層元件的 HTML 結構
    * Mitt：套件，跨元件傳遞資料
  * 用 `refs` 操作 DOM
* 任務：
  * 將第三週任務的後台頁面 Modal 以及分頁改成元件 
  * 使用 import module 來引入元件
  * 使用者可以打開 Modal 新增、編輯、刪除商品
