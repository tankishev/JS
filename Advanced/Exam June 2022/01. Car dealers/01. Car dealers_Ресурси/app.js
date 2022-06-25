window.addEventListener("load", solve);

function solve() {
  const inputMake = document.getElementById('make');
  const inputModel = document.getElementById('model');
  const inputYear = document.getElementById('year');
  const inputFuel = document.getElementById('fuel');
  const inputOriginalCost = document.getElementById('original-cost');
  const inputSellingPrice = document.getElementById('selling-price');
  const table = document.getElementById('table-body');
  const soldCars = document.getElementById('cars-list');
  const totalProfit = document.getElementById('profit');
  
  const btnPublish = document.getElementById('publish');

  const cars = [];

  table.addEventListener('click', onAction);
  btnPublish.addEventListener('click', onClick);


  function onClick(e){
    e.preventDefault();
    
    const inputs = [
      inputMake.value,
      inputModel.value,
      inputYear.value,
      inputFuel.value,
      inputOriginalCost.value,
      inputSellingPrice.value
    ];

    if ((inputs.some((el) => el == '') || Number(inputOriginalCost.value) > Number(inputSellingPrice.value))){
      return;
    }

    let carData = {
        make: inputMake.value,
        model: inputModel.value,
        year: inputYear.value,
        fuel: inputFuel.value,
        cost: inputOriginalCost.value,
        price: inputSellingPrice.value
    }

    cars.push(carData);
    addCar(carData);
    clearInputFields();
  }

  function onAction(e){
    e.preventDefault();
    if (e.target.tagName == 'BUTTON'){
      let parent = e.target.parentElement.parentElement;
      let children = parent.children;

      let make = children[0].textContent;
      let model = children[1].textContent;
      let year = children[2].textContent;
      let fuel = children[3].textContent;
      let cost = children[4].textContent;
      let price = children[5].textContent;

      if (e.target.className.includes('edit')){
        inputMake.value = make;
        inputModel.value = model;
        inputYear.value = year;
        inputFuel.value = fuel;
        inputOriginalCost.value = cost;
        inputSellingPrice.value = price;
      } else if (e.target.className.includes('sell')){
        let profit = Number(price) - Number(cost);
        soldCars.innerHTML +=
        `<li class="each-list">
          <span>${make + ' ' + model}</span>
          <span>${year}</span>
          <span>${profit}</span>          
        </li>`
        totalProfit.textContent = (Number(totalProfit.textContent) + profit).toFixed(2);
      }
      parent.remove(); 
    }
  }

  function addCar(car){
    table.innerHTML +=
    `<tr class="row">
      <td>${car.make}</td>    
      <td>${car.model}</td>
      <td>${car.year}</td>
      <td>${car.fuel}</td>
      <td>${car.cost}</td>
      <td>${car.price}</td>
      <td>
        <button class="action-btn edit">Edit</button>
        <button class="action-btn sell">Sell</button>    
      </td>
    </tr>`
  }

  function clearInputFields(){
    inputMake.value = '';
    inputModel.value = '';
    inputYear.value = '';
    inputFuel.value = '';
    inputOriginalCost.value = '';
    inputSellingPrice.value = '';
  }
}
