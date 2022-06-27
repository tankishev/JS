function addItem() {
    const input = document.getElementById('newItemText');
    if (input.value != ''){
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.textContent = '[Delete]';
        linkElement.addEventListener('click', onDelete);

        const liElement = document.createElement('li');
        liElement.textContent = input.value;
        liElement.appendChild(linkElement);

        document.getElementById('items').appendChild(liElement);
        input.value = ''
    }

    function onDelete(event){
        event.target.parentElement.remove();
    }
    
}


