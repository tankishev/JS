function validate() {
    const input = document.getElementById('email');
    input.addEventListener('change', validateEmail);    
    
    function validateEmail(){
        const pattern = /[a-z]+@[a-z]+\.[a-z]+/
        if (input.value.match(pattern)){
            input.classList.remove('error');
        } else {
            input.classList.add('error');
        }
    }
}