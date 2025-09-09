function get_content() {
  const url = window.location.href;
  if (url.indexOf('pixiv') > -1) {
    try {
      const content = document.querySelectorAll('div[role]');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else if (url.indexOf('blog.csdn.net') > -1) {
    try {
      const content = document.querySelectorAll('div#article_content');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else if (url.indexOf('jianshu') > -1) {
    try {
      const content = document.querySelectorAll('div.show-content');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else if (url.indexOf('zhihu') > -1) {
    try {
      const content = document.querySelectorAll('div.Post-RichTextContainer');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else if (url.indexOf('51cto') > -1) {
    try {
      const content = document.querySelectorAll('div.article-left');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else if (url.indexOf('cnblogs') > -1) {
    try {
      const content = document.querySelectorAll('div#topics');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else if (url.indexOf('cloud.tencent.com/developer/article') > -1) {
    try {
      const content = document.querySelectorAll('div.mod-article-content');
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      const content = document.body;
      return { url: url, content: resolve_content(content) };
    } catch (e) {
      console.error(e);
    }
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
