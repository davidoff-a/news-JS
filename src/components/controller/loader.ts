interface Isettings {
  [key: string]: string;
}

interface IRequest {
  endpoint: string
}

interface IResponse {
  status: string;
  totalResult: string;
  articles: IArticle[];
}

interface IArticle {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
module.exports = class Loader {
  baseLink: string;
  options: Isettings;
  constructor(baseLink: string, options: Isettings) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(endpoint: IRequest, callback: (argument?: string) => void, options?: Isettings) {
    callback ? this.load('GET', endpoint, callback, options) : console.error('No callback for GET response');
  }

  errorHandler(res: any) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Isettings = {}, endpoint: IRequest,): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint.endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: IRequest, callback: (argument?: string) => void, options: Isettings = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
};

// export default Loader;
