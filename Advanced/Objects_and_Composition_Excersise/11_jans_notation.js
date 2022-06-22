function janNotation(inputArray){
    const calc = {
        '+':(a, b) => b + a,
        '-':(a, b) => b - a,
        '/':(a, b) => b / a,
        '*': (a, b) => b * a
    }
    let nums = [];

    for (el of inputArray){
        if (isNaN(Number(el))){
            if (nums.length < 2){
                console.log("Error: not enough operands!");
                return;
            }
            nums.push(calc[el](nums.pop(), nums.pop()));
        } else {
            nums.push(Number(el));
        }
    }
    if (nums.length == 1){
        console.log(nums[0]);
        return;
    }
    console.log("Error: too many operands!");
}

janNotation([3,4,'+']);
janNotation([5,3,4,'*','-']);
janNotation([7,33,8,'-']);
janNotation([15,'/']);