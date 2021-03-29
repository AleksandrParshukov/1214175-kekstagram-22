const ALERT_SHOW_TIME = 5000;

function getRandomNumber (min, max) {
  if (min >= max) {
    throw 'The first number must be less than the second';
  }

  if (min < 0) {
    throw 'Numbers must be greater than or equal to zero';
  }

  return Math.round(Math.random() * (max - min) + min);
}

function checkLength (string, maxLength) {
  return string.length <= maxLength;
}

function shuffle (array) {
  return array.sort(() => Math.random() - 0.5);
}

function isEscEvent (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 50;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomNumber, checkLength, shuffle, isEscEvent, showAlert};
