function printNthElement(stringInput){
    const stringArray = Array.from(stringInput)
    const step = Number(stringArray[stringArray.length - 1]);
    let output = [stringInput[0]];
    for (let i = step; i < stringArray.length - 1; i += step) {
        output.push(stringArray[i]);
    }
    console.log(output.join(' '))
}

printNthElement(['5', '20', '31', '4', '20', '2'])