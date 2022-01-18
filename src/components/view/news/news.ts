import './news.css';
export interface INews {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
class News {
  draw(data: INews[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
    const newsBlock = document.querySelector('.news');
    if (newsBlock) {
      newsBlock.innerHTML = '';
    }
    news.forEach((item, idx) => {
      const newsItem = idx % 2 ? this.createElement('div', ['news__item', 'alt']) : this.createElement('div', ['news__item']);

      const newsMetaDate = this.createElement('li', ['news__meta-date']);
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      const newsMetaAuthor = this.createElement('li', ['news__meta-author']);
      newsMetaAuthor.textContent = item.author || item.source.name;
      const newsMetaDetails = this.createElement('ul', ['news__meta-details']);
      const newsMetaPhoto = this.createElement('div', ['news__meta-photo']);
      newsMetaPhoto.style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;
      const newsMeta = this.createElement('div', ['news__meta']);
      const newsMore = this.createElement('a', [], { href: item.url });
      newsMore.innerText = 'Read More';
      const newsReadMore = this.createElement('p', ['news__read-more']);
      newsReadMore.insertAdjacentElement('beforeend', newsMore);
      const newsContent = this.createElement('p', ['news__description-content']);
      newsContent.textContent = item.description;
      const newsSource = this.createElement('h3', ['news__description-source']);
      newsSource.textContent = item.source.name;
      const newsTitle = this.createElement('h2', ['news__description-title']);
      newsTitle.textContent = item.title;
      const newsDescription = this.createElement('div', ['news__description']);
      newsMetaDetails.insertAdjacentElement('beforeend', newsMetaAuthor);
      newsMetaDetails.insertAdjacentElement('beforeend', newsMetaDate);
      newsMeta.insertAdjacentElement('beforeend', newsMetaPhoto);
      newsMeta.insertAdjacentElement('beforeend', newsMetaDetails);
      newsDescription.insertAdjacentElement('beforeend', newsTitle);
      newsDescription.insertAdjacentElement('beforeend', newsSource);
      newsDescription.insertAdjacentElement('beforeend', newsContent);
      newsDescription.insertAdjacentElement('beforeend', newsReadMore);
        newsItem.insertAdjacentElement('beforeend', newsMeta);
        newsItem.insertAdjacentElement('beforeend', newsDescription);
      
      
      if (newsBlock) {
        newsBlock.appendChild(newsItem);
      }

    });
    
  }

  createElement(selector: string, classNames?: string[], attribs?: { [keys: string]: string }): HTMLElement {
    const element = document.createElement(selector);
    if (classNames) {
      classNames.forEach((className) => {
        element.classList.add(className);
      });
    }
    if (attribs) {
      Object.entries(attribs).forEach((item) => {
        element.setAttribute(item[0], item[1]);
      });
    }
    return element;
  }
}

export default News;
