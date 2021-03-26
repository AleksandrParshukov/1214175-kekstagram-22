import {MODAL_CLOSE_KEY} from './upload-image.js'

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

textHashtags.addEventListener('input', () => {
  const hashtags = textHashtags.value.toLowerCase().split(' ');

  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#') {
      textHashtags.setCustomValidity('Хэш-теги должны начинаться с решётки ("#")');
    } else if (hashtag.length === 1) {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки ("#")');
    } else if (hashtag.length > 20) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
    } else if (hashtags.length > 5) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else if (!isUnique(hashtags)) {
      textHashtags.setCustomValidity('Хеш-теги не должны повторяться');
    } else {
      textHashtags.setCustomValidity('');
    }

    textHashtags.reportValidity();
  })

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

