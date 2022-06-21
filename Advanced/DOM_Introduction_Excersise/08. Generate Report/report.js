function generateReport() {
    const checkboxes = Array.from(document.querySelectorAll('[type="checkbox"]'));
    const idx = checkboxes
        .map((el, i) => [i, el.checked])
        .filter((el) => el[1])
        .map(el => el[0]);
    
    if (idx.length > 0){
        const headers = checkboxes
            .map((el) => el.name)
            .filter((el, i) => idx.includes(i));
        
        const dataRows = Array
            .from(document.querySelectorAll('tbody tr'))
            .map((row) => Array
                .from(row.children)
                .map((cell) => cell.innerText)
                .filter((data, i) => idx.includes(i)));

        result = [];
        dataRows.forEach((row) => {
            const newEntry = Object.fromEntries(headers.map((colName, i) => [colName, row[i]]));
            result.push(newEntry);
        });

        document.getElementById('output').value = JSON.stringify(result);
    }
}