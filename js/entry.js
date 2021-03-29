/* global _:readonly */
import {onPictureClick} from './big-picture.js';
import {getData} from './server.js';
import {onImgFiltersClick} from './filter.js';

const RERENDER_DELAY = 500;

const entriesListElement = document.querySelector('.pictures');
const entryTemplate = document.querySelector('#picture').content.querySelector('.picture');

getData((entries) => {
  renderEntries(entries);
  onImgFiltersClick(entries, _.debounce(renderEntries, RERENDER_DELAY));
});

function renderEntries (entriesList) {
  removeEntries();
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

function removeEntries () {
  for (let i = entriesListElement.children.length - 1; i > 1; i--) {
    const child = entriesListElement.children[i];
    child.parentElement.removeChild(child);
  }
}

export {renderEntries}
