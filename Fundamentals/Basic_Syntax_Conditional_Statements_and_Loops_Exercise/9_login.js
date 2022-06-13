function login(inputArray){
    let username = inputArray[0]
    let password = '';
    let loginSuccessful = false;
    for (let index = 1; index <= inputArray.length; index++){
        password = inputArray[index];
        password = password.split("").reverse().join("");
        if (username == password){
            loginSuccessful = true;
            break;
        }
        if (index === 4) {
            break;
        }
        console.log('Incorrect password. Try again.');
    }
    console.log(loginSuccessful ? `User ${username} logged in.` : `User ${username} blocked!` );
}

login(['Acer','login','go','let me in','recA'])
login(['momo','omom'])
login(['sunny','rainy','cloudy','sunny','not sunny'])