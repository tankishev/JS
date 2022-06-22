function addItem() {
    const input = document.getElementById('newItemText');
    if (input.value != ''){
        liElement = document.createElement('li');
        liElement.innerText = input.value;
        document.getElementById('items').appendChild(liElement);
        input.value = ''
    }
}