import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: (data?: Response) => void) {
    let target = e.target;
    const newsContainer = e.currentTarget;

    while (target !== newsContainer) {
      if (target instanceof HTMLElement && target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (
          newsContainer instanceof HTMLElement &&
          newsContainer.getAttribute('data-source') !== sourceId &&
          sourceId
        ) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      if (target instanceof HTMLElement) {
        target = target.parentNode;
      }
      
    }
  }
}

export default AppController;
