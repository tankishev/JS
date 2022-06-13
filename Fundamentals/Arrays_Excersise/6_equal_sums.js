function equalSums(array){
    let notFound = true;
    if (array.length == 1){
        console.log(0);
    } else if (array.length == 2) {
        console.log('no');
    } else {
        let leftSum = 0;
        let rightSum = 0;
        for (let i = 1; i < array.length; i++){
            leftSum = array.slice(0, i).reduce((a, b) => a + b, 0);
            rightSum = array.slice(i + 1).reduce((a, b) => a + b, 0);
            if (leftSum == rightSum){
                console.log(i);
                notFound = !notFound;
                break;
            }
        } 
        if (notFound) console.log('no')
    }
}

equalSums([1, 2, 3])