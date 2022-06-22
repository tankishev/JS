function focused() {
    for (const el of document.querySelectorAll('input')){
        el.addEventListener('focus', addFocusClass.bind(el.parentElement));
        el.addEventListener('blur', removeFocusClass.bind(el.parentElement));
    }
    function addFocusClass(){
        this.classList.add('focused');
    }
    function removeFocusClass(){
        this.classList.remove('focused');
    }

}