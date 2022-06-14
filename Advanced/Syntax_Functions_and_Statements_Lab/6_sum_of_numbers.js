function sumNubers(num1, num2){
    let x = Number(num1);
    let y = Number(num2);
    let result = 0;

    for (let i = x; i <= y; i++){
        result += i;
    }
    console.log(result);
}

sumNubers('-8', '20')