function getEvenIdx(numbers){
    let output = [];
    for (i in numbers){
        if (i % 2 == 0){
            output.push(numbers[i]);
        }
    }
    console.log(output.join(' '));
}

getEvenIdx(['20', '30', '40', '50', '60']);
getEvenIdx(['5', '10']);