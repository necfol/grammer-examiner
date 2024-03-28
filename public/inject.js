/*
 * @LastEditors: Necfol
 * @Date: 2024-03-28 21:54:57
 * @LastEditTime: 2024-03-28 22:09:29
 * @FilePath: /grammer-examiner/public/inject.js
 */
console.log("Message from inject.js")
let editorExtensionId = ''
let selectedText = ''

document.addEventListener('mouseup', function () {
  selectedText = document.getSelection().toString()
  chrome.runtime.sendMessage(null, { text: selectedText },
    function (response) {
      console.log('>>>>', response)
    })
})