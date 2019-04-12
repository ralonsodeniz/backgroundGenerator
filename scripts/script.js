var cssCode = document.querySelector("h3");
var firstColorSource = document.querySelector(".firstColor");
var secondColorSource = document.querySelector(".secondColor");
var body = document.querySelector("body");
var randomButtonSource = document.querySelector("#randomButton");

// function to generate random numbers between to values
function randomNumberGenerator(minimunValue, maximunValue) {
  var randomNumber = Math.floor(
    Math.random() * (maximunValue - minimunValue + 1) + minimunValue
  );
  return randomNumber;
}

// function to transform a number into its hex code
function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16); // the param of toString method sets de number base to which we want to transform the function input, this is only applicable to numbers
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

// function to transform a entire RGB to its hex code using the function to transform a number into its hex code
function fullColorHex(r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red + green + blue;
}

// function to set the gradiant to the values selected in the inputs
function setGradiant() {
  body.style.background =
    "linear-gradient(to right, " +
    firstColorSource.value +
    ", " +
    secondColorSource.value +
    ")";
  cssCode.textContent = body.style.background + ";";
}
// function to set the gradiant to random values generated
function setRandomGradiant() {
  var firstColorR = randomNumberGenerator(0, 255);
  var firstColorG = randomNumberGenerator(0, 255);
  var firstColorB = randomNumberGenerator(0, 255);
  var firstColor =
    "rgb(" + firstColorR + "," + firstColorG + "," + firstColorB + ")";
  var secondColorR = randomNumberGenerator(0, 255);
  var secondColorG = randomNumberGenerator(0, 255);
  var secondColorB = randomNumberGenerator(0, 255);
  var secondColor =
    "rgb(" + secondColorR + "," + secondColorG + "," + secondColorB + ")";

  body.style.background =
    "linear-gradient(to right, " + firstColor + ", " + secondColor + ")";
  // updating the input colors with the randomly generated ones
  firstColorSource.value =
    "#" + fullColorHex(firstColorR, firstColorG, firstColorB);
  secondColorSource.value =
    "#" + fullColorHex(secondColorR, secondColorG, secondColorB);
  cssCode.textContent = body.style.background + ";";
  console.log(firstColorSource.value);
}

// set de gradient with the default input colors on page load and show the css code
window.addEventListener("load", setGradiant);
// change the gradient everytime we change one of the inputs
firstColorSource.addEventListener("input", setGradiant);
secondColorSource.addEventListener("input", setGradiant);
// Change to a random gradiant background with random button click
randomButtonSource.addEventListener("click", setRandomGradiant);
