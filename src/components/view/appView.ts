const News = require('./news/news');
const Sources = require('./sources/sources');

module.exports=class AppView {
  news: any;
  sources: any;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: any): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: any): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

// export default AppView;
