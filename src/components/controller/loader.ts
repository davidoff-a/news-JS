class Loader {
  constructor(public baseLink: string, public options: { [keys: string]: string }) {
  }

  getResp(
    { endpoint, options = {} },
    callback: () => void = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load({ method: 'GET', endpoint, callback, options });
  }

  load({ method, endpoint, callback, options = {} }: { method: string; endpoint: string; callback: (data?: Response) => void; options?: {}; }) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
    
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: { [keys: string]: string }, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }
}

export default Loader;
