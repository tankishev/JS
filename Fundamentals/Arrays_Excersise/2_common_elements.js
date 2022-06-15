function getCommonElements(arrA, arrB){
    for (element of arrA){
        if (arrB.includes(element)) console.log(element);
    }
}


getCommonElements(['Hey', 'hello', 2, 4, 'Peter', 'e'],['Petar', 10, 'hey', 4, 'hello', '2'])
getCommonElements(['S', 'o', 'f', 't', 'U', 'n', 'i', ' '],['s', 'o', 'c', 'i', 'a', 'l'])