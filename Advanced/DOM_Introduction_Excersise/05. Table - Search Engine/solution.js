function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const input = document.getElementById('searchField')

      Array
         .from(document.querySelectorAll('tbody tr.select'))
         .forEach((el) => el.className = '');

      if (input.value != ''){
         Array
            .from(document.querySelectorAll('tbody td'))
            .filter((el) => el.textContent.includes(input.value))
            .forEach((el) => {
               if (el.parentElement.classList.length == 0){el.parentElement.classList.add("select")}
            })
         input.value = '';   
      }
   }
}