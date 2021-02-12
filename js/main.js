function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function checkLength (string, maxLength) {
  return string.length <= maxLength;
}
