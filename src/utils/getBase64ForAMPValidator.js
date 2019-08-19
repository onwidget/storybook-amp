// ucs-2 string to base64 encoded ascii

export default (str) => {

 return window.btoa(unescape(encodeURIComponent(str)));
}