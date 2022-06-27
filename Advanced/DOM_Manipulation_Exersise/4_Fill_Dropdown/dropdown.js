function addItem() {
    const inputText = document.getElementById('newItemText');
    if (inputText.value != ''){
        const inputValue = document.getElementById('newItemValue');
        if (inputValue.value != ''){
            const select = document.getElementById('menu');
            let option = document.createElement('option');
            option.text = inputText.value;
            option.value = inputValue.value;
            select.appendChild(option);
            inputText.value  = ''
            inputValue.value = ''
        }    
    }
}