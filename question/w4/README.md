# week4

## Table of Contents

- [Q1. 當新增或編輯完資料點擊存檔後，modal 不會自動關閉](#q1-當新增或編輯完資料點擊存檔後modal-不會自動關閉)
- [Q2. new.bootstrap.modal(this.$refs.prodModal) 取得的是哪一個的 ref？](#q2-newbootstrapmodalthisrefsprodmodal-取得的是哪一個的-ref)

## Q1. 當新增或編輯完資料點擊存檔後，modal 不會自動關閉。

### 問題說明

有在 prod-modal.js 的 updateProd() 裡加上 [`this.hideModal();`](https://github.com/elaineliu7598/Vue-Live/blob/91671a52f3658572fa1a8fdb8f74b68444f2e7d3/question/w4/src/components/prod-modal.js#L33)，但沒有作用也沒報錯。

### 問題分析

bootstrap 的 modal 沒有使用同一個實體，目前在 [prod-modal.js](https://github.com/elaineliu7598/Vue-Live/blob/91671a52f3658572fa1a8fdb8f74b68444f2e7d3/question/w4/src/components/prod-modal.js#L14) 和 [products.js](https://github.com/elaineliu7598/Vue-Live/blob/91671a52f3658572fa1a8fdb8f74b68444f2e7d3/question/w4/src/products.js#L33) 都有建立 modal 實體。
以編輯產品為例，編輯時打開的是 products.js 建的 modal，但關閉時卻是呼叫 prod-modal.js 建的 modal。

### 解法

#### step1：

僅在 prod-modal.js 建立 modal 實體，並用 `refs` 取代 `getElementById` 的方式去取得 DOM 元素。

▲ 實作：

在元件標籤加上 `ref` 屬性並自訂名稱： `<modal-for-prod ref="prodModal">`。

modal 實體使用 `$refs` 去選取 DOM： `prodModal = new bootstrap.Modal(this.$refs.prodModal);`。

#### step2：

目前的 [HTML 結構](https://github.com/elaineliu7598/Vue-Live/blob/91671a52f3658572fa1a8fdb8f74b68444f2e7d3/question/w4/products.html#L61-L64)，即使在元件標籤加上 `ref` 屬性，在元件 `mounted()` 時會抓不到 DOM 並報錯：「Uncaught TypeError: Cannot read properties of undefined (reading 'ClassList')」，這是因為建 modal 實體時 `this.$refs` 找不到 prodModal 這個 DOM。

因此要把原本包住 `<modal-for-prod>` 的外層 `<div class="modal fade ...略>"` 移到[元件 template 內](https://github.com/elaineliu7598/Vue-Live/blob/91671a52f3658572fa1a8fdb8f74b68444f2e7d3/question/w4/products.html#L99)並加上 `ref` 屬性。

▲ 實作：
```html
<modal-for-prod ref="prodModal" :temp-prod="tempProd" @get-prod="getProds" :is-new="isNew"></modal-for-prod>

<script type="text/x-template" id="prodModalTemplate" >
    <div ref="prodModal" class="modal fade" id="prodModal" ...略>
        <div  class="modal-dialog modal-xl modal-dialog-scrollable">
	下略....
```

#### step3：

上述完成之後，在觸發 `openProdModal()` 時，就可以用 `this.$refs.prodModal.showModal()` 呼叫在 prod-modal.js 寫好的 `showModal()`

### 學習：refs

1. 在 HTML Elememt 上加 `ref="自訂名稱"`，可透過 `this.$refs.自訂名稱` 取得 DOM 元素。

2. 在元件標籤上加 `ref="自訂名稱"`，可透過 `this.$refs.自訂名稱` 取得元件資訊、修改元件內容、使用元件函式等。


## Q2. `new.bootstrap.modal(this.$refs.prodModal)` 取得的是哪一個的 ref？

### 問題說明

目前在元件標籤 `<modal-for-prod>` 以及 x-template 裡的 modal 都有 `ref="prodModal"`，根據測試，這兩個地方都要加上 `refs` 才不會報錯。

若只加在元件標籤上，無法渲染產品列表且報錯：「Uncaught TypeError: Cannot read properties of undefined (reading 'ClassList')」

若只加在 x-template 的 modal 裡，有渲染產品列表，但點擊新增或編輯時會報錯：「Uncaught TypeError: Cannot read properties of undefined (reading 'showModal')」

### 問題分析

![diagram](https://i.imgur.com/VAjVDYA.png)

prod-modal.js：元件 `mounted()` 時，`this.$refs.prodModal` 取得 x-template 裡 modal 這個 DOM 元素。
products.js：點擊新增或編輯時（aka 觸發 `openProdModal()`），`this.$refs.prodModal` 取得 modalForProd 整包元件內容，包含 data、methods 等資料和函式。

因此，若 `ref` 只加在元件標籤上，當元件 `mounted()` 時無法取得 x-template 裡 modal 的 DOM，才會出現無法讀取 ClassList 屬性的錯誤。若只加在 x-template 的 modal 裡，則無法取用 modalForProd 元件的內容，所以出現無法讀取 showModal 屬性的錯誤。

### 解法

根據以上說明，
1. 回答 Q2：

    `new.bootstrap.modal(this.$refs.prodModal)` 取得的是 x-template 裡的 modal DOM。

    可藉由調整 `<modal-for-prod>` 的 `ref` 命名，去對應 `openProdModal()` 中的 `this.$refs` 做[驗證](https://github.com/elaineliu7598/Vue-Live/commit/2904f9baaf7e76ad700b4b4ecccf38947419d93c)。

2. 回到 Q1 的解法：

    建立 modal 實體時，其實可以維持用 `getElementById` 的方式取 DOM，不一定要使用 `ref` 的方式。如果使用 `getElementById` 就不需在 x-template 的 modal 加 `ref`。

    影響 Q1 的關鍵在：元件標籤要加 `ref`，以及 step2 提到的 HTML 結構，解決這兩點，就可以透過 `this.$refs` 去呼叫函式。
