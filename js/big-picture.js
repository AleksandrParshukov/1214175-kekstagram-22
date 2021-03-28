import {isEscEvent} from './util.js';

const COMMENTS_COUNTER_STEP = 5;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', () => {
  closeModal();
})

document.addEventListener('keydown', (evt) => {
  if(isEscEvent(evt)) {
    closeModal();
  }
})


function onPictureClick (entry) {
  let commentCounter = 0;

  for (let i = socialComments.children.length - 1; i >= 0; i--) {
    const child = socialComments.children[i];
    child.parentElement.removeChild(child);
  }

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.setAttribute('src', entry.url);
  likesCount.textContent = entry.likes;
  commentsCount.textContent =  entry.comments.length;
  socialCaption.textContent = entry.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  const comments = entry.comments.map(({avatar, message, name}) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').setAttribute('src', avatar);
    commentElement.querySelector('.social__picture').setAttribute('alt', name);
    commentElement.querySelector('.social__text').textContent = message;
    return commentElement;
  });

  appendComments (comments);

  function appendComments (comments) {
    const commentsListFragment = document.createDocumentFragment();
    const maxCommentCounter = commentCounter + COMMENTS_COUNTER_STEP < comments.length ? commentCounter + COMMENTS_COUNTER_STEP : comments.length;

    for (commentCounter; commentCounter < maxCommentCounter; commentCounter++) {
      commentsListFragment.appendChild(comments[commentCounter]);
    }

    socialComments.appendChild(commentsListFragment);
  }
}

function closeModal () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

export {onPictureClick};
