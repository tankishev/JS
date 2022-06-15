function arrayRotation(array, number){
    while (number > 0){
        array.push(array.shift());        
        number--;
    }
    console.log(array.join(' '));
}

arrayRotation([51, 47, 32, 61, 21], 2)