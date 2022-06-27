function validate() {
    const bntSubmit = document.getElementById('submit');
    const chkBox = document.getElementById('company');
    const companyInfo = document.getElementById('companyInfo');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const passwords = Array.from(document.querySelectorAll('input[id$="password"]'));
    const companyNumber = document.getElementById('companyNumber');
    const divValid = document.getElementById('valid');

    function isValid(type, string) {
        const patterns = {
            password: /\w{5,15}/,
            username: /[a-zA-Z0-9]{3,20}/,
            email: /.*@.*\..*/g
        }
        if (string != ''){
            const match = string.match(patterns[type]);
            if (match != null && string == match[0]){
                return true;
            }
        }
        return false;
    }

    chkBox.addEventListener('change', onCheck);
    bntSubmit.addEventListener('click', onClick);

    function onCheck(){
        companyInfo.style.display = chkBox.checked ? 'block' : 'none';
    };

    function onClick(e){
        e.preventDefault();
        let validFields = [];
        let invalidFields = [];
        
        isValid('username', username.value) ? validFields.push(username) : invalidFields.push(username);
        isValid('email', email.value) ? validFields.push(email) : invalidFields.push(email);
        console.log((passwords[0].value !== passwords[1].value))
        if (passwords[0].value != passwords[1].value){
            invalidFields.concat(passwords);
        } else {
            console.log('here')
            isValid('password', passwords[0]) ? validFields.concat(passwords) : invalidFields.concat(passwords);
        }
        
        if (chkBox.checked){
            let num = Number(companyNumber.value)
            if (!(isNaN(num))){
                if (num >= 1000 && num <= 9999){
                    validFields.push(companyNumber);
                } else {
                    invalidFields.push(companyNumber);
                }
            }
        }

        validFields.forEach((el) => markValid(el));
        if (invalidFields.length > 0){
            invalidFields.forEach((el) => markInvalid(el));
            divValid.style.display = 'none';
        } else {
            divValid.style.display = 'block';
        }  
        console.log(validFields)
        console.log(invalidFields)
    }

    function markValid(obj){
        obj.style.border = 'none';
    }

    function markInvalid(obj){
        obj.style.border = 'solid';
        obj.style.borderColor = 'red';
    }
}
