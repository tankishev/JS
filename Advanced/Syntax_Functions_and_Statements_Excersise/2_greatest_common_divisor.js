function GCD(num1, num2){
    let LCM = 1;
    for (let i = Math.max(num1, num2); i <= num1 * num2; i++){
        if (i % num1 == 0 && i % num2 == 0){
            LCM = i;
            break;
        }
    }
    console.log((num1 * num2) / LCM);
}

GCD(15, 5);
GCD(2154, 458);