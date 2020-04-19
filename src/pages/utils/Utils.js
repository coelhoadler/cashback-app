export default class Utils {

  static hasLocalstorage() {
    return !!window.localStorage;
  }

  static querySelector(id) {
    return document.querySelector(`#${id}`).value;
  }

  static createJqueryMask() {
    $('.money').mask('####,#0000,0', { reverse: true });
    $('.date').mask('00/00/0000');
  }

  static isLoginPage() {
    const $btnLogin = Utils.querySelector('#formLogin');
    return !!$btnLogin;
  }

  static isPage(pageName) {
    return window.location.href.includes(pageName);
  }

  static sumCashback() {
    let sum = 0;
    document.querySelectorAll('.cashback').forEach(cash => {
      const value = cash.innerHTML;
      sum = sum + parseFloat(value.replace(/\b[^\d\W]+\b\$/g, '').trim());
    });
    return sum.toFixed(2);
  }

  static querySelector(id) {
    return document.querySelector(`#${id}`).value;
  }

  static resetUserForm() {
    document.querySelector("#newUserForm").reset();
  }

  static querySelector(selector) {
    return document.querySelector(`${selector}`);
  }

  static changeHref(path) {
    window.location.href = path;
  }

}
