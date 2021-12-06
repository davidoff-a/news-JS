import './sources.css';

module.exports = class Sources {
  draw(data: any) {
    const fragment = document.createDocumentFragment();
    const $sourceItemTemp = document.querySelector('#sourceItemTemp');

    data.forEach((item: any) => {
      if ($sourceItemTemp) {
        const $sourceClone = document.createElement('template');
        $sourceClone.setAttribute('id', 'sourceItemTemp');
        $sourceClone.innerHTML = $sourceItemTemp.innerHTML;
        const $sourceItemName = $sourceClone.querySelector('.source__item-name');
        if ($sourceItemName) {
          $sourceItemName.textContent = item.name;
        }
        const $sourceItem = $sourceClone.querySelector('.source__item');
        if ($sourceItem) {
          $sourceItem.setAttribute('data-source-id', item.id);
        }
        fragment.append($sourceClone);
        const $sources = document.querySelector('.sources');
        if ($sources) {
          $sources.append(fragment);
        }
      }
    });
  }
}

// export default Sources;
