const Loader = require('./loader');
// console.log(Loader);


module.exports = class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '66048ed48bba4266a3ef2f842906e98d', // получите свой ключ https://newsapi.org/
    });
  }
};
