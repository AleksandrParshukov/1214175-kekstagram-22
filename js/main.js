alert(getRandomNumber(10, 20));
alert(checkLength('123', 4))

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function checkLength (string, maxLength) {
  return string.length <= maxLength;
}
