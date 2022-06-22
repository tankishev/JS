function validate() {
    const pattern = /[a-z]+@[a-z]+\.[a-z]+]/
    let input = document.getElementById(input);
    input.addEventListener('change', validateEmail);    
    
    function validateEmail(){
        if (input.value.match(pattern)){
            console.log('ok');
        } else {
            console.log('notok')
        }
    }
}