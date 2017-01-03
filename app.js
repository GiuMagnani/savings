// Get JSON Data
function getJSONP(url, success) {

  var ud = '_' + +new Date,
  script = document.createElement('script'),
  head = document.getElementsByTagName('head')[0]
  || document.documentElement;

  window[ud] = function(data) {
    head.removeChild(script);
    success && success(data);
  };

  script.src = url.replace('callback=?', 'callback=' + ud);
  head.appendChild(script);

}

//# Currencies
//## Choose base currency
//#### Create an array with the possible currencies to be chosen from 'http://www.ecb.europa.eu/stats/exchange/eurofxref/html/index.en.html'

//## Euro foreign exchange
getJSONP('http://api.fixer.io/latest?base=EUR&callback=?', function(data) {
  let baseCurrency;
  const currencies = Object.keys(data.rates);
  // console.log(data);
  // Add currencies to currency selects
  let selects = document.getElementsByClassName('selectCurrency');
  for ( let i = 0; i < selects.length; i++ ) {
    // Elements
    let select = selects[i];
    for ( let i = 0; i < currencies.length; i++ ) {
      // Elements
      currency = currencies[i];
      // Create an option element
      let option = document.createElement('option');
      // Append currency to the created option element
      option.textContent = currency;
      option.value = currency;
      // Add option element to the select element
      select.appendChild(option);
    };
  };
  // Select Base Currency
  baseCurrency = document.getElementById('baseCurrency').value;
  // if EUR is base currency, do nothing.
  let ratesBase = document.getElementById('ratesBase').getElementsByTagName('span')[0];
  if ( baseCurrency === 'EUR' ) {
    //console.log('EUR yes');
    ratesBase.innerHTML = baseCurrency;
  } else { // else, get rates of the chosen currency.
    //console.log('EUR no');
  };
});

// Let choose secondary currencies when baseCurrency is selected
let currencySelected = document.getElementsByTagName('select');
let secondaryCurrencyItems = document.querySelectorAll("[name=secondaryCurrencies]");
let baseCurrency;

function isBaseCurrencySelected() {
  baseCurrency = document.getElementById('baseCurrency');
  let selectSecondaryCurrency = document.getElementById('selectSecondaryCurrency');
  let addButton = document.querySelector("[name=addSecondaryCurrencies]");
  let secondaryCurrencySelected;
  if ( baseCurrency.value !== 'Select currency' ) {
    addButton.disabled = false;
    selectSecondaryCurrency.disabled = false;
    // Remove base currency value from secondary currency selects
    //option[value=baseCurrency.value;
    //secondaryCurrencyItems[1].options[baseCurrency.selectedIndex].disabled = false;
    for ( let i = 0; i < secondaryCurrencyItems.length; i++) {
      // if ( currencySelected !== 'Select currency' ) {
      //   console.log(secondaryCurrencyItems[i].value);
      // };
      //secondaryCurrencyItems[i].options[baseCurrency.selectedIndex].disabled = true;

      //baseCurrency.options[secondaryCurrencyItems[i].selectedIndex].disabled = true;
    };
  }
};

//##

// check the selected options

let selectItems = document.getElementsByClassName('selectCurrency');
for ( let i = 0; i < selectItems.length; i++) {

  let selectedIndex = selectItems[i].selectedIndex;

  selectItems[i].options[selectedIndex].disabled = false;
    //console.log(selectItems[i].options[selectedIndex]);

  selectItems[i].addEventListener('change', function() {
    //console.log(selectItems[i].selectedIndex);

    // Disable previous option
    let previousOption = selectItems[i].selectedIndex;

    checkSelectedOptions(selectItems, i, previousOption);
  });
}

function checkSelectedOptions(a, i, c) {
  //for ( let i = 0; i < a.length; i++) {
    //#a[i].selectedIndex;
    //console.log(a[i].selectedIndex);
    //console.log(c);
    //console.log(selectItems[i]);
    selectedIndex = a[i].selectedIndex;
    //#a[i].options[selectedIndex].disabled = false;
    //console.log(a[i].selectedIndex);

    for ( let ii = 0; ii < a.length; ii++) {
      //a[ii].options[selectedIndex].disabled = false;
      a[ii].options[selectedIndex].disabled = true;
      // console.log(a[ii].selectedIndex);
    };
 // };
};
//checkSelectedOptions();
// disable selected options from other selects
// function disableOptions() {
//   for ( let i = 0; i < selectItems.length; i++) {
//     selectItems[i].options[baseCurrency.selectedIndex].disabled = true;
//   };
// }
//##

// exec onChange
// if change or remove re enable option on other selects.

function isSecondaryCurrencySelected() {
  let secondaryCurrencyItems = document.querySelectorAll("[name=secondaryCurrencies]");
  //disablePreviousCurrencySelected(event);
  var previouslySelected = event.target.selectedIndex;
  for ( let i = 0; i < secondaryCurrencyItems.length; i++) {
    ////////secondaryCurrencyItems[i].options[baseCurrency.selectedIndex].disabled = true;
    ////////secondaryCurrencyItems[i].options[previouslySelected].disabled = true;
    ////////baseCurrency.options[secondaryCurrencyItems[i].selectedIndex].disabled = true;
  };
  // let currencySelected = buttonParent.firstElementChild.selectedIndex;
  //enableOptions(secondaryCurrenciesList);
  // for ( let i = 0; i < secondaryCurrencyItems.length; i++) {
  //   //secondaryCurrencyItems[i].options[currencySelected].disabled = false;
  //   console.log(i.selectedIndex);
  // };
};

// function isSelected() {
//   for ( let i = 0; i < secondaryCurrencyItems.length; i++) {
//     let currencySelected = secondaryCurrencyItems[i].value;
//     if ( currencySelected !== 'Select currency' ) {
//       console.log(secondaryCurrencyItems[i].value);
//     };
//   };
// };

// Add secondary currency selection
let secondaryCurrenciesList = document.getElementById('secondaryCurrenciesList');
let removeButton;

// Add button function
function addCurrency(event) {
  let newSecondarySelect = document.createElement('li');
  secondaryCurrencyItems = document.querySelectorAll("[name=secondaryCurrencies]");
  //secondaryCurrencyItems[i].remove(baseCurrency.value);
  newSecondarySelect.className = 'selectCurrencyItem';
  newSecondarySelect.name = 'secondaryCurrencies';
  newSecondarySelect.id = '';
  secondarySelect = document.getElementsByClassName("selectCurrencyItem");
  removeButton = "<button type='text' class='btnRemove' onclick='removeCurrency(event)'>REMOVE</button>";
  newSecondarySelect.innerHTML = secondarySelect[0].innerHTML;
  newSecondarySelect.innerHTML += removeButton;
  if ( secondarySelect.length < 3 ) {
    secondaryCurrenciesList.appendChild(newSecondarySelect);
  }
}

// Remove button function
removeButton = document.getElementsByClassName("btnRemove");
function removeCurrency(event) {
  let buttonParent = event.target.parentNode;
  secondaryCurrenciesList.removeChild(buttonParent);
};



// enable options from removed button
// function enableOptions(a) {
//   for ( let i = 0; i < a.length; i++) {
//     secondaryCurrencyItems[i].options[currencySelected].disabled = false;
//   };
// }


// According to the user selection get JSON data

//## add CLP currency
//## Currency Converter
// getJSONP('http://free.currencyconverterapi.com/api/v3/convert?q=USD_CLP&compact=ultra&callback=?', function(data){
//   console.log(data);
//   console.log(data.USD_CLP);
//   document.getElementById('CLP').innerHTML = data.USD_CLP.val;
//   CLP = data.USD_CLP.val;
// });

//## Euro foreign exchange
// getJSONP('http://api.fixer.io/latest?base=USD&callback=?', function(data){
//   console.log(data);
//   console.log(data.rates.EUR);
//   console.log(data.rates.GBP);
//   document.getElementById('GBP').innerHTML = data.rates.GBP;
//   GBP = data.rates.GBP;
//   document.getElementById('EUR').innerHTML = data.rates.EUR;
//   EUR = data.rates.EUR;
// });