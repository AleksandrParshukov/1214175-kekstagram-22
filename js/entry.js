import {createEntries} from './create-entries.js';
import {onPictureClick} from './big-picture.js';

const ENTRIES_VALUE = 25;

const entriesListElement = document.querySelector('.pictures');
const entryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const entriesList = createEntries(ENTRIES_VALUE);

const entriesElementList = entriesList.map(({url, likes, comments, description}) => {
  const entryElement = entryTemplate.cloneNode(true);
  entryElement.querySelector('.picture__img').setAttribute('src', url);
  entryElement.querySelector('.picture__comments').textContent =  comments.length;
  entryElement.querySelector('.picture__likes').textContent = likes;
  entryElement.addEventListener('click', onPictureClick(url, likes, comments, description))
  return entryElement;
});

renderEntries(entriesElementList);


function renderEntries(entries) {
  const entriesListFragment = document.createDocumentFragment();

  entries.forEach((value) => {
    entriesListFragment.appendChild(value);
  })

  entriesListElement.appendChild(entriesListFragment);
}
