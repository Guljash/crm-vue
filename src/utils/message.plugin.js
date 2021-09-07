export default {
  install(app) {
    app.config.globalProperties.$message = function (text) {
      window.M.toast({ html: text });
    };
    app.config.globalProperties.$error = function (html) {
      window.M.toast({ html: `[Ошибка]: ${html}` });
    };
  },
};
