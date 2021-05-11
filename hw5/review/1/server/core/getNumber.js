let number;

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (forceRestart === true || number === undefined) {
    function random(max) {
      return Math.floor(Math.random() * (max - 1)) + 1;
    }
    number = random(100);
    console.log(number);
    return number;
  } else {
    return number;
  }
};

export default getNumber;
