import { render } from './node_modules/lit-html/lit-html.js'
import { listTemplate } from './views.js'
import { towns } from './towns.js'

window.addEventListener('load', start)

function start(){
   document.querySelector('button').addEventListener('click', search);
   search()
}

function loadTowns(data){
    const root = document.querySelector('#towns');
    render(listTemplate(data), root)
}

function search(){
   const searchText = document.querySelector('#searchText').value;
   const result = document.querySelector('#result')
   const data = towns.map(town => {
      return {name: town}
   })
   result.textContent = ''
   if (searchText){
      data.map(town => {
         if (town.name.includes(searchText)){
            town['is_active'] = true
         };
         return town
      })
      const count = data.filter(town => town.is_active).length
      result.textContent = `${count} matches found`
   }
   loadTowns(data)
}
