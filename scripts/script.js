var cssCode = document.querySelector("h3");
var firstColorSource = document.querySelector(".firstColor");
var secondColorSource = document.querySelector(".secondColor");
var body = document.querySelector("body");
var randomButtonSource = document.querySelector("#randomButton");
var directionSource = document.querySelector("#direction");
var angleSource = document.querySelector("#angle");
var alphaFirstColorSource = document.querySelector("#alphaFirstColor");
var alphaSecondColorSource = document.querySelector("#alphaSecondColor");

// function to assing the angle if angle option is selected
function selectDirection() {
  var direction;
  if (directionSource.value === "angle") {
    direction = angleSource.value + "deg";
  } else {
    direction = directionSource.value;
  }
  return direction;
}

// function to generate random numbers between to values
function randomNumberGenerator(minimunValue, maximunValue) {
  var randomNumber = Math.floor(
    Math.random() * (maximunValue - minimunValue + 1) + minimunValue
  );
  return randomNumber;
}

// function to transform a number into its hex code
function decToHex(number) {
  var hex = Number(number).toString(16); // the param of toString method sets de number base to which we want to transform the function input, this is only applicable to numbers
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

function alphaToHex(number) {
  var hex = Math.round(Number(number) * 255).toString(16); // the param of toString method sets de number base to which we want to transform the function input, this is only applicable to numbers
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

// function to transform a entire RGBa to its hex code using the function to transform a number into its hex code
function fullColorAlphaHex(r, g, b, a) {
  var red = decToHex(r);
  var green = decToHex(g);
  var blue = decToHex(b);
  var alpha = alphaToHex(a);
  return red + green + blue + alpha;
}
// function to transform a entire RGB to its hex code using the function to transform a number into its hex code
function fullColorHex(r, g, b) {
  var red = decToHex(r);
  var green = decToHex(g);
  var blue = decToHex(b);
  return red + green + blue;
}

// function to set the gradiant to the values selected in the inputs
function setGradiant() {
  var direction = selectDirection();
  var firstColorAHex = alphaToHex(alphaFirstColorSource.value);
  var secondColorAHex = alphaToHex(alphaSecondColorSource.value);
  body.style.background =
    "linear-gradient(" +
    direction +
    "," +
    firstColorSource.value +
    firstColorAHex +
    ", " +
    secondColorSource.value +
    secondColorAHex +
    ") fixed";
  // fixed attribute to prevent background to repeat when scrolling
  cssCode.textContent = body.style.background + ";";
}
// function to set the gradiant to random values generated
function setRandomGradiant() {
  var direction = selectDirection();
  var firstColorR = randomNumberGenerator(0, 255);
  var firstColorG = randomNumberGenerator(0, 255);
  var firstColorB = randomNumberGenerator(0, 255);
  var firstColorA = Math.random().toFixed(1); // tofixed method sets how many decimals you want
  var firstColor =
    "rgba(" +
    firstColorR +
    "," +
    firstColorG +
    "," +
    firstColorB +
    "," +
    firstColorA +
    ")";
  var secondColorR = randomNumberGenerator(0, 255);
  var secondColorG = randomNumberGenerator(0, 255);
  var secondColorB = randomNumberGenerator(0, 255);
  var secondColorA = Math.random().toFixed(1);
  var secondColor =
    "rgba(" +
    secondColorR +
    "," +
    secondColorG +
    "," +
    secondColorB +
    "," +
    secondColorA +
    ")";

  if (directionSource.value === "angle") {
    var randomAngle = randomNumberGenerator(-360, 360);
    direction = randomAngle + "deg";
    angleSource.value = randomAngle;
  }

  body.style.background =
    "linear-gradient(" +
    direction +
    ", " +
    firstColor +
    ", " +
    secondColor +
    ") fixed";
  // fixed attribute to prevent background to repeat when scrolling
  // updating the input colors with the randomly generated ones
  firstColorSource.value =
    "#" + fullColorHex(firstColorR, firstColorG, firstColorB);
  secondColorSource.value =
    "#" + fullColorHex(secondColorR, secondColorG, secondColorB);
  cssCode.textContent = body.style.background + ";";
  alphaFirstColorSource.value = firstColorA;
  alphaSecondColorSource.value = secondColorA;
}

// set de gradient with the default input colors on page load and show the css code
window.addEventListener("load", setRandomGradiant);
// change the gradient everytime we change one of the inputs
firstColorSource.addEventListener("input", setGradiant);
secondColorSource.addEventListener("input", setGradiant);
alphaFirstColorSource.addEventListener("input", setGradiant);
alphaSecondColorSource.addEventListener("input", setGradiant);
directionSource.addEventListener("input", () => {
  setGradiant();
  if (directionSource.value !== "angle") {
    angleSource.setAttribute("disabled", "true");
  } else {
    angleSource.removeAttribute("disabled");
  }
});
angleSource.addEventListener("input", setGradiant);
// Change to a random gradiant background with random button click
randomButtonSource.addEventListener("click", setRandomGradiant);
