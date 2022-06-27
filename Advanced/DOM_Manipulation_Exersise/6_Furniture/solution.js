function solve() {
  document.addEventListener('click', onClick);
  const inputFields = document.querySelectorAll('textarea');
  const itemsCollection = document.querySelector('tbody');

  function onClick(e){
    if (e.target.textContent == 'Generate'){
      const input = inputFields[0].value;
      if (input != ''){
        const items = JSON.parse(input);
        items.forEach(item => {
          itemsCollection.innerHTML += `<tr>
            <td><img src=${item.img}></td>
            <td><p>${item.name}</p></td>
            <td><p>${item.price}</p></td>
            <td><p>${item.decFactor}</p></td>
            <td><input type="checkbox"/></td>
            </tr>`
        })
      }
    } else if(e.target.textContent == 'Buy'){
      let basket = [];
      let totalPrice = 0;
      let decFactor = 0;

      for (const item of itemsCollection.children){
        let itemElements = Array.from(item.children);
        if (itemElements[4].firstElementChild.checked){
          basket.push(itemElements[1].firstElementChild.textContent);
          totalPrice += Number(itemElements[2].firstElementChild.textContent);
          decFactor += Number(itemElements[3].firstElementChild.textContent);
        }
      }
      if (basket.length > 0){
        inputFields[1].value += `Bought furniture: ${basket.join(', ')}\n`;
        inputFields[1].value += `Total price: ${totalPrice.toFixed(2)}\n`;
        inputFields[1].value += `Average decoration factor: ${(decFactor / basket.length)}`;
      }
    }
  }
}