function print_and_sum(startNum, endNum){
    let strOutput = ''
    let sumNumbers = 0
    for (let i = startNum; i <= endNum; i++) {
        strOutput += i + ' '
        sumNumbers += i
    }
    console.log(strOutput.trim())
    console.log(`Sum: ${sumNumbers}`)
}

print_and_sum(5, 10)
print_and_sum(0, 26)
print_and_sum(50, 60)