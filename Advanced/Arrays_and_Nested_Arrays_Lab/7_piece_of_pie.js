function filterArray(inputArray, start, end){
    start = inputArray.findIndex(element => element === start);
    end = inputArray.findIndex(element => element === end);

    return inputArray.slice(start, end + 1);
}

x = filterArray(['Pumpkin Pie', 'Key Lime Pie', 'Cherry Pie', 'Lemon Meringue Pie', 'Sugar Cream Pie'], 'Key Lime Pie', 'Lemon Meringue Pie');
console.log(x);