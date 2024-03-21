const DELIM = "/?";
export default class URLContext {
  static contextToStr(context) {
    return Object.entries(context).map(
      function([key, value]) {
        return key + "=" + value;
      },
    ).join("&");
  }

  static strToContext(contextStr) {
    return Object.fromEntries(
      contextStr.split("&").map(
        function(token) {
          const [key, value] = token.split("=");
          return [key, value];
        },
      ),
    )
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
