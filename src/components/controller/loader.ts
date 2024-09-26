// import { ISource } from '../view/sources/sources';

class Loader {
  constructor(public baseLink: string, public options: { [keys: string]: string }) {}

  getResp(
    { endpoint, options }: { endpoint: string; options?: { [key: string]: string } },
    callback: () => void = () => {
      throw new Error('No callback for GET response');
    }
  ): void {
    this.load({ method: 'GET', endpoint, callback, options });
  }

  load({
    method,
    endpoint,
    callback,
    options = {},
  }: {
    method: string;
    endpoint: string;
    callback: (data?: Response) => void;
    options?: { [key: string]: string };
  }): void {
    fetch(this.makeUrl({ options, endpoint }), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: Response) => callback(data))
      .catch((err: Error) => {
        throw new Error(`${err}`);
      });
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        throw new Error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl({ options, endpoint }: { options: { [keys: string]: string }; endpoint: string }): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }
}

export default Loader;
