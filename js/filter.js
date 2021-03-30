const RANDOM_ENTRIES_VALUE = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');


function onImgFiltersClick (entries, cb) {
  imgFilters.addEventListener('click', onFiltersClick);

  function onFiltersClick (evt) {
    const target = evt.target.getAttribute('id');
    switch (target) {
      case 'filter-default': {
        onFilterDefaultClick(entries, cb);
        break;
      }
      case 'filter-random': {
        onFilterRandomClick(entries, cb);
        break;
      }
      case 'filter-discussed': {
        onFilterDiscussedClick(entries, cb);
        break;
      }
    }
  }
}

function onFilterDefaultClick (entries, cb) {
  updateActiveClass(filterDefault);
  cb(entries);
}

function onFilterRandomClick (entries, cb) {
  updateActiveClass(filterRandom);
  cb(entries
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_ENTRIES_VALUE));
}

function onFilterDiscussedClick (entries, cb) {
  updateActiveClass(filterDiscussed);
  cb(entries
    .slice()
    .sort(compareEntries));
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

export {showFilter, onImgFiltersClick}
