import './edit-image.js'

const MODAL_CLOSE_KEY = 'Escape';
const SCALE_CONTROL_VALUE_STEP = 25;
const MIN_SCALE_CONTROL_VALUE = 25;
const MAX_SCALE_CONTROL_VALUE = 100;

const body = document.querySelector('body');
const imageUploadInput = body.querySelector('.img-upload__input');
const imageUploadOverlay = body.querySelector('.img-upload__overlay');
const imgUploadCancel = body.querySelector('.img-upload__cancel');
const scaleControlSmaller = body.querySelector('.scale__control--smaller');
const scaleControlBigger = body.querySelector('.scale__control--bigger');
const scaleControlValue = body.querySelector('.scale__control--value');
const imgUploadPreview = body.querySelector('.img-upload__preview img');

let currentScaleValue = MAX_SCALE_CONTROL_VALUE;

scaleControlValue.setAttribute('value', MAX_SCALE_CONTROL_VALUE + '%');


imageUploadInput.addEventListener('change', () => {
  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
})

imgUploadCancel.addEventListener('click', () => {
  body.classList.remove('modal-open');
  imageUploadOverlay.classList.add('hidden');
  imageUploadInput.value = '';
})

document.addEventListener('keydown', (evt) => {
  if(evt.key === MODAL_CLOSE_KEY) {
    body.classList.remove('modal-open');
    imageUploadOverlay.classList.add('hidden');
    imageUploadInput.value = '';
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

export {MODAL_CLOSE_KEY}
