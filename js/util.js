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

export {getRandomNumber, checkLength, shuffle};