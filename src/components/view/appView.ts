import News from './news/news';
import Sources, { ISource } from './sources/sources';
import { INews } from './news/news';
export interface ISourcesResponse {
  status: string;
  sources: ISource[];
}
export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: INews[];
}
export class AppView {
  news: News;
  sources: Sources;
  // drawNews: (data: Response | undefined) => void;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: INewsResponse | undefined): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: ISourcesResponse | undefined): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
