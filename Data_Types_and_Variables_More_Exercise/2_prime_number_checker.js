function isPrime(number){
    number = Number(number);
    if (number == 1 || number == 3 || (number ** 2 - 1) % 24 == 0) {
        console.log('true');
    } else {
        console.log('false');
    }
}

isPrime(13)
