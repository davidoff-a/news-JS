import AppController from '../controller/controller';
import { AppView, INewsResponse, ISourcesResponse,  } from '../view/appView';

class App {
  controller: AppController;
  view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sources = document.querySelector('.sources');
    if (sources instanceof HTMLElement) {
      sources.addEventListener('click', (e) =>
        this.controller.getNews({ e, callback: (data: INewsResponse | undefined) => this.view.drawNews(data) })
      );
    }
    this.controller.getSources((data?: ISourcesResponse): void => this.view.drawSources(data));
  }
}

export default App;
