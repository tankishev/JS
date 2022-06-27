window.addEventListener("load", solve);

function solve() {
  const inputs = {
    make: document.getElementById('make'),
    model: document.getElementById('model'),
    year: document.getElementById('year'),
    fuel: document.getElementById('fuel'),
    cost: document.getElementById('original-cost'),
    price: document.getElementById('selling-price')
  }

  const table = document.getElementById('table-body');
  const soldCars = document.getElementById('cars-list');
  const totalProfit = document.getElementById('profit');
  
  const btnPublish = document.getElementById('publish');

  table.addEventListener('click', onAction);
  btnPublish.addEventListener('click', publish);

  function publish(e){
    e.preventDefault();

    if ((Object.values(inputs).some((el) => el.value == '') || Number(inputs.cost.value) > Number(inputs.price.value))){
      return;
    }

    let tr = document.createElement('tr');
    tr.className = "row";
    tr.innerHTML =
      `<td>
        <button class="action-btn edit">Edit</button>
        <button class="action-btn sell">Sell</button>    
      </td>`
    
    let fragment = document.createDocumentFragment();
    ['make', 'model', 'year', 'fuel', 'cost', 'price'].forEach((el) => {
      let td = document.createElement('td');
      td.textContent = inputs[el].value;
      fragment.appendChild(td);
    })
    tr.insertBefore(fragment, tr.firstChild);
    table.appendChild(tr);

    for (const el in inputs){
      inputs[el].value = '';
    }
  }

  function onAction(e){
    e.preventDefault();
    if (e.target.tagName == 'BUTTON'){
      let parent = e.target.parentElement.parentElement;
      let children = parent.children;
      let carData = ['make', 'model', 'year', 'fuel', 'cost', 'price'].map((el, idx) => [el, children[idx].textContent]);
      let car = Object.fromEntries(carData);

      if (e.target.className.includes('edit')){
        for (key in car){
          inputs[key].value = car[key];
        }
      } else if (e.target.className.includes('sell')){
        let profit = Number(car.price) - Number(car.cost);
        let li = document.createElement('li');
        li.className = "each-list";
        let fragment = document.createDocumentFragment();
        [`${car.make} ${car.model}`, car.year, profit].forEach((el) => {
          let sp = document.createElement('span');
          sp.textContent = el;
          fragment.appendChild(sp);
        });
        li.appendChild(fragment);
        soldCars.appendChild(li);
        totalProfit.textContent = (Number(totalProfit.textContent) + profit).toFixed(2);
      }
      parent.remove(); 
    }
  }
}
