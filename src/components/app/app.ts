import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller: AppController;
  view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sourses = document.querySelector('.sources');
    if (sourses instanceof HTMLElement) {
      sourses.addEventListener('click', (e) => this.controller.getNews(e, (data:Response|undefined) => this.view.drawNews(data)));
    }
    this.controller.getSources((data:Response) => this.view.drawSources(data));
  }
}

export default App;
