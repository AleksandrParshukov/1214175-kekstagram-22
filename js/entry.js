import {onPictureClick} from './big-picture.js';
import {getData} from './server.js';

const entriesListElement = document.querySelector('.pictures');
const entryTemplate = document.querySelector('#picture').content.querySelector('.picture');

getData(renderEntries);

function renderEntries (entriesList) {
  const entriesElementList = entriesList.map((entry) => {
    const entryElement = entryTemplate.cloneNode(true);
    entryElement.querySelector('.picture__img').setAttribute('src', entry.url);
    entryElement.querySelector('.picture__comments').textContent =  entry.comments.length;
    entryElement.querySelector('.picture__likes').textContent = entry.likes;
    entryElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      onPictureClick(entry);
    })
    return entryElement;
  });
  appendEntries(entriesElementList);
}

function appendEntries(entries) {
  const entriesListFragment = document.createDocumentFragment();

  entries.forEach((value) => {
    entriesListFragment.appendChild(value);
  })

  entriesListElement.appendChild(entriesListFragment);
}

export {renderEntries}
