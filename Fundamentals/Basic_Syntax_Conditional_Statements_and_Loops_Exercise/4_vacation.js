function travel_fare(num, group_type, day) {
    const weekdays = ['Friday', 'Saturday', 'Sunday'];
    const prices = {
        'Students': [8.45, 9.80, 10.46],
        'Business': [10.90, 15.60, 16],
        'Regular': [15, 20, 22.50]
    };
    let price = prices[group_type][weekdays.indexOf(day)]
    let total_price = 0;
    if (group_type == 'Students' && num >= 30) {
        price *= 0.85;
    } else if (group_type === 'Business' && num >= 100) {
        num -= 10
    } else if (group_type === 'Regular' && num >= 10 && num <= 20){
        price *= 0.95;
    } 
    total_price = num * price;
    
    console.log(`Total price: ${total_price.toFixed(2)}`)
}

travel_fare(30,"Students","Sunday")
travel_fare(40,"Regular","Saturday")