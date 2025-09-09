function get_content() {
  const url = window.location.href;
  try {
    return { url: url, content: {} };
  } catch (e) {
    console.error(e);
  }
}
function resolve_content(content) {
  //循环content 取出 baseURI innerHTML innerText
  return [...content].map((div) => ({
    outerHTML: div.outerHTML, // 提取 outerHTML
    id: div.id, // 提取 id
    class: div.className, // 提取 class
    innerText: div.innerText, // 提取 innerText
    baseURI: div.baseURI,
    innerHTML: div.innerHTML
  }));
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'get_content') {
    sendResponse(get_content());
  }
});
