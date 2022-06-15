function sameNumbers(num){
    const sumNum = num.toString().split('').reduce(
        (x, y) => x + Number(y), 0
    );
    const strNum = num.toString().charAt(0).repeat(num.toString().length);
    console.log(strNum==num);
    console.log(sumNum);
}

sameNumbers(2222222);
sameNumbers(1234);