// When the user clicks on start
let startButton = document.getElementById('btnStart');
baseCurrency = document.getElementById('baseCurrency');
let ratesBase = document.getElementById('ratesBase');
let ratesSecondary = document.getElementsByClassName('rates__secondary__item');
let ratesSecondaryList = document.getElementById("rates__secondary__list");
let toAppend;
let ArrayAllCurrencies = [];
let Currencies = [
  { name: "", rate: "" }
];
let convertCurrencySelect = document.getElementsByClassName('convertCurrency');

startButton.addEventListener( 'click', function() {
  // Clean Currencies
  ratesSecondaryList.innerHTML = null;
  ratesBase.innerHTML = null;
  // Clear convert select boxes
  for ( let i = 0; i < convertCurrencySelect.length; i++) {
    // convertCurrencySelect[ii].remove(i);
    // console.log(ArrayAllCurrencies.length);
    for ( let ii = convertCurrencySelect[i].length; ii >= 1; ii--) {
      convertCurrencySelect[i].remove(ii);
    };
  };
  ArrayAllCurrencies = [];
  Currencies = [];
  // for ( let i = 0; i < ArrayAllCurrencies.length; i++) {
  //   for ( let ii = 0; ii < convertCurrencySelect.length; ii++) {
  //     convertCurrencySelect[ii].remove(i);
  //     console.log(convertCurrencySelect[ii]);
  //   };
  // }
  // get currencies selected
  secondaryCurrencyItems = document.querySelectorAll("[name=secondaryCurrencies]");
  if ( baseCurrency.selectedIndex !== 0 ) {
    ratesBase.innerHTML = baseCurrency.value;
    ArrayAllCurrencies.push(baseCurrency.value);
    let currencyName = baseCurrency.value;
    let currencyRate = 1;
    let newCurrency = {name: currencyName, rate: currencyRate  }
    Currencies.push(newCurrency);
  } else {
    console.log('Please, select the base currency.')
  }
  // get values from the secondary selects
  // check which ones exists
  // get the values
  // baseCurrency is selected && secondaryCurrencyOne is not default
  if ( baseCurrency.selectedIndex !== 0 && secondaryCurrencyItems[0].selectedIndex !== 0) {
    for ( let i = 0; i < secondaryCurrencyItems.length; i++) {
      if ( secondaryCurrencyItems[i].selectedIndex !== 0 ) {
        ArrayAllCurrencies.push(secondaryCurrencyItems[i].value);
      } else {
        console.log('Select the currency, please');
      }
    }
  } else {
    console.log('Please, select one secondary currency at least.')
  }
  // convert them using the base currency
  // get rate
  // ## Euro foreign exchange
  // write base currency in url and call JSON
  let arrayValue;
  if ( baseCurrency.selectedIndex !== 0 && secondaryCurrencyItems[0].selectedIndex !== 0 ) {
    getJSONP('http://api.fixer.io/latest?base=' + baseCurrency.value + '&callback=?', function(data){
    // print them on rates section
    for ( let i = 1; i < ArrayAllCurrencies.length; i++ ) {
      toAppend = document.createElement('li');
      toAppend.className = 'rates__secondary__item';
      function addSecondaryRate() {
        toAppend.innerHTML += "<span class='rates__secondary__name'>" + ArrayAllCurrencies[i] + "</span>";
        toAppend.innerHTML += "<span class='rates__secondary__conversion'>" + 1/data.rates[ArrayAllCurrencies[i]] + "</span>";
        toAppend.innerHTML += "<span class='rates__secondary__rate'>" + data.rates[ArrayAllCurrencies[i]] + "</span>";
        ratesSecondaryList.appendChild(toAppend);
        let currencyName = ArrayAllCurrencies[i];
        let currencyRate = 1/data.rates[ArrayAllCurrencies[i]];
        let newCurrency = {name: currencyName, rate: currencyRate  }
        Currencies.push(newCurrency);
        //currencies.rate[i] = 1/data.rates[ArrayAllCurrencies[i]];
      };
      addSecondaryRate();
    }
  });
  } else {
    console.log('Select at least a base and one secondary currency, please.');
  }
// put currencies values on selects options
function updateConvertSelects() {
  let option;
  for ( let i = 0; i < ArrayAllCurrencies.length; i++) {
    for ( let ii = 0; ii < convertCurrencySelect.length; ii++) {
      option = document.createElement('option');
      option.textContent = ArrayAllCurrencies[i];
      option.value = ArrayAllCurrencies[i];
      convertCurrencySelect[ii].appendChild(option)
    };
  };
}
updateConvertSelects();
});

// conversion
// get quantity from input value
let quantityInput = document.getElementById('inputCurrency').value;
let convertCurrency1 = document.getElementById('convertCurrency1').value;
let convertCurrency2 = document.getElementById('convertCurrency2').value;
let conversionResult;
let convertCurrency = document.getElementById('convertCurrency');
let swapCurrency = document.getElementById('swapCurrency');
let convertResults = document.getElementById('convertResults');

// execute operation
// {currency2} / {currency1} * quantity
function conversion(quantity, currency1, currency2) {
  conversionResult = (currency1 / currency2) * quantity;
  return conversionResult;
};
// Get Rates
function getRateInArray(array, attr, value, attrToGet) {
  for ( i = 0; i < array.length; i++ ) {
    if (array[i][attr] === value) {
      return array[i][attrToGet];
      console.log(array[i][attrToGet]);
    }
  }
};
// Swap currencies
function swapCurrencies(value1, value2) {
  value1 = document.getElementById('convertCurrency1').value;
  value2 = document.getElementById('convertCurrency2').value;
  document.getElementById('convertCurrency1').value = value2;
  document.getElementById('convertCurrency2').value = value1;
}

swapCurrency.addEventListener( 'click', function() {
  swapCurrencies(convertCurrency1, convertCurrency2);
});


// require the 3 values to convert: quantity, currency1, currency2.
// require 2 values to swap: currency1 and currency2.

convertCurrency.addEventListener( 'click', function() {
  if ( quantityInput >= 1 ) {
    convertCurrency1 = getRateInArray(Currencies, "name", document.getElementById('convertCurrency1').value, "rate");
    console.log(convertCurrency1);
    convertCurrency2 = getRateInArray(Currencies, "name", document.getElementById('convertCurrency2').value, "rate");
    console.log(convertCurrency2);
    conversion(quantityInput, convertCurrency1, convertCurrency2);
    convertResults.textContent = conversionResult;
  } else {
    console.log('Wrong quantity.');
  };
});
