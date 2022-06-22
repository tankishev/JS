function deleteByEmail() {
    const searchValue = document.querySelector('input[name="email"]').value;
    const rows = document.querySelectorAll('tbody tr');
    const result = document.getElementById('result');

    result.textContent = '';

    if (searchValue != ''){
        for (const row of rows){
            if (row.innerHTML.includes(searchValue)){
                row.parentElement.removeChild(row);
                result.textContent = 'Deleted.'
            }
        }
        if (result.textContent == ''){
            result.textContent = 'Not found.';
        }
    }
}