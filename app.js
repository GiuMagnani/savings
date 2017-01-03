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

// After the script is loaded (and executed), remove it
script.onload = function () {
  this.remove();
};
}

let CLP = 0;
let GBP = 0;

getJSONP('http://free.currencyconverterapi.com/api/v3/convert?q=USD_CLP&compact=y&callback=?', function(data){
  console.log(data);
  console.log(data.USD_CLP);
  document.getElementById('CLP').innerHTML = data.USD_CLP.val;
  CLP = data.USD_CLP.val;
});

getJSONP('http://api.fixer.io/latest?base=USD&callback=?', function(data){
  console.log(data);
  console.log(data.rates.EUR);
  console.log(data.rates.GBP);
  document.getElementById('GBP').innerHTML = data.rates.GBP;
  GBP = data.rates.GBP;
  document.getElementById('EUR').innerHTML = data.rates.EUR;
  EUR = data.rates.EUR;
});

//document.getElementById('EUR').innerHTML = data.USD_CLP.val;

document.getElementById('CLPtoEUR').addEventListener('click', function(a) {
  let html = 'perro';
  html.append(CLP / GBP);
//html =+ CLP / EUR;
document.getElementById('results').innerHTML = html;
});