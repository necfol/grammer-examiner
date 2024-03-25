const CONTEXT_MENU_ID = 'grammerExaminer';

chrome.contextMenus.create({
  type: 'normal',
  title: 'Grammer Examiner',
  id: 'grammerExaminer',
  contexts: ['all'],
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    chrome.storage.sync.set({ [`${CONTEXT_MENU_ID}-selected`]: info.selectionText });
	}
});