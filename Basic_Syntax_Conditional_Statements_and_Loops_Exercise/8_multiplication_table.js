function printMultiplicationTable(number){
    for (let times = 1; times <= 10; times++){
        console.log(`${number} X ${times} = ${times * number}`)
    }
}

printMultiplicationTable(5)