function calorieObj(inputArr){
    const obj = {};

    for (let i = 0; i < inputArr.length; i += 2){
        const product = inputArr[i];
        const calories = Number(inputArr[i+1])
        retval[product] = calories;
    }
    console.log(obj);
}

calorieObj(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);
calorieObj(['Potato', '93', 'Skyr', '63', 'Cucumber', '18', 'Milk', '42']);