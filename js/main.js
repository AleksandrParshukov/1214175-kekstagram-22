alert(getRandomNumber(2, 3));
alert(checkLength('123', 4))

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
