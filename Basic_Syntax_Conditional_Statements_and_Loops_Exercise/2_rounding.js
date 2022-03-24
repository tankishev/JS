function rounder(value, precision) {
    precision = Math.min(15, Number(precision))
    value = Number(value.toFixed(precision))
    console.log(value)
}

rounder(3.1415926535897932384626433832795,2)
rounder(10.5,3)