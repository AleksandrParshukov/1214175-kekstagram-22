import {createEntries} from './create-entries.js';

const ENTRIES_VALUE = 25;

const entriesListElement = document.querySelector('.pictures');
const entryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const entriesList = createEntries(ENTRIES_VALUE);
const entriesListFragment = document.createDocumentFragment();

entriesList.forEach(({url, likes, comments}) => {
  const entryElement = entryTemplate.cloneNode(true);
  entryElement.querySelector('.picture__img').setAttribute('src', url);
  entryElement.querySelector('.picture__comments').textContent =  comments.length;
  entryElement.querySelector('.picture__likes').textContent = likes;
  entriesListFragment.appendChild(entryElement);
});

entriesListElement.appendChild(entriesListFragment);