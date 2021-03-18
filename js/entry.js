import {createEntries} from './create-entries.js';
import {onPictureClick} from './big-picture.js';

const ENTRIES_VALUE = 25;

const entriesListElement = document.querySelector('.pictures');
const entryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const entriesList = createEntries(ENTRIES_VALUE);

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

renderEntries(entriesElementList);


function renderEntries(entries) {
  const entriesListFragment = document.createDocumentFragment();

  entries.forEach((value) => {
    entriesListFragment.appendChild(value);
  })

  entriesListElement.appendChild(entriesListFragment);
}
