const CONTEXT_MENU_ID = 'grammerExaminer';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.storage.local.set({ [`${CONTEXT_MENU_ID}-selected`]: message.text });
  chrome.storage.local.set({ [`${CONTEXT_MENU_ID}-tab`]: sender.tab.id });
  return true;
});