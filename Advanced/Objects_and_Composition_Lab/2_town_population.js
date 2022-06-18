function townRecords(inputArray){
    const records = {};
    for (const el of inputArray){
        const [cityName, population] = el.split(' <-> ');
        if (records[cityName] == undefined){
            records[cityName] = 0;
        }
        records[cityName] += Number(population)
    }
    for (const [key, value] of Object.entries(records)){
        console.log(`${key} : ${value}`)
    }
}

townRecords(['Sofia <-> 1200000','Montana <-> 20000','New York <-> 10000000','Washington <-> 2345000','Las Vegas <-> 1000000']);
townRecords(['Istanbul <-> 100000','Honk Kong <-> 2100004','Jerusalem <-> 2352344','Mexico City <-> 23401925','Istanbul <-> 1000']);
