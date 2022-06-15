function getWords(intpuString){
    const re = /\w+/g;
    const words = intpuString.match(re);
    console.log(words.join(', ').toUpperCase());
}

getWords('Hi, how are you?');
getWords('hello');