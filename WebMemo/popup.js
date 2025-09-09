document.addEventListener('DOMContentLoaded', function () {
  const apiPathInput = document.getElementById('apiPath');
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveBtn');
  const clearButton = document.getElementById('clearBtn');
  const statusMsg = document.getElementById('statusMsg');
  // 从 chrome.storage 读取数据
  chrome.storage.local.get(['apiPath', 'apiKey'], (data) => {
    if (data.apiPath) apiPathInput.value = data.apiPath;
    apiPathInput.disabled = true;
    if (data.apiKey) apiKeyInput.value = data.apiKey;
    apiKeyInput.disabled = true;
  });

  // 保存数据
  saveButton.addEventListener('click', function () {
    const apiPath = apiPathInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!apiPath || !apiKey) {
      statusMsg.style.color = 'red';
      statusMsg.textContent = 'API 路径和 API Key 不能为空!';
      return;
    }

    if (!isValidURL(apiPath)) {
      statusMsg.style.color = 'red';
      statusMsg.textContent = '请输入有效的 API 地址!';
      return;
    }

    chrome.storage.local.set({ apiPath, apiKey }, () => {
      statusMsg.style.color = 'green';
      statusMsg.textContent = '设置已保存!';
      apiPathInput.disabled = true;
      apiKeyInput.disabled = true;
      setTimeout(() => {
        statusMsg.textContent = '';
      }, 2000);
    });
  });

  // 清除数据
  clearButton.addEventListener('click', function () {
    chrome.storage.local.remove(['apiPath', 'apiKey'], () => {
      apiPathInput.disabled = false;
      apiKeyInput.disabled = false;
      apiPathInput.value = '';
      apiKeyInput.value = '';
      statusMsg.style.color = 'green';
      statusMsg.textContent = '设置已清除!';
      setTimeout(() => {
        statusMsg.textContent = '';
      }, 2000);
    });
  });

  // 验证 URL 格式
  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
});
