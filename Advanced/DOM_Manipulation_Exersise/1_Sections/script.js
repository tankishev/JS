function create(words) {
   const content = document.getElementById('content');
   content.addEventListener('click', onClick);

   let d = document.createElement('div');
   let p = document.createElement('p');
   p.style.display = 'none'
   d.appendChild(p);
   
   for (const word of words){
      let newD = d.cloneNode(true);
      newD.children[0].textContent = word;
      content.appendChild(newD);
   }

   function onClick(e){
      if (e.target.tagName == 'DIV' && e.target.className != 'content'){
         e.target.firstChild.style.display = 'block';
      }
      
   }
}