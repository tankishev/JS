function getBiggest(num1, num2, num3){
    num1 = Number(num1);
    num2 = Number(num2);
    num3 = Number(num3);
    let numbers = [num1, num2, num3];
    numbers.sort((a, b) =>  a - b);
    console.log(numbers[numbers.length - 1])
}

getBiggest(130, 5, 99)



