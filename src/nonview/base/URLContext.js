const DELIM = "/?";
export default class URLContext {
  static contextToStr(context) {
    return encodeURIComponent(btoa(JSON.stringify(context)));
  }

  static strToContext(contextStr) {
    try {
      return JSON.parse(atob(decodeURIComponent(contextStr)));
    } catch (e) {
      return {};
    }
  }

  static contextToURL(context) {
    const origin = window.location.origin;
    let urlBase = origin + process.env.PUBLIC_URL;
    return urlBase + DELIM + URLContext.contextToStr(context);
  }

  static urlToContext(url) {
    const urlTokens = url.split("&")[0].split("?");
    if (urlTokens.length !== 2) {
      return {};
    }
    const contextStr = urlTokens[1];
    return URLContext.strToContext(contextStr);
  }

  static getURL() {
    return window.location.href;
  }
  static setURL(url) {
    window.history.pushState("", "", url);
  }

  static setContext(context) {
    const url = URLContext.contextToURL(context);
    URLContext.setURL(url);
  }

  static getContext() {
    const url = URLContext.getURL();
    return URLContext.urlToContext(url);
  }
}
