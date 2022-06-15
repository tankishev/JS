    function numbersSort(num1, num2, num3){
        let numbers = [];
        numbers.push(num1);
        numbers.push(num2);
        numbers.push(num3);
        numbers.sort();
        for (i = numbers.length - 1; i >= 0; i--){
            console.log(numbers[i]);
        }
    }