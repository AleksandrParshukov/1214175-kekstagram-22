alert(getRandomNumber(2, 3));
alert(checkLength('123', 4))

function getRandomNumber(min, max) {
  if (min < max) {
    if (min >= 0) {
      return Math.round(Math.random() * (max - min) + min);
    }
    else {
      throw 'Numbers must be greater than or equal to zero';
    }
  }
  else {
    throw 'The first number must be less than the second';
  }
}

function checkLength (string, maxLength) {
  return string.length <= maxLength;
}
