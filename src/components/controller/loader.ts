<<<<<<< HEAD
class Loader {
  constructor(public baseLink: string, public options: { [keys: string]: string }) {}

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
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
    options?: { [keys: string]: string };
  }): void {
    fetch(this.makeUrl({ options, endpoint }), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: Response) => callback(data))
      .catch((err: string) => {
        throw new Error(err);
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
=======
import { ISource } from "../view/sources/sources";

class Loader {
  constructor(public baseLink: string, public options: { [keys: string]: string }) {}

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
    callback: () => void = () => {
      console.error('No callback for GET response');
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
    options?: {};
  }): void {
    fetch(this.makeUrl({ options, endpoint }), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: Response) => callback(data))
      .catch((err: Error) => console.error(err));
  }

  errorHandler(res: Response): Response {
    console.log(res);
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
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
>>>>>>> 5b14797 (feat: migrate all files to typescript)
