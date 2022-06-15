function condenseArrayToNumber(array){
    function condense(array){
        let result = [];
        for (let i = 1; i < array.length; i++){
            result.push(array[i - 1] + array[i]);
        }
        return result;
    };
    if (array.length > 1){
        do {
            array = condense(array);
        } while (array.length > 1);
    }
    console.log(array[0]);
}

condenseArrayToNumber([2,10,3]);
condenseArrayToNumber([5,0,4,1,2]);
condenseArrayToNumber([1]);