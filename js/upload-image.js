import './edit-image.js';
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


imageUploadInput.addEventListener('change', () => {
  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
})

imgUploadCancel.addEventListener('click', () => {
  closeModal();
})

document.addEventListener('keydown', (evt) => {
  if(isEscEvent(evt)) {
    closeModal();
  }
})

scaleControlSmaller.addEventListener('click', () => {
  if (currentScaleValue > MIN_SCALE_CONTROL_VALUE) {
    currentScaleValue -= SCALE_CONTROL_VALUE_STEP;
    scaleControlValue.setAttribute('value', currentScaleValue + '%');
    imgUploadPreview.style.transform = 'scale(' + (currentScaleValue / 100) + ')';
  }
})

scaleControlBigger.addEventListener('click', () => {
  if (currentScaleValue < MAX_SCALE_CONTROL_VALUE) {
    currentScaleValue += SCALE_CONTROL_VALUE_STEP;
    scaleControlValue.setAttribute('value', currentScaleValue + '%');
    imgUploadPreview.style.transform = 'scale(' + (currentScaleValue / 100) + ')';
  }
})

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onSuccess(),
    () => showMessage(errorTemplate),
    new FormData(evt.target),
  );
})


function onSuccess () {
  closeModal();
  showMessage(successTemplate);
}

function closeModal () {
  body.classList.remove('modal-open');
  imageUploadOverlay.classList.add('hidden');
  imgUploadForm.reset();
}

function showMessage (template) {
  const messageElement = template.cloneNode(true);
  body.appendChild(messageElement);

  messageElement.querySelector('button').addEventListener('click', () => {
    body.removeChild(messageElement);
  })
}
