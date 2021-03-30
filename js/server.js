import {showAlert} from './util.js';
import {showFilter} from './filter.js';

function getData (onSuccess) {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then(decodeData)
    .then(onSuccess)
    .then(showFilter());


  function decodeData (response) {
    if (response.ok) {
      return response.json();
    } else {
      showAlert(`${response.status} ${response.statusText}`);
    }
  }

}

function sendData (onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then(showResult)
    .catch(onFail);

  function showResult (response) {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }
}

export {getData, sendData};
