import {showAlert} from './util.js';
import {showFilter} from './filter.js';

function getData (onSuccess) {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(`${response.status} ${response.statusText}`);
      }
    })
    .then((entries) => {
      onSuccess(entries);
    })
    .then(showFilter());
}

function sendData (onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
