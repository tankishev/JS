function attachEventsListeners() {
    document.querySelector('main').addEventListener('click', onClick);

    const inputs = document.querySelectorAll('input[type="text"]');
    const convert = {
        seconds: (s) => s,
        minutes: (s) => s * 60,
        hours: (s) => s * 3600,
        days: (s) => s * 86400
    }

    function onClick(e){
        if (e.target.type == 'button'){
            let priorElement = e.target.previousElementSibling;
            if (priorElement.value != ''){
                let value = Number(priorElement.value);
                let s = convert[priorElement.id](value);
                for (let input of inputs){
                    input.value = s / convert[input.id](1);
                }
            }
        }
    }
}