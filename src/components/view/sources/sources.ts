import './sources.css';
export interface ISource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  language: string;
  country: string;
}
class Sources {
  draw(data: ISource[]): void {
    const sourceItemTemp = document.querySelector('.sources.buttons');

    data.forEach((item) => {
      const sourceSpan: HTMLElement = this.createElement('span', ['source__item-name'], {});
      sourceSpan.innerText = item.name;
      const source = this.createElement('div', ['source__item'], { "data-source-id": item.id });
      source.insertAdjacentElement("beforeend", sourceSpan);
      if (sourceItemTemp instanceof HTMLElement) {
        sourceItemTemp.insertAdjacentElement("beforeend", source);
      }
    })
  }

  createElement(selector: string, classNames: string[], attribs: { [keys: string]: string }): HTMLElement {
    const element = document.createElement(selector);
    classNames.forEach((className) => {
      element.classList.add(className);
    });
    // console.log(`атрибуты => ${Object.entries(attribs)}`);
    Object.entries(attribs).forEach((item) => {
      element.setAttribute(item[0], item[1]);
    });
    return element;
  }
}

export default Sources;
