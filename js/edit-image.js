/* global noUiSlider:readonly */
const SLIDER_PARAMETERS = {
  'effect-chrome': {
    range: {
      'min': 0,
      'max': 1,
    },
    step: 0.1,
    start: [1],
    connect: 'lower',
  },
  'effect-sepia': {
    range: {
      'min': 0,
      'max': 1,
    },
    step: 0.1,
    start: [1],
    connect: 'lower',
  },
  'effect-marvin': {
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
  'effect-phobos': {
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
  'effect-heat': {
    range: {
      'min': 1,
      'max': 3,
    },
    step: 0.1,
    start: [3],
    connect: 'lower',
  },
}
const FILTER_PARAMETERS = {
  'effect-chrome': {
    filter: 'grayscale',
    class: 'effects__preview--chrome',
  },
  'effect-sepia': {
    filter: 'sepia',
    class: 'effects__preview--sepia',
  },
  'effect-marvin': {
    filter: 'invert',
    class: 'effects__preview--marvin',
  },
  'effect-phobos': {
    filter: 'blur',
    class: 'effects__preview--phobos',
  },
  'effect-heat': {
    filter: 'brightness',
    class: 'effects__preview--heat',
  },
}

const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsRadio = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

for (let i = 0; i < effectsRadio.length; i++) {

  effectsRadio[i].addEventListener('click', (evt) => {
    const currentEffect = effectsRadio[i].getAttribute('id');

    evt.preventDefault();

    if (effectLevelSlider.noUiSlider !== undefined) {
      effectLevelSlider.noUiSlider.destroy();
      removeFilters();
    }

    if (currentEffect !== 'effect-none'){
      noUiSlider.create(effectLevelSlider, SLIDER_PARAMETERS[currentEffect]);
      imgUploadPreview.classList.add(FILTER_PARAMETERS[currentEffect].class);

      effectLevelSlider.noUiSlider.on('update', (value, handle, unencoded) => {
        imgUploadPreview.style.filter = FILTER_PARAMETERS[currentEffect].filter + '(' + value[handle] + ')';
        effectLevelValue.setAttribute('value', unencoded[handle]);
      });
    }

  })

}


function removeFilters () {
  for (let key in FILTER_PARAMETERS) {
    imgUploadPreview.classList.remove(FILTER_PARAMETERS[key].class);
  }
  imgUploadPreview.style.filter = 'none';
}
