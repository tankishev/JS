function isValid(x1, y1, x2, y2){
    let result = '';
    
    const test1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
    result = test1 % 1 == 0 ? 'valid' : 'invalid';
    console.log(`{${x1}, ${y1}} to {0, 0} is ${result}`)

    let test2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
    result = test2 % 1 == 0 ? 'valid' : 'invalid';
    console.log(`{${x2}, ${y2}} to {0, 0} is ${result}`)

    let test3 = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    result = test3 % 1 == 0 ? 'valid' : 'invalid';
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${result}`)
}

isValid(3, 0, 0, 4);
isValid(2, 1, 1, 1);