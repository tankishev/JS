function sortByTwoCriteria(inputArray){
    inputArray.sort((a, b) => a.length - b.length || a.localeCompare(b));
    console.log(inputArray.join('\n'));
}

sortByTwoCriteria(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']);