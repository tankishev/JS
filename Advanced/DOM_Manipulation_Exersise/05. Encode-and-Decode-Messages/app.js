function encodeAndDecodeMessages() {
    const textAreas = document.querySelectorAll('textarea');
    const buttons = document.querySelectorAll('button');

    buttons[0].addEventListener('click', encode);

    function encode(e){
        if(textAreas[0].value != ''){
            let encodedMessage = ''
            for (const letter of textAreas[0].value){
                encodedMessage += String.fromCharCode(letter.charCodeAt() + 1);
            }
            textAreas[1].value = encodedMessage;
            textAreas[0].value = '';
            buttons[1].addEventListener('click', decode);
        }
    }

    function decode(e){
        if(textAreas[1].value != ''){
            let decodedMessage = ''
            for (const letter of textAreas[1].value){
                decodedMessage += String.fromCharCode(letter.charCodeAt() - 1);
            }
            textAreas[1].value = decodedMessage;
            buttons[1].removeEventListener('click', decode);
        }

    }
}