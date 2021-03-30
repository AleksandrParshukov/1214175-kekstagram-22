const ALERT_SHOW_TIME = 5000;

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
  setTimeout(removeAlert, ALERT_SHOW_TIME);


  function removeAlert () {
    alertContainer.remove();
  }
}

export {isEscEvent, showAlert};
