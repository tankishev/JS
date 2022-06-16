function sortNames(inputArray){
    inputArray.sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < inputArray.length; i++){
        console.log(`${i+1}.${inputArray[i]}`)
    }
    
}

sortNames(["John", "Bob", "Christina", "Ema"]);
sortNames([]);


