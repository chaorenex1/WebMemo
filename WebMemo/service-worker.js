chrome.webNavigation.onCompleted.addListener((details) => {
  let api_path = '';
  let api_key = '';
  chrome.storage.local.get(['apiPath', 'apiKey'], (data) => {
    api_path = data.apiPath || '';
    api_key = data.apiKey || '';
  });
  let ua = navigator.userAgent;

  chrome.scripting.executeScript(
    {
      target: { tabId: details.tabId },
      files: ['content.js']
    },
    (results) => {
      console.log('results', results);
      fetchFromBg({
        url: api_path + '/v1/web_memo',
        method: 'POST',
        body: {
          url: details.url,
          ua: ua
        },
        headers: {
          Authorization: `Bearer ${api_key}`,
          'X-API-Key': api_key
        }
      }).then((r) => r);
      // .then((result) => console.log('fetchFromBg ok', result))
      // .catch(() => console.log('fetchFromBg fail'));
      return true;
    }
  );
  chrome.tabs.sendMessage(
    details.tabId,
    { action: 'get_content' },
    (response) => {
      if (response) {
        console.debug('get_content ok', response);
      } else {
        console.debug('get_content error', response);
      }
    }
  );
});

async function fetchFromBg({ url, method = 'GET', body = null, headers = {} }) {
  const opts = {
    method,
    headers: { Accept: 'application/json', ...headers }
  };
  if (body) {
    opts.body = typeof body === 'string' ? body : JSON.stringify(body);
    opts.headers['Content-Type'] =
      opts.headers['Content-Type'] || 'application/json';
  }
  opts.credentials = 'include';
  let resp = null;
  try {
    resp = await fetch(url, opts);
    if (resp && !resp.ok) {
      return { error: `HTTP error! status: ${resp.status}` };
    }
  } catch (error) {
    return { error: error.message };
  }
  return await resp.json();
}
