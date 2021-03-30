import {removeFilters} from './edit-image.js';
import {isEscEvent} from './util.js';
import {sendData} from './server.js';

const SCALE_CONTROL_VALUE_STEP = 25;
const MIN_SCALE_CONTROL_VALUE = 25;
const MAX_SCALE_CONTROL_VALUE = 100;

const body = document.querySelector('body');
const imgUploadForm = body.querySelector('.img-upload__form');
const imageUploadInput = body.querySelector('.img-upload__input');
const imageUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let currentScaleValue = MAX_SCALE_CONTROL_VALUE;

scaleControlValue.setAttribute('value', MAX_SCALE_CONTROL_VALUE + '%');
imageUploadInput.addEventListener('change', onUploadInputChange);


function onUploadInputChange () {
  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);
  imgUploadForm.addEventListener('submit', onUploadFormSubmit);
}

function onUploadCancelClick () {
  closeModal();
}

function onDocumentKeydown (evt) {
  if(isEscEvent(evt)) {
    closeModal();
  }
}

function onScaleSmallerClick () {
  if (currentScaleValue > MIN_SCALE_CONTROL_VALUE) {
    currentScaleValue -= SCALE_CONTROL_VALUE_STEP;
    scaleControlValue.setAttribute('value', currentScaleValue + '%');
    imgUploadPreview.style.transform = 'scale(' + (currentScaleValue / 100) + ')';
  }
}

function onScaleBiggerClick () {
  if (currentScaleValue < MAX_SCALE_CONTROL_VALUE) {
    currentScaleValue += SCALE_CONTROL_VALUE_STEP;
    scaleControlValue.setAttribute('value', currentScaleValue + '%');
    imgUploadPreview.style.transform = 'scale(' + (currentScaleValue / 100) + ')';
  }
}

function onUploadFormSubmit (evt) {
  evt.preventDefault();

  sendData(
    () => showMessage(successTemplate),
    () => showMessage(errorTemplate),
    new FormData(evt.target),
  );
}

function closeModal () {
  body.classList.remove('modal-open');
  imageUploadOverlay.classList.add('hidden');
  scaleControlSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleBiggerClick);
  imgUploadForm.removeEventListener('submit', onUploadFormSubmit);
  imgUploadCancel.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.reset();
  removeFilters();
}

function showMessage (template) {
  const messageElement = template.cloneNode(true);
  const messageButton = messageElement.querySelector('button');
  body.appendChild(messageElement);
  closeModal();

  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onMessageClick);

  function onMessageButtonClick () {
    body.removeChild(messageElement);
    messageButton.removeEventListener('click', onMessageButtonClick);
  }

  function onMessageKeydown (evt) {
    if(isEscEvent(evt)) {
      body.removeChild(messageElement);
      document.removeEventListener('click', onMessageKeydown);
    }
  }

  function onMessageClick (evt) {
    if (evt.target === messageElement) {
      body.removeChild(messageElement);
      document.removeEventListener('click', onMessageClick);
    }
  }

}
