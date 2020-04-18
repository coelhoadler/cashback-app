module.exports = {
  hasLocalstorage() {
    return !!window.localStorage;
  },
  querySelector(id) {
    return document.querySelector(`#${id}`).value;
  },
  createMask() {
    $('.money').mask('####,#0000,0', { reverse: true });
    $('.date').mask('00/00/0000');
  }
}
