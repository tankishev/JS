function solve() {
    document.querySelector('#container button').addEventListener('click', onClick);
    const selectTo = document.getElementById("selectMenuTo");
    for (optionName of ['Binary', 'Hexadecimal']){
        let el = document.createElement('option');
        el.innerText = optionName;
        el.value = optionName.toLowerCase();
        selectTo.appendChild(el);
    }
    
    function onClick(){
        const input = document.getElementById('input');
        const outputElement = document.getElementById('result');
        outputElement.value = '';
        if (input.value != ''){
            if (selectTo.value == 'binary'){
                outputElement.value = Number(input.value).toString(2); 
            } else if (selectTo.value == 'hexadecimal'){
                outputElement.value = Number(input.value).toString(16).toUpperCase();    
            }
        }
    }
}