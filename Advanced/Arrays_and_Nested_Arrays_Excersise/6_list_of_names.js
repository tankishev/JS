function sortNames(inputArray){
    inputArray.sort();
    for (i in inputArray){
        console.log(`${Number(i)+1}.${inputArray[i]}`)
    }
}

sortNames(["John", "Bob", "Christina", "Ema"]);
sortNames([]);