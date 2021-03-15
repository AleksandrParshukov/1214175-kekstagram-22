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

for (let i = socialComments.children.length - 1; i >= 0; i--) {
  const child = socialComments.children[i];
  child.parentElement.removeChild(child);
}


function onPictureClick (url, likes, comments, description) {
  return (evt) => {
    let commentCounter = 0;

    evt.preventDefault();
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImg.setAttribute('src', url);
    likesCount.textContent = likes;
    commentsCount.textContent =  comments.length;
    socialCaption.textContent = description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    comments = comments.map(({avatar, message, name}) => {
      const commentElement = socialCommentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').setAttribute('src', avatar);
      commentElement.querySelector('.social__picture').setAttribute('alt', name);
      commentElement.querySelector('.social__text').textContent = message;
      return commentElement;
    });

    appendComments (comments);

    function appendComments (comments) {
      const commentsListFragment = document.createDocumentFragment();
      const maxCommentCounter = commentCounter + 5 < comments.length ? commentCounter + 5 : comments.length;

      for (commentCounter; commentCounter < maxCommentCounter; commentCounter++) {
        commentsListFragment.appendChild(comments[commentCounter]);
      }

      socialComments.appendChild(commentsListFragment);
    }

  }
}

export {onPictureClick};
