/* global noUiSlider:readonly */
const SLIDER_PARAMETERS = {
  'chrome': {
    range: {
      'min': 0,
      'max': 1,
    },
    step: 0.1,
    start: [1],
    connect: 'lower',
  },
  'sepia': {
    range: {
      'min': 0,
      'max': 1,
    },
    step: 0.1,
    start: [1],
    connect: 'lower',
  },
  'marvin': {
    range: {
      'min': 0,
      'max': 100,
    },
    step: 1,
    start: [100],
    connect: 'lower',
    format: {
      to: function (value) {
        return value + '%';
      },
      from: function (value) {
        return Number(value.replace('%', ''));
      },
    },
  },
  'phobos': {
    range: {
      'min': 0,
      'max': 3,
    },
    step: 0.1,
    start: [3],
    connect: 'lower',
    format: {
      to: function (value) {
        return value + 'px';
      },
      from: function (value) {
        return Number(value.replace('px', ''));
      },
    },
  },
  'heat': {
    range: {
      'min': 1,
      'max': 3,
    },
    step: 0.1,
    start: [3],
    connect: 'lower',
  },
}
const FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos':'blur',
  'heat':'brightness',
}

const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsRadio = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

effectLevel.classList.add('hidden');

for (let i = 0; i < effectsRadio.length; i++) {

  effectsRadio[i].addEventListener('click', (evt) => {
    const currentEffect = effectsRadio[i].getAttribute('value');

    evt.preventDefault();

    if (effectLevelSlider.noUiSlider !== undefined) {
      effectLevelSlider.noUiSlider.destroy();
      effectLevel.classList.add('hidden');
      removeFilters();
    }

    if (currentEffect !== 'none'){
      effectLevel.classList.remove('hidden');
      noUiSlider.create(effectLevelSlider, SLIDER_PARAMETERS[currentEffect]);
      imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);

      effectLevelSlider.noUiSlider.on('update', (value, handle, unencoded) => {
        imgUploadPreview.style.filter = `${FILTERS[currentEffect]}(${value[handle]})`;
        effectLevelValue.setAttribute('value', unencoded[handle]);
      });
    }

  })

}


function removeFilters () {
  for (let key in FILTERS) {
    imgUploadPreview.classList.remove(`effects__preview--${key}`);
  }
  imgUploadPreview.style.filter = 'none';
}
