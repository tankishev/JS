function getMaxSequence(array){
    let tempArray = [array[0]];
    let outputArray = [];
    if (array.length > 1) {
        for (let i = 1; i < array.length; i++){
            if (array[i] == outputArray[outputArray.length - 1]){
                tempArray.push(array[i]);
            } else {
                if (tempArray.length > outputArray.length){
                    outputArray = tempArray;
                }
                tempArray = [array[i]];
            }
        }
    }
    console.log(outputArray.join(' '));
}
getMaxSequence([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);