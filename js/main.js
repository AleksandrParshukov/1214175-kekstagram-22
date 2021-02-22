const NAMES = [
  'Леонид',
  'Евгений',
  'Фёдор',
  'Владислав',
  'Глеб',
  'Георгий',
  'Кирилл',
  'Артём',
  'Вячеслав',
  'Анатолий',
  'Анжела',
  'Нина',
  'Александра',
  'Софья',
  'Маргарита',
  'Евгения',
  'Зинаида',
  'Галина',
  'Марина',
  'Оксана',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Красивое фото',
  'Великолепный вид',
  'Необычное селфи',
  'Неудавшееся фото',
];
const ENTRIES_VALUE = 25;
const MIN_LIKES_VALUE = 15;
const MAX_LIKES_VALUE = 200;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;
const MIN_COMMENTS_VALUE = 0;
const MAX_COMMENTS_VALUE = 6;
const MAX_COMMENTS_COUNT = MAX_COMMENTS_VALUE * ENTRIES_VALUE;


let commentIndex = 0;
const entriesIDs = shuffle(new Array(ENTRIES_VALUE).fill(null).map((value, index) => index + 1));
const picturesAddresses = shuffle(new Array(ENTRIES_VALUE).fill(null).map((value, index) => 'photos/' + (index + 1) + '.jpg'));
const commentsIDs = shuffle(new Array(MAX_COMMENTS_COUNT).fill(null).map((value, index) => index + 1));
const entries = new Array(ENTRIES_VALUE).fill(null).map((value, index) => createEntry(index))


alert(entries);
alert(checkLength('123', 4));


// Functions
function createEntry(index) {
  return {
    id: entriesIDs[index],
    url: picturesAddresses[index],
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomNumber (MIN_LIKES_VALUE, MAX_LIKES_VALUE),
    comments: new Array(getRandomNumber(MIN_COMMENTS_VALUE, MAX_COMMENTS_VALUE)).fill(null).map(() => createComment()),
  };
}


function createComment() {
  return {
    id: commentsIDs[commentIndex++],
    avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX) + '.svg',
    message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomNumber(0, NAMES.length - 1)],
  };
}


function getRandomNumber(min, max) {
  if (min >= max) {
    throw 'The first number must be less than the second';
  }

  if (min < 0) {
    throw 'Numbers must be greater than or equal to zero';
  }

  return Math.round(Math.random() * (max - min) + min);
}


function checkLength (string, maxLength) {
  return string.length <= maxLength;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}