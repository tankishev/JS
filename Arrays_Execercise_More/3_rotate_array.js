function rotateArray(inputArray) {
    let elementsArray = Array.from(inputArray).slice(0, inputArray.length - 1);
    const numRotations = Number(inputArray[inputArray.length - 1]);
    for (let i = 0; i < numRotations; i++) {
        elementsArray.unshift(elementsArray.pop());
    }
    console.log(elementsArray.join(' '));
}

rotateArray(['1', '2', '3', '4', '2'])
rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', '15'])