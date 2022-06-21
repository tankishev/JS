function deleteByEmail() {
    const searchValue = document.querySelector('[name="email"]').value;
    const rows = document.querySelectorAll('tbody tr');
    const result = document.getElementById('result');

    result.value = '';
    if (searchValue != ''){
        if (!(rows.innerHTML.includes(searchValue))){
            result.textContent = 'Not found.';
        } else {
            for (const row of rows){
                if (row.innerHTML.includes(searchValue)){
                    row.parentElement.removeChild(row);
                    result.value = 'Deleted.'
                }
            }
        }
    }
}