function textToJSON(inputArr){
    const parser = (string) => string.split('|').slice(1,-1).map((el) => el.trim());
    retval = [];

    let [headerRow, ...dataRows] = inputArr;
    headerRow = parser(headerRow);
    for (let dataRow of dataRows){
        dataRow = parser(dataRow);
        let record = {};
        for (let i = 0; i < dataRow.length; i++){
            let key = headerRow[i];
            let value = dataRow[i];
            if (i != 0){
                value = parseFloat(Number(value).toFixed(2));
            }
            record[key] = value;
        }
        retval.push(record);
    }
    return JSON.stringify(retval);    
}

console.log(textToJSON([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
));

console.log(textToJSON([
    '| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']
));

const a = 5;