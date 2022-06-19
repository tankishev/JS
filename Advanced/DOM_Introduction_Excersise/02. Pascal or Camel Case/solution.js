function solve() {
  const textArr = document.getElementById('text').value.split(' ');
  const namingConvention = document.getElementById('naming-convention').value;
  const span = document.getElementById('result');
  let result = 'Error!';
  
  const mapper = function(str, i){
    let retval = (i == 0 && namingConvention == 'Camel Case') ? str[0].toLowerCase() : str[0].toUpperCase();
    retval += str.slice(1).toLowerCase();
    return retval;
  }

  if (['Camel Case','Pascal Case'].includes(namingConvention)){
    result = textArr
      .map((el, idx) => mapper(el, idx))
      .join(''); 
  }
  
  span.innerHTML = result;
}