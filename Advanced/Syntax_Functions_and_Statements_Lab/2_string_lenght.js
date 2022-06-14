function stringLength(textA, textB, textC){
    let avgLen = 0;
    let sumLen = 0;
    sumLen = textA.length + textB.length + textC.length;
    avgLen = Math.floor(sumLen / 3);
    console.log(sumLen);
    console.log(avgLen);
} 

stringLength('chocolate', 'ice cream', 'cake')
stringLength('pasta', '5', '22.3')
