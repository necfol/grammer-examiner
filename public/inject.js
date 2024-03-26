console.log("Message from inject.js")
let editorExtensionId = 'jjdkahokkklbddcgkbamaodgkhmdknfe'
let selectedText = ''

document.addEventListener('mouseup', function () {
  selectedText = document.getSelection().toString()
  chrome.runtime.sendMessage(editorExtensionId, { text: selectedText },
    function (response) {
      console.log('>>>>', response)
    })
})