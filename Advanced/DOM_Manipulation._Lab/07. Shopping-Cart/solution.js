function solve() {
   const cart = document.querySelector('.shopping-cart');
   const checkout = document.querySelector('button.checkout')
   const textArea = document.querySelector('textarea')
   const basket = {};
   let totalPrice = 0;

   cart.addEventListener('click', onClick)
   
   function onClick(e){    
      if(e.target.className == 'add-product'){
         const product = e.target.parentElement.parentElement;
         const name = product.querySelector('.product-title').textContent;
         const money = Number(product.querySelector('.product-line-price').textContent);
         textArea.value += `Added ${name} for ${money.toFixed(2)} to the cart.\n`
         
         if (!(name in basket)){
            basket[name] = 0;
         }
         basket[name] += money;
         totalPrice += money;

      } else if (e.target == checkout){
         const purchasedItems = Object.keys(basket).join(', ')
         textArea.value += `You bought ${purchasedItems} for ${totalPrice.toFixed(2)}.`;
         cart.removeEventListener('click', onClick);
      }
   }
}