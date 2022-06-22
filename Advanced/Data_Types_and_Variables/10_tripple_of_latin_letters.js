function trippleLatinLetters(number){
    const alphabeth = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
            for (let k = 0; k < number; k++) {
                console.log(`${alphabeth[i]}${alphabeth[j]}${alphabeth[k]}`)
            }
        }
    }
}

trippleLatinLetters(3)