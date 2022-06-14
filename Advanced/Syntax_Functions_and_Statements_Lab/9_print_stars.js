function printStars(num=5){
    const char = '*'
    for (let i = 1; i <= num; i++){
        console.log(char.repeat(num).split('').join(' '))
    }
}

printStars(2)