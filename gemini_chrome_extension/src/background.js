chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'toggle-gemini-sidebar' });
  } catch (e) {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['src/sidebar.css']
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['src/sidebar.js']
    });
    setTimeout(async () => {
      try {
        await chrome.tabs.sendMessage(tab.id, { action: 'toggle-gemini-sidebar' });
      } catch (e2) {}
    }, 300);
  }
});
