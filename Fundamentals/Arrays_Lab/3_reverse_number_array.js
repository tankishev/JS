function reverseArray(number, elements){
    let output = elements.slice(0, number)
    console.log(output.reverse().join(' '))
}

reverseArray(3, [10, 20, 30, 40, 50])