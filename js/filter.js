const RANDOM_ENTRIES_VALUE = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');


function onFilterDefaultClick (entries, cb) {
  filterDefault.addEventListener('click', () => {
    updateActiveClass(filterDefault);
    cb(entries);
  })
}

function onFilterRandomClick (entries, cb) {
  filterRandom.addEventListener('click', () => {
    updateActiveClass(filterRandom);
    cb(entries
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, RANDOM_ENTRIES_VALUE));
  })
}

function onFilterDiscussedClick (entries, cb) {
  filterDiscussed.addEventListener('click', () => {
    updateActiveClass(filterDiscussed);
    cb(entries
      .slice()
      .sort(compareEntries));
  })
}

function compareEntries (entryA, entryB) {
  const commentsValueA = entryA.comments.length;
  const commentsValueB = entryB.comments.length;

  return commentsValueB - commentsValueA;
}

function showFilter () {
  imgFilters.classList.remove('img-filters--inactive');
}

function updateActiveClass (element) {
  const currentActiveFilter = imgFilters.querySelector('.img-filters__button--active');
  currentActiveFilter.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
}

export {showFilter, onFilterDefaultClick, onFilterRandomClick, onFilterDiscussedClick}
