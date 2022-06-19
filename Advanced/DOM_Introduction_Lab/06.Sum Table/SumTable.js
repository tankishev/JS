function sumTable() {
    const result = Array
        .from(document.querySelectorAll('tr'))
        .slice(1, -1)
        .map((el) => Number(el.lastElementChild.innerText))
        .reduce((a, b) => a + b);
    document.getElementById('sum').innerText = result;
}