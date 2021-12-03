
// import AppController from '../controller/controller';
const AppController = require('../controller/controller');
// import { AppView } from '../view/appView';
const { AppView } = require ('../view/appView');

class App {
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const $sourceNews = document.querySelector('.sources');
    if ($sourceNews) {
      $sourceNews.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
      this.controller.getSources((data) => this.view.drawSources(data));
    }
  }
}

export default App;
