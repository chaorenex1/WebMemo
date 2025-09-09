chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('Completed', details);
  chrome.storage.sync.get(['apiPath', 'apiKey'], (data) => {
    console.log('data', data);
  });
  console.log('UA', navigator.userAgent);
  chrome.storage.local.set({ userAgent: navigator.userAgent });
  chrome.scripting.executeScript(
    {
      target: { tabId: details.tabId },
      files: ['content.js']
    },
    (results) => {
      if (results && results[0] && results[0].result) {
        console.log('result', results[0]);
      } else {
        console.log('error', results);
      }
    }
  );
  chrome.tabs.sendMessage(
    details.tabId,
    { action: 'get_content' },
    (response) => {
      if (response) {
        console.log('ok', response);
      } else {
        console.log('error', response);
      }
    }
  );
});
