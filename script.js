const inputSlider = document.querySelector("[dataLength-Slider]");
const lengthDisplay = document.querySelector("[dataLength-Number]");
const passwordDisplay = document.querySelector("[dataPassword-display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[dataCopy-Msg]");
const uppercaseCheck = document.querySelector("#uperCase");
const lowercaseCheck = document.querySelector("#lowerCase");
const number = document.querySelector("#numbers");
const symbol = document.querySelector("#symbols");

const indicator = document.querySelector("[dataIndicator]");
const generatorBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '`~!@#$%^&*()_+}{?<./;][=-';
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlide();

function handleSlide() {
  lengthDisplay.innerHTML = passwordLength;
  inputSlider.value = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
}

function getRndInterge(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInterge(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInterge(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndInterge(65, 91));
}

function generateSymbol() {
  const random = getRndInterge(0, symbols.length);
  return symbols.charAt(random);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if (uppercaseCheck.checked) {
    hasUpper = true;
  }

  if (lowercaseCheck.checked) {
    hasLower = true;
  }

  if (symbol.checked) {
    hasSym = true;
  }

  if (number.checked) {
    hasNum = true;
  }

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
   await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerHTML = "copied";
  } catch (e) {
    copyMsg.innerHTML = "Failed";
  }

  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

 

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }

    if (passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlide();
    }
  });
}

function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlide();
  });

generatorBtn.addEventListener("click", () => {
    
    if (checkCount == 0) {
    return;
  }

    if(passwordLength < checkCount){
      passwordLength=checkCount;
      handleSlide();
   }

   password="";

    // if(uppercaseCheck.checked){
    //    password+=generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //    password+=generateLowerCase();
    // }

    // if(symbol.checked){
    //    password+=generateSymbol();
    // }

    // if(number.checked){
    //    password+=generateRandomNumber();
    // }

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }

  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);   }

  if (number.checked) {
    funcArr.push(generateRandomNumber);
  }

  if (symbol.checked) {
     funcArr.push(generateSymbol);
   }

   for (let i = 0; i < funcArr.length; i++) {
     password += funcArr[i]();
   }
   console.log("Compulsory Part done");

   for (let i = 0; i < passwordLength-funcArr.length; i++) {
     let randomIndex = getRndInterge( 0, funcArr.length);
     console.log("randomIndex" + randomIndex);
     password += funcArr[randomIndex]();
   }

  console.log("Remaining Part done");

  password = shufflePassword(Array.from(password));
  passwordDisplay.value = password;
  console.log("Password creation done");
  calcStrength();
});
