import './news.css';

module.exports = class News {
  draw(data: any[]) {
    const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const $newsItemTemp = document.querySelector('#newsItemTemp')!;

    news.forEach((item, idx: number) => {
      const $newsClone: HTMLElement = document.createElement('template')!;
      $newsClone.setAttribute('id', 'newsItemTemp');
      $newsClone.innerHTML = $newsItemTemp.innerHTML;
      const $newsItem = $newsClone.querySelector('.news__item');
      if (idx % 2 && $newsItem) $newsItem.classList.add('alt');
      const $metaPhoto = $newsClone.querySelector('.news__meta-photo');
      if ($metaPhoto) {
        $metaPhoto.setAttribute('style', `backgroundImage: url(${item.urlToImage || 'img/news_placeholder.jpg'})`);
      }
      const $metaAuthor = $newsClone.querySelector('.news__meta-author');
      if ($metaAuthor) {
        $metaAuthor.textContent = item.author || item.source.name;
      }
      const $metaDate = $newsClone.querySelector('.news__meta-date');
      if ($metaDate) {
        $metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }
      const $newsTitle = $newsClone.querySelector('.news__description-title');
      const $newsDescrSource = $newsClone.querySelector('.news__description-source');
      const $newsDescrContent = $newsClone.querySelector('.news__description-content');
      const $readMore = $newsClone.querySelector('.news__read-more a');
      if ($newsTitle) {
        $newsTitle.textContent = item.title;
      }
      if ($newsDescrSource) {
        $newsDescrSource.textContent = item.source.name;
      }
      if ($newsDescrContent) {
        $newsDescrContent.textContent = item.description;
      }
      if ($readMore) {
        $readMore.setAttribute('href', item.url);
      }
      fragment.append($newsClone);
    });
    if (document.querySelector('.news')) {
      const $newsContent: Element = document.querySelector('.news')!;
      $newsContent.innerHTML = '';
      $newsContent.appendChild(fragment);
    }
  }
}

// export default News;
