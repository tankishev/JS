import { html, render } from './node_modules/lit-html/lit-html.js'
import { repeat } from './node_modules/lit-html/directives/repeat.js'

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const searchField = document.getElementById('searchField');
   renderData();

   function onClick(e) {
      e.preventDefault();
      document.querySelectorAll('tr').forEach(r => r.classList.remove('select'))
      if (searchField.value) {
         const cells = Array.from(document.querySelectorAll('td'));
         cells
            .filter(el => el.textContent.toLowerCase().includes(searchField.value.toLowerCase()))
            .map(el => el.parentElement)
            .forEach(el => el.classList.add('select'))   
      }
   }
}

async function renderData(){
   const tbody = document.querySelector('tbody');
   const data = await getData();
   render(repeat(data, el => el._id, trTemplate), tbody);
}

function trTemplate(data){
   return html`
   <tr data-id=${data._id}>
      <td>${data.firstName} ${data.lastName}</td>
      <td>${data.email}</td>
      <td>${data.course}</td>
   </tr>`
}

async function getData(){
   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const res = await fetch(url);
   const data = await res.json()
   return Object.values(data);   
}

solve();



// find input on search
// add select class 
// clear results from prior searches before new search
