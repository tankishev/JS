function colorize() {
    const table = Array.from(document.querySelectorAll('tr:nth-of-type(even)'));
    table.forEach((el) => el.style.background = 'teal');
}