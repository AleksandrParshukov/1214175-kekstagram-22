import {isEscEvent} from './util.js';

const MAX_HASHTAGS_VALUE = 5;
const MAX_HASHTAGS_LENGTH = 20;

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

textHashtags.addEventListener('input', onHashtagsInput);

textHashtags.addEventListener('blur', onHashtagsInput);

textDescription.addEventListener('input', () => {
  if (textDescription.validity.tooLong) {
    textDescription.setCustomValidity('Комментарий не может быть длинее 140 символов');
  } else {
    textDescription.setCustomValidity('');
  }
})

textHashtags.addEventListener('keydown', stopEvent);
textDescription.addEventListener('keydown', stopEvent);

function onHashtagsInput () {
  const hashtags = textHashtags.value.toLowerCase().split(' ');

  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#' && hashtag.length > 0) {
      textHashtags.setCustomValidity('Хэш-теги должны начинаться с решётки ("#")');
    } else if (hashtag.length === 1) {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки ("#")');
    } else if (hashtag.length > MAX_HASHTAGS_LENGTH) {
      textHashtags.setCustomValidity(`Максимальная длина одного хэш-тега ${MAX_HASHTAGS_LENGTH} символов`);
    } else {
      textHashtags.setCustomValidity('');
    }
  })

  if (hashtags.length > MAX_HASHTAGS_VALUE) {
    textHashtags.setCustomValidity(`Нельзя указать больше ${MAX_HASHTAGS_VALUE} хэш-тегов`);
  } else if (!isUnique(hashtags)) {
    textHashtags.setCustomValidity('Хеш-теги не должны повторяться');
  }

  textHashtags.reportValidity();
}

function isUnique (array) {
  const uniqueValues = Array.from(new Set(array));
  return array.length === uniqueValues.length
}

function stopEvent (event) {
  if(isEscEvent(event)) {
    event.stopPropagation();
  }
}

