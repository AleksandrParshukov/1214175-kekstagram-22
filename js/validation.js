import {MODAL_CLOSE_KEY} from './upload-image.js'

const MAX_HASHTAGS_VALUE = 5;
const MAX_HASHTAGS_LENGTH = 20;

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

textHashtags.addEventListener('input', () => {
  const hashtags = textHashtags.value.toLowerCase().split(' ');

  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#') {
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

})

textDescription.addEventListener('input', () => {
  if (textDescription.validity.tooLong) {
    textDescription.setCustomValidity('Комментарий не может быть длинее 140 символов');
  } else {
    textDescription.setCustomValidity('');
  }
})

textHashtags.addEventListener('keydown', stopEvent);
textDescription.addEventListener('keydown', stopEvent);


function isUnique (array) {
  const uniqueValues = Array.from(new Set(array));
  return array.length === uniqueValues.length ? true : false
}

function stopEvent (event) {
  if(event.key === MODAL_CLOSE_KEY) {
    event.stopPropagation();
  }
}

