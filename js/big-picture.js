import {isEscEvent} from './util.js';

const COMMENTS_COUNTER_STEP = 5;

function onPictureClick (entry) {
  const body = document.querySelector('body');
  const bigPicture = body.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCommentTemplate = socialComments.querySelector('.social__comment');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  let commentCounter = 0;

  bigPictureCancel.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);

  for (let i = socialComments.children.length - 1; i >= 0; i--) {
    const child = socialComments.children[i];
    child.parentElement.removeChild(child);
  }

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.setAttribute('src', entry.url);
  likesCount.textContent = entry.likes;
  socialCaption.textContent = entry.description;
  commentsLoader.classList.remove('hidden');

  const comments = entry.comments.map(({avatar, message, name}) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').setAttribute('src', avatar);
    commentElement.querySelector('.social__picture').setAttribute('alt', name);
    commentElement.querySelector('.social__text').textContent = message;
    return commentElement;
  });

  onCommentsLoaderClick();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  function onCancelClick () {
    closeModal();
  }

  function onDocumentKeydown (evt) {
    if(isEscEvent(evt)) {
      closeModal();
    }
  }

  function onCommentsLoaderClick () {
    const commentsListFragment = document.createDocumentFragment();
    const maxCommentCounter = commentCounter + COMMENTS_COUNTER_STEP < comments.length ? commentCounter + COMMENTS_COUNTER_STEP : comments.length;

    for (commentCounter; commentCounter < maxCommentCounter; commentCounter++) {
      commentsListFragment.appendChild(comments[commentCounter]);
    }

    socialComments.appendChild(commentsListFragment);
    socialCommentCount.textContent = `${maxCommentCounter} из ${comments.length} комментариев`;

    if (commentCounter >= comments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  function closeModal () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    bigPictureCancel.removeEventListener('click', onCancelClick);
  }

}


export {onPictureClick};
