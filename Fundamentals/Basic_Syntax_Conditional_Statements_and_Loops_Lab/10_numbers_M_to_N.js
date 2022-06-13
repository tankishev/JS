// Write a function that receives a number M and a number N (M will always be bigger than N). Print all numbers from M to N.

function print_nums(M, N){
    while (M >= N){
        console.log(M);
        M--
    }
}

print_nums(6, 2);
print_nums(4, 1);