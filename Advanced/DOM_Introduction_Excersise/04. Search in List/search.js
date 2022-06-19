function search() {
   const inputElement = document.getElementById('searchText');
   const liList = Array.from(document.getElementById('towns').children);
   let result = document.getElementById("result");

   liList.forEach((el) => {
      el.style.fontWeight = 'normal';
      el.style.textDecoration = 'none';
   });
   result.textContent = ''
   
   if (inputElement.value != ''){
      const filteredList = liList.filter((el) => el.textContent.includes(inputElement.value));
      filteredList.forEach((el) => {
         el.style.fontWeight = 'bold';
         el.style.textDecoration = 'underline';
      });
      result.textContent = `${filteredList.length} matches found`
   }
}
