function janNotation(inputArray){
    let nums = [];
    for (el of inputArray){
        if (isNaN(Number(el))){
            if (nums.length < 2){
                return "Error: not enough operands!";
            }
            nums.push(nums.pop())
        } else {
            nums.push(Number(el));
        }
    }
}